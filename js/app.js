// Groww Portfolio Understanding MVP - App Controller
// Flow:
// Screen 1 (Dashboard) - Non-scrolling
// Screen 2 (Fund Selection) - Non-scrolling
// Screen 3+ (Fund Deep Dive) - Combines Slides 3 to 7 into a single continuous scrolling experience!

(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const viewParam = urlParams.get('view');
  const slideParam = urlParams.get('slide');
  const fundParam = urlParams.get('fund');
  const scrollParam = urlParams.get('scroll');

  const state = {
    // Views: 'dashboard' (Slide 1), 'fund-detail' (Authentic Groww Fund Screen), 'fund-select' (Slide 2), 'deepdive-scroll' (Slides 3-7 combined)
    currentView: viewParam || (slideParam === '1' ? 'dashboard' : (slideParam === '2' ? 'fund-select' : (slideParam ? 'slide-inspect' : 'dashboard'))),
    inspectSlideNum: slideParam ? parseInt(slideParam) : 3,
    selectedFundId: fundParam || "sbi-large-midcap",
    previousView: 'dashboard',
    managerTf: "3Y",
    calcMode: "sip", // "sip" | "lumpsum"
    calcAmount: 5000,
    calcTf: "6M", // "6M" | "1Y" | "3Y" | "5Y"
    accordions: {
      calc: true,
      returns: true,
      peers: false,
      expense: true,
      manager: false
    }
  };

  const getSelectedFund = () => {
    return GROWW_DATA.funds.find(f => f.id === state.selectedFundId) || GROWW_DATA.funds[0];
  };

  // Return Calculator Engine
  function getCalculatorData(fund, mode, amount) {
    const rate = fund.calcDefaultRate || 18.0;
    const timeframes = [
      { key: "6M", months: 6, years: 0.5 },
      { key: "1Y", months: 12, years: 1.0 },
      { key: "3Y", months: 36, years: 3.0 },
      { key: "5Y", months: 60, years: 5.0 }
    ];

    const result = {};
    let maxVal = 0;

    timeframes.forEach(tf => {
      let invested = 0;
      let futureVal = 0;

      if (mode === "sip") {
        invested = amount * tf.months;
        const i = (rate / 100) / 12;
        futureVal = amount * ((Math.pow(1 + i, tf.months) - 1) / i) * (1 + i);
      } else {
        invested = amount;
        const r = rate / 100;
        futureVal = amount * Math.pow(1 + r, tf.years);
      }

      if (invested > maxVal) maxVal = invested;
      if (futureVal > maxVal) maxVal = futureVal;

      result[tf.key] = {
        invested,
        futureVal
      };
    });

    // Scale to max height of 75px, minimum 10px
    const MAX_BAR_HEIGHT = 75;
    timeframes.forEach(tf => {
      const item = result[tf.key];
      item.investedHeight = Math.max(10, Math.round((item.invested / maxVal) * MAX_BAR_HEIGHT));
      item.futureValHeight = Math.max(10, Math.round((item.futureVal / maxVal) * MAX_BAR_HEIGHT));
    });

    return result;
  }

  function updateCalculatorUI() {
    const fund = getSelectedFund();
    const data = getCalculatorData(fund, state.calcMode, state.calcAmount);
    
    // Update amount display text
    const displayEl = document.getElementById("calc-amount-val-text");
    if (displayEl) {
      displayEl.textContent = `₹${state.calcAmount.toLocaleString('en-IN')}`;
    }
    
    // Update slider value
    const slider = document.getElementById("calc-slider-input");
    if (slider) {
      slider.value = state.calcAmount;
    }
    
    // Update bars
    ["6M", "1Y", "3Y", "5Y"].forEach(tf => {
      const col = document.querySelector(`.calc-bar-column[data-tf="${tf}"]`);
      if (col) {
        col.classList.toggle("active", tf === state.calcTf);
        const barInvested = col.querySelector(".bar-invested");
        const barGain = col.querySelector(".bar-gain");
        if (barInvested && barGain && data[tf]) {
          barInvested.style.height = `${data[tf].investedHeight}px`;
          barGain.style.height = `${data[tf].futureValHeight}px`;
        }
      }
    });
    
    // Update summary values for selected timeframe
    const activeData = data[state.calcTf];
    const totalInvestedEl = document.getElementById("calc-summary-invested");
    const wouldBecomeEl = document.getElementById("calc-summary-become");
    if (totalInvestedEl && activeData) {
      totalInvestedEl.textContent = `₹${Math.round(activeData.invested).toLocaleString('en-IN')}`;
    }
    if (wouldBecomeEl && activeData) {
      wouldBecomeEl.textContent = `₹${Math.round(activeData.futureVal).toLocaleString('en-IN')}`;
    }
  }

  // Fund Brand Logos SVG
  function renderFundLogo(fundId, size = 36) {
    if (fundId === "sbi-large-midcap") {
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#0078D4"/>
          <circle cx="18" cy="14.5" r="4.2" fill="#FFFFFF"/>
          <rect x="16.5" y="14.5" width="3" height="12" fill="#FFFFFF"/>
        </svg>
      `;
    }
    if (fundId === "parag-parikh-flexi") {
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#15803D"/>
          <polygon points="18,9 26,23 10,23" fill="#FFFFFF"/>
          <polygon points="24,15 30,23 18,23" fill="#86EFAC"/>
        </svg>
      `;
    }
    if (fundId === "tata-silver-etf") {
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#475569"/>
          <path d="M11 13h14v2.8h-5.5v11h-3v-11H11V13z" fill="#E2E8F0"/>
        </svg>
      `;
    }
    // Tata Gold
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill="#B45309"/>
        <path d="M11 13h14v2.8h-5.5v11h-3v-11H11V13z" fill="#FDE68A"/>
      </svg>
    `;
  }

  // Historical SVG Chart
  function renderHistoricalChart(fund) {
    const currentFund = fund || getSelectedFund();
    const hist = currentFund?.historicalPerformance || GROWW_DATA.funds[0].historicalPerformance;
    const drop = hist.downturnPoint;
    const rec = hist.recoveryPoint;

    return `
      <svg viewBox="0 0 340 160" width="100%" height="100%" style="overflow: visible;">
        <defs>
          <linearGradient id="chartGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#00D09C" stop-opacity="0.22"/>
            <stop offset="100%" stop-color="#00D09C" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <line x1="10" y1="85" x2="330" y2="85" stroke="#E5E7EB" stroke-dasharray="3,3"/>

        <path d="M 80 80 Q 95 98, 110 118 Q 150 95, 190 75 T 260 45 T 310 22 L 310 145 L 110 145 Z" 
              fill="url(#chartGlow)" opacity="0.6"/>

        <path d="M 20 75 Q 50 60, 80 80 T 110 118 Q 150 95, 190 75 T 260 45 T 310 22" 
              fill="none" stroke="#00D09C" stroke-width="2.5" stroke-linecap="round"/>
        
        <path d="M 80 80 Q 95 98, 110 118 Q 130 108, 150 95" 
              fill="none" stroke="#EB5B56" stroke-width="2.5" stroke-linecap="round"/>

        <circle cx="110" cy="118" r="4.5" fill="#EB5B56" stroke="#fff" stroke-width="1.8"/>
        <circle cx="310" cy="22" r="4.5" fill="#00D09C" stroke="#fff" stroke-width="1.8"/>

        <g transform="translate(40, 126)">
          <rect x="-4" y="0" width="128" height="20" rx="4" fill="#FEE2E2" stroke="#FCA5A5" stroke-width="1"/>
          <text x="60" y="14" fill="#DC2626" font-size="9.5" font-weight="700" text-anchor="middle">${drop.label} (${drop.period})</text>
        </g>

        <g transform="translate(182, 10)">
          <rect x="0" y="0" width="134" height="20" rx="4" fill="#D1FAE5" stroke="#6EE7B7" stroke-width="1"/>
          <text x="67" y="14" fill="#065F46" font-size="9.5" font-weight="700" text-anchor="middle">${rec.label} (${rec.period})</text>
        </g>

        <text x="20" y="156" fill="#6B7280" font-size="10" font-weight="500">Jan 2020</text>
        <text x="110" y="156" fill="#6B7280" font-size="10" font-weight="500" text-anchor="middle">May 2020</text>
        <text x="310" y="156" fill="#6B7280" font-size="10" font-weight="500" text-anchor="end">May 2021</text>
      </svg>
    `;
  }

  function renderManagerChart(fund, tf = "3Y") {
    const currentFund = fund || getSelectedFund();
    const manager = currentFund?.fundManager || GROWW_DATA.funds[0].fundManager;
    const perf = manager.performances[tf] || { fund: "+14.8%", category: "+12.6%" };
    const fundRet = perf.fund;
    const catRet = perf.category;

    return `
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 6px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #6366F1; flex-shrink: 0;"></span>
          <span style="color: var(--groww-text-secondary); font-weight: 500;">This Fund</span>
          <strong style="color: #6366F1; font-weight: 700;">${fundRet} (${tf})</strong>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #94A3B8; flex-shrink: 0;"></span>
          <span style="color: var(--groww-text-secondary); font-weight: 500;">Category Avg</span>
          <strong style="color: var(--groww-text-primary); font-weight: 700;">${catRet} (${tf})</strong>
        </div>
      </div>

      <div style="height: 120px; margin-top: 4px;">
        <svg viewBox="0 0 340 125" width="100%" height="100%" style="overflow: visible;">
          <path d="M 10 105 Q 70 92, 120 82 T 200 62 T 270 52 T 330 42" 
                fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <path d="M 10 105 Q 60 84, 120 68 T 200 45 T 270 28 T 330 16" 
                fill="none" stroke="#6366F1" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="330" cy="16" r="4.5" fill="#6366F1" stroke="#fff" stroke-width="2"/>
          <circle cx="330" cy="42" r="4" fill="#94A3B8" stroke="#fff" stroke-width="1.5"/>
        </svg>
      </div>

      <div class="timeframe-pill-selector">
        <button class="tf-pill-btn ${tf === '1Y' ? 'active' : ''}" data-tf="1Y">1Y</button>
        <button class="tf-pill-btn ${tf === '3Y' ? 'active' : ''}" data-tf="3Y">3Y</button>
        <button class="tf-pill-btn ${tf === '5Y' ? 'active' : ''}" data-tf="5Y">5Y</button>
      </div>
    `;
  }

  // ==========================================
  // SCREEN 1: DASHBOARD (NON-SCROLLING)
  // ==========================================
  function renderScreen1Dashboard() {
    const p = GROWW_DATA.portfolio;
    return `
      <div class="screen-view non-scrolling-screen" id="screen-dashboard">
        <!-- Groww Top Navigation Tabs (Matching IMG_9936) -->
        <div class="groww-top-tabs">
          <span class="groww-tab-link">Explore</span>
          <span class="groww-tab-link active">Dashboard</span>
          <span class="groww-tab-link">SIPs</span>
          <span class="groww-tab-link">Watchlist</span>
        </div>

        <div class="dashboard-compact-view" style="padding-top: 8px;">
          <!-- Portfolio Summary - FLAT, BORDERLESS -->
          <div class="portfolio-summary-flat">
            <div class="metric-line">
              <span class="metric-label-flat">1D returns</span>
              <span class="metric-val-flat loss">-₹${Math.abs(p.dayReturns)} (${p.dayReturnsPct}%)</span>
            </div>
            <div class="metric-line">
              <span class="metric-label-flat">Total returns</span>
              <span class="metric-val-flat loss">-₹${Math.abs(p.totalReturns)} (${p.totalReturnsPct}%)</span>
            </div>
            <div class="metric-line">
              <span class="metric-label-flat">Invested</span>
              <span class="metric-val-flat neutral">₹${p.totalInvested.toLocaleString('en-IN')}</span>
            </div>
            <div class="metric-line">
              <span class="metric-label-flat">XIRR <span style="font-size:11px;">⌄</span></span>
              <span class="metric-val-flat loss">${p.xirr}%</span>
            </div>
          </div>

          <!-- Highlight Action Card: "Why is my portfolio down?" -->
          <div class="insight-trigger-card" id="btn-trigger-insights">
            <div class="insight-icon-box">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="10" width="4" height="11" rx="1"/>
                <rect x="10" y="5" width="4" height="16" rx="1"/>
                <rect x="17" y="13" width="4" height="8" rx="1"/>
              </svg>
            </div>
            <div class="insight-text-box">
              <div class="insight-title">${GROWW_DATA.insightCard.title}</div>
              <div class="insight-subtext">${GROWW_DATA.insightCard.subtext}</div>
            </div>
            <div class="insight-sparkline">
              <svg width="26" height="16" viewBox="0 0 40 20" fill="none">
                <path d="M2 14 L12 8 L22 16 L32 4 L38 10" stroke="#00D09C" stroke-width="2.2" stroke-linecap="round"/>
              </svg>
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>

          <!-- Holdings Header -->
          <div class="holdings-header-flat">
            <span><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg></span>
            <span class="sort-pill-flat">‹ › Day Change (%)</span>
          </div>

          <!-- Holdings List (Non-scrolling, fits in screen) -->
          <div class="holdings-flat-list">
            ${GROWW_DATA.funds.map(f => `
              <div class="holding-flat-row" data-fund-id="${f.id}">
                <div class="holding-left">
                  <span class="holding-fund-name">${f.planLine1 || f.name}</span>
                  ${f.planLine2 ? `<span style="font-size: 13px; font-weight: 600; color: var(--groww-text-primary);">${f.planLine2}</span>` : ''}
                  <span class="holding-sip-badge">${f.statusBadge}</span>
                </div>
                <div class="holding-right-val">
                  <span class="holding-curr-amount">₹${f.currentValue.toLocaleString('en-IN')}</span>
                  <span class="holding-pct ${f.dayChangePct < 0 ? 'loss' : 'gain'}">
                    ${f.dayChangePct > 0 ? '+' : ''}${f.dayChangePct}%
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SCREEN: AUTHENTIC GROWW MUTUAL FUND DETAILS (MATCHING IMG_9939-9941)
  // ==========================================
  function renderScreenFundDetails() {
    const fund = getSelectedFund();
    const h = fund.userHolding || {
      invested: fund.invested,
      currentValue: fund.currentValue,
      totalReturns: fund.returns,
      totalReturnsPct: fund.returnsPct,
      dayReturns: -72,
      dayReturnsPct: fund.dayChangePct,
      avgNav: 632.91,
      units: 4.74,
      activeSipAmount: fund.sipAmount,
      nextSipDate: "15 Nov 2026"
    };

    const calcData = getCalculatorData(fund, state.calcMode, state.calcAmount);
    const activeCalc = calcData[state.calcTf] || calcData["6M"];
    const isNeg = fund.returns < 0;

    return `
      <div class="fund-detail-wrapper" id="screen-fund-detail">
        <!-- Sticky Top Navigation Bar -->
        <div class="fund-detail-top-nav">
          <div class="fund-nav-left">
            <button class="back-btn" id="btn-back-to-dashboard-detail" title="Back to Dashboard">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M19 12H5m7 7-7-7 7-7"/></svg>
            </button>
            <div class="fund-nav-meta">
              <span class="fund-nav-title">${fund.name}</span>
              <div class="fund-nav-sub">
                <span class="${fund.dayChangePct < 0 ? 'loss' : 'gain'}">
                  ${fund.dayChangePct > 0 ? '+' : ''}${fund.dayChangePct}% · 1D
                </span>
                <span>•</span>
                <span>NAV ₹${fund.nav.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div class="fund-nav-right-icons">
            <button class="fund-nav-icon-btn" title="Save to Watchlist">
              <svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
            <button class="fund-nav-icon-btn" title="Search">
              <svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>
        </div>

        <!-- Scrollable Content -->
        <div class="fund-detail-scroll">
          <!-- Hero Header -->
          <div class="fund-detail-header-card">
            <div class="fund-brand-row">
              ${renderFundLogo(fund.id, 40)}
              <div class="fund-brand-info">
                <h1 class="fund-brand-title">${fund.name}</h1>
                <div class="fund-tags-pill-row">
                  <span class="fund-badge-chip">${fund.plan}</span>
                  <span class="fund-badge-chip">${fund.subCategory || fund.category}</span>
                  <span class="fund-badge-chip rating-chip">${fund.rating || 5} ★</span>
                </div>
              </div>
            </div>
          </div>

          <!-- User Investment in this Fund -->
          <div class="user-holding-detail-card">
            <div class="holding-card-top">
              <span class="holding-card-top-title">Your Investment</span>
              <span class="sip-status-pill ${fund.sipStatusClass || 'status-active'}">
                <span class="sip-status-dot"></span>${fund.status}
              </span>
            </div>
            <div class="user-holding-metrics-grid">
              <div class="user-holding-stat">
                <span class="uh-label">Current value</span>
                <span class="uh-value">₹${h.currentValue.toLocaleString('en-IN')}</span>
              </div>
              <div class="user-holding-stat">
                <span class="uh-label">Total returns</span>
                <span class="uh-value ${h.totalReturns < 0 ? 'loss' : 'gain'}">
                  ${h.totalReturns < 0 ? '-' : '+'}₹${Math.abs(h.totalReturns).toLocaleString('en-IN')} (${h.totalReturnsPct}%)
                </span>
              </div>
              <div class="user-holding-stat">
                <span class="uh-label">Invested</span>
                <span class="uh-value">₹${h.invested.toLocaleString('en-IN')}</span>
              </div>
              <div class="user-holding-stat">
                <span class="uh-label">1D returns</span>
                <span class="uh-value ${h.dayReturns < 0 ? 'loss' : 'gain'}">
                  ${h.dayReturns < 0 ? '-' : '+'}₹${Math.abs(h.dayReturns)} (${h.dayReturnsPct}%)
                </span>
              </div>
            </div>
            <div class="user-holding-sub-bar">
              <span>Avg NAV: <strong>₹${h.avgNav.toFixed(2)}</strong></span>
              <span>Units: <strong>${h.units.toFixed(2)}</strong></span>
              <span>SIP: <strong>₹${h.activeSipAmount}/mo</strong></span>
            </div>
          </div>

          <!-- Contextual Bridge to Solution: "Why is this fund down?" -->
          ${isNeg ? `
            <div class="fund-solution-bridge-card" id="btn-jump-to-deepdive">
              <div class="bridge-left">
                <div class="bridge-icon-box">
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <line x1="12" y1="20" x2="12" y2="10"/>
                    <line x1="18" y1="20" x2="18" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="16"/>
                  </svg>
                </div>
                <div>
                  <div class="bridge-title">Why is this fund down?</div>
                  <div class="bridge-sub">Understand market impact & how your SIP accumulated units</div>
                </div>
              </div>
              <div class="bridge-arrow-pill">
                <span>View Insights</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          ` : ''}

          <!-- Accordion 1: Return Calculator (Matching IMG_9939.PNG) -->
          <div class="groww-accordion-item">
            <div class="accordion-header-row" data-acc="calc">
              <span class="accordion-title">Return calculator</span>
              <svg class="accordion-chevron ${state.accordions.calc ? 'open' : ''}" id="acc-chev-calc" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <div class="accordion-body-box" id="acc-body-calc" style="display: ${state.accordions.calc ? 'block' : 'none'};">
              <div class="calc-type-segmented-control">
                <button class="calc-type-btn ${state.calcMode === 'sip' ? 'active' : ''}" data-mode="sip">Monthly SIP</button>
                <button class="calc-type-btn ${state.calcMode === 'lumpsum' ? 'active' : ''}" data-mode="lumpsum">One-time</button>
              </div>

              <div class="calc-amount-label">${state.calcMode === 'sip' ? 'Monthly investment' : 'One-time investment'}</div>
              <div class="calc-amount-val-display" id="calc-amount-val-text">₹${state.calcAmount.toLocaleString('en-IN')}</div>

              <div class="calc-slider-container">
                <input type="range" 
                  class="calc-range-slider" 
                  id="calc-slider-input" 
                  min="${state.calcMode === 'sip' ? 500 : 5000}" 
                  max="${state.calcMode === 'sip' ? 50000 : 200000}" 
                  step="${state.calcMode === 'sip' ? 500 : 5000}" 
                  value="${state.calcAmount}">
              </div>

              <!-- Bar Chart with 4 timeframes (6M, 1Y, 3Y, 5Y) -->
              <div class="calc-bars-display">
                ${['6M', '1Y', '3Y', '5Y'].map(tf => {
                  const item = calcData[tf];
                  const isActive = tf === state.calcTf;
                  return `
                    <div class="calc-bar-column ${isActive ? 'active' : ''}" data-tf="${tf}">
                      <div class="calc-bar-pair">
                        <div class="calc-bar-fill bar-invested" style="height: ${item.investedHeight}px;"></div>
                        <div class="calc-bar-fill bar-gain" style="height: ${item.futureValHeight}px;"></div>
                      </div>
                      <span class="calc-tf-pill-badge">${tf}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <div class="calc-dotted-divider"></div>

              <div class="calc-summary-stat-row">
                <div class="calc-stat-key">
                  <span class="calc-dot-indicator dot-gray"></span>
                  <span>Total investment</span>
                </div>
                <span class="calc-stat-val-text" id="calc-summary-invested">₹${Math.round(activeCalc.invested).toLocaleString('en-IN')}</span>
              </div>
              <div class="calc-summary-stat-row">
                <div class="calc-stat-key">
                  <span class="calc-dot-indicator dot-purple"></span>
                  <span>Would've become</span>
                </div>
                <span class="calc-stat-val-text" id="calc-summary-become">₹${Math.round(activeCalc.futureVal).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <!-- Accordion 2: Returns & rankings (Matching IMG_9940.PNG) -->
          <div class="groww-accordion-item">
            <div class="accordion-header-row" data-acc="returns">
              <span class="accordion-title">Returns & rankings</span>
              <svg class="accordion-chevron ${state.accordions.returns ? 'open' : ''}" id="acc-chev-returns" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <div class="accordion-body-box" id="acc-body-returns" style="display: ${state.accordions.returns ? 'block' : 'none'};">
              <div class="returns-rankings-subline">
                <span class="returns-cat-label">Category: ${fund.returnsTable?.categoryName || fund.category}</span>
                <span class="returns-annualised-link">Annualised ‹›</span>
              </div>

              <table class="groww-returns-table">
                <thead>
                  <tr>
                    <th></th>
                    ${(fund.returnsTable?.periods || ['1Y', '3Y', '5Y', 'All']).map(p => `<th>${p}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fund returns (%)</td>
                    ${(fund.returnsTable?.fundReturns || ['14.8%', '21.8%', '18.2%', '16.4%']).map(v => `<td>${v}</td>`).join('')}
                  </tr>
                  <tr>
                    <td>Category Avg. (%)</td>
                    ${(fund.returnsTable?.categoryAvg || ['12.1%', '16.5%', '14.3%', '13.9%']).map(v => `<td>${v}</td>`).join('')}
                  </tr>
                  <tr>
                    <td>Rank in category</td>
                    ${(fund.returnsTable?.rankInCategory || ['4', '2', '3', '-']).map(v => `<td>${v}</td>`).join('')}
                  </tr>
                </tbody>
              </table>

              <div class="understand-returns-link">
                <span>Understand returns</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
              </div>
            </div>
          </div>

          <!-- Accordion 3: Peer Comparison (Matching IMG_9940.PNG) -->
          <div class="groww-accordion-item">
            <div class="accordion-header-row" data-acc="peers">
              <span class="accordion-title">Peer Comparison</span>
              <svg class="accordion-chevron ${state.accordions.peers ? 'open' : ''}" id="acc-chev-peers" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <div class="accordion-body-box" id="acc-body-peers" style="display: ${state.accordions.peers ? 'block' : 'none'};">
              <div class="peer-comparison-list">
                ${(fund.peers || [
                  { name: "Peer Fund A", return3Y: "19.5%", expenseRatio: "0.75%" },
                  { name: "Peer Fund B", return3Y: "18.2%", expenseRatio: "0.68%" }
                ]).map(p => `
                  <div class="peer-fund-item">
                    <div class="peer-name-col">
                      <span class="peer-title">${p.name}</span>
                      <span class="peer-expense">Expense ratio: ${p.expenseRatio}</span>
                    </div>
                    <span class="peer-ret-col">${p.return3Y} (3Y)</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Accordion 4: Expense ratio, exit load & tax (Matching IMG_9941.PNG) -->
          <div class="groww-accordion-item">
            <div class="accordion-header-row" data-acc="expense">
              <span class="accordion-title">Expense ratio, exit load & tax</span>
              <svg class="accordion-chevron ${state.accordions.expense ? 'open' : ''}" id="acc-chev-expense" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <div class="accordion-body-box" id="acc-body-expense" style="display: ${state.accordions.expense ? 'block' : 'none'};">
              <div class="expense-tax-bullet-item">
                <span class="bullet-square">▪</span>
                <div class="expense-tax-content">
                  <h5 class="expense-tax-head">Expense ratio: ${fund.expenseRatio}</h5>
                  <p class="expense-tax-desc">${fund.taxDetails?.expenseRatioText || 'Exclusive of GST & statutory charges'}</p>
                </div>
              </div>

              <div class="expense-tax-bullet-item">
                <span class="bullet-square">▪</span>
                <div class="expense-tax-content">
                  <h5 class="expense-tax-head">Exit load</h5>
                  <p class="expense-tax-desc">${fund.taxDetails?.exitLoadText || fund.exitLoad}</p>
                </div>
              </div>

              <div class="expense-tax-bullet-item">
                <span class="bullet-square">▪</span>
                <div class="expense-tax-content">
                  <h5 class="expense-tax-head">Stamp duty on investment</h5>
                  <p class="expense-tax-desc">${fund.taxDetails?.stampDutyText || '0.005% (from July 1st, 2020)'}</p>
                </div>
              </div>

              <div class="expense-tax-bullet-item">
                <span class="bullet-square">▪</span>
                <div class="expense-tax-content">
                  <h5 class="expense-tax-head">Tax implication</h5>
                  <p class="expense-tax-desc">${fund.taxDetails?.taxImplicationText || "Returns taxed per current SEBI/IT regulations."}</p>
                </div>
              </div>

              <div class="expense-tax-footer-links">
                <div class="understand-returns-link">
                  <span>Understand terms</span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
                </div>
                <button class="check-past-data-btn">Check past data</button>
              </div>
            </div>
          </div>

          <!-- Accordion 5: Fund management (Matching IMG_9940.PNG) -->
          <div class="groww-accordion-item">
            <div class="accordion-header-row" data-acc="manager">
              <span class="accordion-title">Fund management</span>
              <svg class="accordion-chevron ${state.accordions.manager ? 'open' : ''}" id="acc-chev-manager" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <div class="accordion-body-box" id="acc-body-manager" style="display: ${state.accordions.manager ? 'block' : 'none'};">
              <div class="manager-profile-card" style="margin-bottom: 0;">
                <div class="manager-avatar-purple">
                  <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
                    <circle cx="22" cy="22" r="22" fill="#D8B4FE"/>
                    <circle cx="22" cy="16" r="7" fill="#374151"/>
                    <path d="M11 36 C11 28, 16 26, 22 26 C28 26, 33 28, 33 36 Z" fill="#1F2937"/>
                  </svg>
                </div>
                <div class="manager-info-col">
                  <span class="manager-kicker-label">LEAD MANAGER</span>
                  <h4 class="manager-fullname">${fund.fundManager.name}</h4>
                  <p class="manager-tenure-desc">${fund.fundManager.tenure}</p>
                </div>
                <div class="manager-tenure-pill">
                  <span>${fund.fundManager.tenureBadge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Bottom Action Bar (Matching IMG_9939.PNG) -->
        <div class="fund-detail-bottom-bar">
          <button class="btn-onetime-groww" id="btn-fund-onetime">One-time</button>
          <button class="btn-sip-groww" id="btn-fund-sip">Start SIP</button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SCREEN 2: FUND SELECTION (NON-SCROLLING)
  // ==========================================
  function renderScreen2FundSelection() {
    return `
      <div class="screen-view non-scrolling-screen" id="screen-fund-selection">
        <div class="slide-top-nav" style="padding: 12px 18px 4px 18px;">
          <button class="back-btn" id="btn-back-to-dashboard">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M19 12H5m7 7-7-7 7-7"/></svg>
          </button>
          <span class="slide-nav-title">Portfolio Insights</span>
        </div>

        <div class="fund-select-compact-view">
          <div class="hero-banner-clean">
            <h2 class="hero-title-clean">Understand your mutual funds</h2>
            <p class="hero-sub-clean">Select a fund to see why its value has changed and how your SIP is performing.</p>
          </div>

          <div class="funds-soft-stack">
            ${GROWW_DATA.funds.map(f => {
      const curVal = f.currentValue;
      const isNeg = f.returns < 0;
      const sign = isNeg ? '-' : '+';
      const absRet = Math.abs(f.returns).toLocaleString('en-IN');
      const absPct = Math.abs(f.returnsPct).toFixed(1);
      const retBadge = `${sign}₹${absRet} (${sign}${absPct}%)`;

      return `
                <div class="fund-card-soft" data-select-fund="${f.id}">
                  <div class="fund-card-header">
                    <div class="fund-identity">
                      ${renderFundLogo(f.id, 34)}
                      <div class="fund-name-block">
                        <span class="fund-name-text">${f.name}</span>
                        <div class="fund-plan-row">
                          <span>${f.plan}</span>
                          <span class="sip-status-pill ${f.sipStatusClass || 'status-active'}"><span class="sip-status-dot"></span>${f.sipStatus || 'Active'}</span>
                        </div>
                      </div>
                    </div>
                    <div class="fund-header-right">
                      <span class="fund-ret-label ${isNeg ? 'loss' : 'gain'}">
                        ${retBadge}
                      </span>
                      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" style="color: #9AA1AE;"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  </div>

                  <div class="fund-stats-row">
                    <div class="stat-item">
                      <span class="stat-label-muted">Invested</span>
                      <span class="stat-val-bold">₹${f.invested.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label-muted">Current value</span>
                      <span class="stat-val-bold">₹${curVal.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label-muted">SIP amount</span>
                      <span class="stat-val-bold">₹${f.sipAmount.toLocaleString('en-IN')} / month</span>
                    </div>
                  </div>
                </div>
              `;
    }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SCREEN 3+: THE SINGLE SCROLLING INFORMATION VIEW
  // (Combines Slides 3, 4, 5, 6, 7 after selecting a fund)
  // ==========================================
  function renderScreen3DeepDiveScroll() {
    const fund = getSelectedFund();
    const deep = fund.deepDive || GROWW_DATA.funds[0].deepDive;
    const ctx = deep.context || deep.recommendation || {
      tag: "What this means for your SIP",
      headline: "Your fund has experienced market fluctuations during your investment journey.",
      subtext: "Review the fund's performance, investment approach and your own financial needs before making a decision."
    };
    const market = fund.marketImpact || GROWW_DATA.funds[0].marketImpact;
    const hist = fund.historicalPerformance || GROWW_DATA.funds[0].historicalPerformance;
    const manager = fund.fundManager || GROWW_DATA.funds[0].fundManager;
    const health = fund.fundHealth || GROWW_DATA.funds[0].fundHealth;

    return `
      <div class="screen-view scrolling-deepdive-screen" id="screen-deepdive-scroll">
        <!-- Sticky Top Navigation -->
        <div class="slide-top-nav sticky-nav" style="padding: 12px 18px;">
          <button class="back-btn" id="btn-back-to-fundselect">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M19 12H5m7 7-7-7 7-7"/></svg>
          </button>
          <span class="slide-nav-title">Why is my portfolio down?</span>
        </div>

        <div class="deep-dive-scroll-content">
          <!-- Fund Header -->
          <div class="fund-hero-tag" style="padding: 6px 18px 2px 18px;">
            ${renderFundLogo(fund.id, 38)}
            <div class="fund-name-block">
              <span class="fund-name-text" style="font-size: 16px;">${fund.name}</span>
              <div class="fund-plan-row">
                <span>${fund.plan}</span>
                <span class="sip-pill-tag">${fund.status}</span>
              </div>
            </div>
          </div>

          <!-- Section A: Context Callout (Slide 3) -->
          <div style="padding: 10px 18px 0 18px;">
            <div class="context-card-soft">
              <div class="context-icon-box">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div class="context-tag-pill">${ctx.tag}</div>
                <h4 class="context-title-text">${ctx.headline}</h4>
                <p class="context-desc-text">${ctx.subtext}</p>
              </div>
            </div>
          </div>

          <!-- Section B: SIP Unit Accumulation (Slide 3) -->
          <div style="padding: 14px 18px 0 18px;">
            <div class="accumulation-container">
              <div class="acc-header">
                <div class="acc-icon-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <ellipse cx="12" cy="6" rx="8" ry="3"/>
                    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
                    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
                  </svg>
                </div>
                <div>
                  <h4 class="acc-title-main">${deep.unitAccumulation.title}</h4>
                  <p class="acc-sub-caption">${deep.unitAccumulation.subtitle}</p>
                </div>
              </div>

              <!-- Transaction Table -->
              <table class="sip-table-clean">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>SIP amount</th>
                    <th>NAV (₹)</th>
                    <th>Units</th>
                  </tr>
                </thead>
                <tbody>
                  ${deep.unitAccumulation.transactions.map(t => `
                    <tr>
                      <td>${t.month}</td>
                      <td>₹${t.amount.toLocaleString('en-IN')}</td>
                      <td>${t.nav.toFixed(2)}</td>
                      <td style="font-weight: 600; color: var(--groww-text-primary);">${t.units.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <!-- Total Units -->
              <div class="units-highlight-bar">
                <span class="units-lbl">Total units accumulated</span>
                <span class="units-big-num">${deep.unitAccumulation.totalUnits}</span>
              </div>

              <!-- Comparison Box -->
              <div class="comparison-pill-box">
                <div>
                  <div class="comp-left-label">${deep.unitAccumulation.constantNavScenario.label || `At constant NAV of ₹${deep.unitAccumulation.constantNavScenario.nav}`}</div>
                  <div class="comp-left-units">${deep.unitAccumulation.constantNavScenario.units.toFixed(2)} units</div>
                </div>
                <div class="comp-pill-green">
                  <div class="comp-pill-main-pct">+${deep.unitAccumulation.constantNavScenario.gainPct}%</div>
                  <div class="comp-pill-sub-txt">Additional units</div>
                </div>
              </div>

              <!-- Inline Reason inside the box before disclaimer -->
              <div class="comp-why-inline">
                <strong>Why:</strong> ${deep.whyInline || `As NAV fell from ₹680 to ₹595, your SIP bought more units.`}
              </div>

              <div class="disclaimer-muted">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
                <span>${deep.unitAccumulation.disclaimer}</span>
              </div>
            </div>
          </div>

          <div class="flow-divider"></div>

          <!-- Section D: Market Impact Attribution (Slide 4) -->
          <div style="padding: 0 18px;">
            <div class="section-title-row">
              <h3 class="flow-section-heading">Market Impact & Attribution</h3>
              <span class="flow-section-sub">Why broader market factors affect your returns</span>
            </div>

            <div class="alert-banner-pill" style="margin-bottom: 12px;">
              <div style="color: var(--groww-red);">
                <svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M7 7l10 10m0-10v10H7"/></svg>
              </div>
              <h4 class="alert-banner-title">${market.banner}</h4>
            </div>

            <div class="impact-breakdown-card" style="margin-bottom: 12px;">
              <h4 style="font-size: 14px; font-weight: 700; color: var(--groww-text-primary); margin-bottom: 4px;">How it impacted your portfolio</h4>
              ${market.factors.map(f => `
                <div class="factor-row-clean ${f.isTotal ? 'total' : ''} ${f.isProprietary ? 'proprietary' : ''}">
                  <span style="color: ${f.isTotal ? 'var(--groww-text-primary)' : (f.isProprietary ? 'var(--groww-green-text)' : 'var(--groww-text-secondary)')}; font-weight: ${f.isProprietary ? '600' : '500'};">
                    ${f.label}
                    ${f.isProprietary ? '<span class="proprietary-tag">Groww Only</span>' : ''}
                  </span>
                  <span style="color: ${f.color}; font-size: ${f.isTotal ? '15px' : '13.5px'}; font-weight: 700;">
                    ${f.changePct > 0 ? '+' : ''}${f.changePct}%
                  </span>
                </div>
              `).join('')}
            </div>

            ${market.behavioralInsight ? `
              <div class="behavioral-insight-card" style="margin-bottom: 12px;">
                <div class="behavioral-header-row">
                  <div class="behavioral-tag-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>${market.behavioralInsight.tag}</span>
                  </div>
                </div>
                <div class="behavioral-content-body">
                  <p class="behavioral-lead-text">
                    ${market.behavioralInsight.dipAction}
                  </p>
                  <div class="behavioral-reassurance-box">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00D09C" stroke-width="2.5" style="flex-shrink: 0;">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span class="behavioral-reassurance-text">${market.behavioralInsight.reassurance}</span>
                  </div>
                </div>
              </div>
            ` : ''}

            <div class="info-pill-note">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
              <span>${market.disclaimer || market.callout}</span>
            </div>
          </div>

          <div class="flow-divider"></div>

          <!-- Section E: Historical Performance in Downturns (Slide 5) -->
          <div style="padding: 0 18px;">
            <div class="section-title-row">
              <h3 class="flow-section-heading">Explore how Groww SIP investors responded during past market declines</h3>
            </div>

            ${(hist.cohortBehavior || hist.longitudinalCycles) ? `
              <!-- Compounding Data Advantage: Cohort Behavior Card (Screen 5) -->
              <div class="cohort-behavior-card" style="margin-top: 14px; margin-bottom: 4px;">
                <div class="cohort-hero-header-row">
                  <div class="cohort-hero-num">${hist.cohortBehavior?.heroPct || 81}%</div>
                  <span class="cohort-moat-pill">${hist.cohortBehavior?.moatBadge || "10-Year Data"}</span>
                </div>
                <div class="cohort-hero-label">${hist.cohortBehavior?.heroLabel || "continued their SIP during the February 2025 market dip"}</div>

                <!-- Multi-segment bar -->
                <div class="cohort-bar-track">
                  <div class="cohort-bar-seg seg-continued" style="width: 81%;"></div>
                  <div class="cohort-bar-seg seg-paused" style="width: 12%;"></div>
                  <div class="cohort-bar-seg seg-stopped" style="width: 7%;"></div>
                </div>

                <!-- 3-Column Legend -->
                <div class="cohort-stats-row">
                  <div class="cohort-stat-col">
                    <span class="cohort-stat-pct color-green">81%</span>
                    <span class="cohort-stat-label">Continued SIP</span>
                  </div>
                  <div class="cohort-stat-col">
                    <span class="cohort-stat-pct color-amber">12%</span>
                    <span class="cohort-stat-label">Paused</span>
                  </div>
                  <div class="cohort-stat-col">
                    <span class="cohort-stat-pct color-red">7%</span>
                    <span class="cohort-stat-label">Stopped</span>
                  </div>
                </div>

                <div class="cohort-hist-heading">
                  ${hist.cohortBehavior?.historicalHeading || "SIP continuation across previous market events"}
                </div>

                <div class="cohort-events-list">
                  ${(hist.cohortBehavior?.previousEvents || [
                    { name: "2020 · COVID crash", pct: 67 },
                    { name: "2022 · Rate hike correction", pct: 74 },
                    { name: "2024 · Election volatility", pct: 81 }
                  ]).map(ev => `
                    <div class="prev-event-item">
                      <div class="prev-event-meta">
                        <span class="prev-event-name">${ev.name}</span>
                        <span class="prev-event-pct">${ev.pct}%</span>
                      </div>
                      <div class="prev-event-bar-track">
                        <div class="prev-event-bar-fill" style="width: ${ev.pct}%;"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <div class="cohort-disclaimer">
                  ${hist.cohortBehavior?.disclaimer || "Based on anonymised SIP behaviour data from Groww investors.<br>Individual results may vary."}
                </div>
              </div>
            ` : ''}
          </div>

          <div class="flow-divider"></div>

          <!-- Section F: Fund Manager & Performance (Matching reference screen) -->
          <div style="padding: 0 18px;">
            <div class="section-title-row">
              <h3 class="flow-section-heading">Fund Manager & Performance</h3>
              <span class="flow-section-sub">Transparent governance, historical returns & investment approach</span>
            </div>

            <!-- Card 1: Fund Manager Identity -->
            <div class="manager-profile-card" style="margin-bottom: 12px;">
              <div class="manager-avatar-purple">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="22" fill="#D8B4FE"/>
                  <circle cx="22" cy="16" r="7" fill="#374151"/>
                  <path d="M11 36 C11 28, 16 26, 22 26 C28 26, 33 28, 33 36 Z" fill="#1F2937"/>
                  <path d="M19 26 L22 31 L25 26 Z" fill="#FFFFFF"/>
                  <path d="M21 28 L22 35 L23 28 Z" fill="#EF4444"/>
                  <rect x="17" y="14" width="4.5" height="3" rx="1" stroke="#FFFFFF" stroke-width="0.8" fill="none"/>
                  <rect x="22.5" y="14" width="4.5" height="3" rx="1" stroke="#FFFFFF" stroke-width="0.8" fill="none"/>
                  <line x1="21.5" y1="15.5" x2="22.5" y2="15.5" stroke="#FFFFFF" stroke-width="0.8"/>
                </svg>
              </div>
              <div class="manager-info-col">
                <span class="manager-kicker-label">FUND MANAGER</span>
                <h4 class="manager-fullname">${manager.name}</h4>
                <p class="manager-tenure-desc">${manager.tenure}</p>
              </div>
              <div class="manager-tenure-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>${manager.tenureBadge}</span>
              </div>
            </div>

            <!-- Card 2: Performance Comparison & Dual Wave Chart -->
            <div class="manager-perf-card" style="margin-bottom: 12px;">
              <div class="perf-card-header">
                <div class="perf-icon-badge">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <div>
                  <h4 class="perf-card-title">How has the fund performed?</h4>
                  <span class="perf-card-period">${manager.performancePeriod}</span>
                </div>
              </div>

              <div class="perf-split-row">
                <div class="perf-metric-boxes">
                  <div class="perf-stat-pill pill-fund">
                    <span class="perf-pill-label">Fund return</span>
                    <span class="perf-pill-val val-green">${manager.fundReturn}</span>
                  </div>
                  <div class="perf-stat-pill pill-category">
                    <span class="perf-pill-label">Category average</span>
                    <span class="perf-pill-val val-muted">${manager.categoryReturn}</span>
                  </div>
                </div>

                <div class="perf-chart-side">
                  <div class="perf-chart-svg-box">
                    <svg viewBox="0 0 145 65" width="100%" height="55" style="overflow: visible;">
                      <defs>
                        <linearGradient id="fundWaveGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stop-color="#00D09C" stop-opacity="0.25"/>
                          <stop offset="100%" stop-color="#00D09C" stop-opacity="0.0"/>
                        </linearGradient>
                      </defs>
                      <path d="M 5 50 Q 25 42, 50 35 T 95 24 T 140 10 L 140 60 L 5 60 Z" fill="url(#fundWaveGlow)"/>
                      <!-- Category average line -->
                      <path d="M 5 54 Q 30 50, 55 44 T 95 36 T 140 28" fill="none" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
                      <!-- Fund line -->
                      <path d="M 5 50 Q 25 42, 50 35 T 95 24 T 140 10" fill="none" stroke="#00D09C" stroke-width="2.4" stroke-linecap="round"/>
                      <circle cx="140" cy="10" r="3.5" fill="#00D09C" stroke="#fff" stroke-width="1.5"/>
                      <circle cx="140" cy="28" r="3" fill="#94A3B8" stroke="#fff" stroke-width="1.2"/>
                    </svg>
                  </div>
                  <div class="perf-legend-row">
                    <span class="perf-legend-tag"><span class="legend-line green"></span> This fund</span>
                    <span class="perf-legend-tag"><span class="legend-line gray"></span> Category avg</span>
                  </div>
                </div>
              </div>
            </div>

            ${manager.downturnTrackRecord ? `
            <!-- Card 2B: Downturn Track Record (Groww Proprietary Data) -->
            <div class="correction-nav-card" style="margin-bottom: 12px;">
              <div class="correction-card-header">
                <div class="correction-icon-trend">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A877" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
                <div style="flex: 1;">
                  <h4 class="correction-card-title">${manager.downturnTrackRecord.title}</h4>
                </div>
              </div>

              <div class="correction-stat-container">
                <div class="correction-stat-left">
                  <span class="correction-stat-num">${manager.downturnTrackRecord.correctionsCount}</span>
                  <span class="correction-stat-lbl">market<br>corrections</span>
                </div>
                <div class="correction-stat-divider"></div>
                <div class="correction-stat-right">
                  <div class="correction-stat-val">${manager.downturnTrackRecord.recoveryTime}</div>
                  <div class="correction-stat-sub">average time to recover</div>
                </div>
              </div>

              <div class="correction-card-footer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span>${manager.downturnTrackRecord.sourceNote}</span>
              </div>
            </div>
            ` : ''}

            <!-- Card 3: Investment Approach -->
            <div class="approach-card" style="margin-bottom: 12px;">
              <div class="approach-card-header">
                <div class="approach-icon-badge">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                </div>
                <h4 class="approach-card-title">Investment approach</h4>
              </div>
              <p class="approach-card-text">${manager.investmentApproach}</p>
            </div>

            <!-- Card 4: Keep In Mind Regulatory Disclaimer -->
            <div class="keep-in-mind-card" style="margin-bottom: 12px;">
              <div class="keep-icon-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <div class="keep-text-col">
                <h4 class="keep-card-title">Keep in mind</h4>
                <p class="keep-card-text">${manager.disclaimer}</p>
              </div>
            </div>
          </div>

          <div class="flow-divider"></div>

          <!-- Section G: Fund Essentials & Key Facts (Matching Groww IMG_9941.PNG) -->
          <div style="padding: 0 18px;">
            <div class="section-title-row">
              <h3 class="flow-section-heading">Fund Essentials & Details</h3>
              <span class="flow-section-sub">Direct plan facts sourced from AMC factsheet</span>
            </div>

            <div class="fund-essentials-card" style="margin-bottom: 12px;">
              <div class="essential-row">
                <span class="essential-label">Current NAV</span>
                <span class="essential-val">₹${fund.nav.toFixed(2)}</span>
              </div>
              <div class="essential-row">
                <span class="essential-label">Exit Load</span>
                <span class="essential-val note">${fund.exitLoad}</span>
              </div>
              <div class="essential-row">
                <span class="essential-label">Benchmark</span>
                <span class="essential-val muted">${fund.benchmark}</span>
              </div>
            </div>
          </div>

          <div class="flow-divider"></div>

          <!-- Section H: Summary & Key Takeaways (Slide 7) -->
          <div style="padding: 0 18px 30px 18px;">
            <div class="section-title-row">
              <h3 class="flow-section-heading">Summary & Key Takeaways</h3>
              <span class="flow-section-sub">Overview of management continuity, costs, and peer activity</span>
            </div>

            <!-- Compact Single Card Summary (Like previous one with little more space) -->
            <div class="takeaway-box-soft" style="margin-bottom: 14px; margin-top: 12px;">
              <div class="takeaway-rich-list">
                ${(health.personalizedHighlights || [
                  {
                    badgeClass: "mint",
                    title: "+9.6% extra units accumulated:",
                    desc: "Your ₹2,000 monthly SIP purchased 131.58 units at an average cost of ₹45.60 vs ₹50.00 initial NAV."
                  },
                  {
                    badgeClass: "blue",
                    title: "Outperforming category benchmark:",
                    desc: "Fund held up stronger at -4.2% compared to Nifty LargeMidcap 250 (-5.8%)."
                  },
                  {
                    badgeClass: "purple",
                    title: "Proven recovery record · 81% peer conviction:",
                    desc: "3 past corrections navigated (~14 mo avg recovery); 81% of Groww investors in this fund kept their SIP active."
                  }
                ]).map((hl, idx) => `
                  <div class="takeaway-item-rich">
                    <div class="takeaway-dot-icon ${hl.badgeClass}">
                      ${idx === 0 ? `
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                          <polyline points="17 6 23 6 23 12"/>
                        </svg>
                      ` : idx === 1 ? `
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                      ` : `
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      `}
                    </div>
                    <div>
                      <span class="takeaway-rich-title">${hl.title.endsWith(':') ? hl.title : hl.title + ':'}</span>
                      <span class="takeaway-rich-desc"> ${hl.desc}</span>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- In-Card Footer Link to Full Detailed Analysis -->
              <div class="takeaway-card-footer-link">
                <button class="btn-text-summary-link" id="btn-open-detailed-summary">
                  <span>View detailed summary analysis</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>

            <!-- Single Action Button: Back to Insights -->
            <div class="single-bottom-action">
              <button class="btn-primary-green btn-full-width" id="btn-back-to-insights-bottom">Back to Insights</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SCREEN 4: DETAILED SUMMARY ANALYSIS SCREEN
  // ==========================================
  function renderScreenDetailedSummary() {
    const fund = getSelectedFund();
    const health = fund.fundHealth || GROWW_DATA.funds[0].fundHealth;
    const detail = health.detailedAnalysis || {};
    const acc = detail.accumulation || {};
    const attr = detail.attribution || {};
    const gov = detail.governance || {};
    const auto = detail.autopay || {};

    return `
      <div class="screen-view detailed-summary-screen" id="screen-detailed-summary">
        <!-- Sticky Top Navigation -->
        <div class="slide-top-nav sticky-nav" style="padding: 12px 18px;">
          <button class="back-btn" id="btn-back-from-summary">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M19 12H5m7 7-7-7 7-7"/></svg>
          </button>
          <span class="slide-nav-title">Summary & Analysis Report</span>
        </div>

        <div class="deep-dive-scroll-content">
          <!-- Fund Header -->
          <div class="fund-hero-tag" style="padding: 6px 18px 8px 18px;">
            ${renderFundLogo(fund.id, 38)}
            <div class="fund-name-block">
              <span class="fund-name-text" style="font-size: 16px;">${fund.name}</span>
              <div class="fund-plan-row">
                <span>${fund.plan}</span>
                <span class="sip-pill-tag">${fund.status}</span>
              </div>
            </div>
          </div>

          <div style="padding: 6px 18px 24px 18px;">
            <!-- Executive Status Banner -->
            <div class="detailed-status-banner">
              <span class="detailed-status-pill">${detail.bannerTag || 'SIP ON TRACK · ACCUMULATING DISCOUNTED UNITS'}</span>
              <h3 class="detailed-banner-title">${detail.bannerTitle || 'Your investment strategy is working as intended'}</h3>
              <p class="detailed-banner-desc">${detail.bannerDesc || 'Temporary market dips are an inherent part of equity cycles. Your ongoing SIP acts as an automated cost-averaging mechanism.'}</p>
            </div>

            <!-- Section 1: SIP Accumulation Breakdown -->
            <div class="detailed-analysis-card">
              <div class="detailed-card-header">
                <div class="detailed-card-icon" style="background: #E8F8F3; color: #00A877;">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                </div>
                <h4 class="detailed-card-title">${acc.title || '1. SIP Unit Accumulation Advantage'}</h4>
              </div>
              <div class="detailed-stat-grid">
                <div class="detailed-stat-cell">
                  <div class="detailed-stat-val green">${acc.totalUnits || '131.58'}</div>
                  <div class="detailed-stat-lbl">Total Units (${acc.gainPct || '+9.6%'} extra)</div>
                </div>
                <div class="detailed-stat-cell">
                  <div class="detailed-stat-val">${acc.avgNav || '₹45.60'}</div>
                  <div class="detailed-stat-lbl">Average NAV (vs ${acc.initialNav || '₹50.00'})</div>
                </div>
              </div>
              <div class="detailed-insight-callout">
                ${acc.insight || ''}
              </div>
            </div>

            <!-- Section 2: Market & Macro Attribution -->
            <div class="detailed-analysis-card">
              <div class="detailed-card-header">
                <div class="detailed-card-icon" style="background: #EFF6FF; color: #2563EB;">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h4 class="detailed-card-title">${attr.title || '2. Market & Macro Attribution'}</h4>
              </div>
              <div class="detailed-stat-grid">
                <div class="detailed-stat-cell">
                  <div class="detailed-stat-val red">${attr.fundReturn || '-4.2%'}</div>
                  <div class="detailed-stat-lbl">Fund Return (vs ${attr.benchmarkReturn || '-5.8%'})</div>
                </div>
                <div class="detailed-stat-cell">
                  <div class="detailed-stat-val green">${attr.alpha || '+1.6%'}</div>
                  <div class="detailed-stat-lbl">Relative Alpha Outperformance</div>
                </div>
              </div>
              <div class="detailed-insight-callout">
                ${attr.insight || ''}
              </div>
            </div>

            <!-- Section 3: Governance & Historical Precedent -->
            <div class="detailed-analysis-card">
              <div class="detailed-card-header">
                <div class="detailed-card-icon" style="background: #FAF5FF; color: #7E22CE;">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h4 class="detailed-card-title">${gov.title || '3. Governance & Manager Precedent'}</h4>
              </div>
              <div class="detailed-stat-grid">
                <div class="detailed-stat-cell">
                  <div class="detailed-stat-val">${gov.tenure || '5+ years'}</div>
                  <div class="detailed-stat-lbl">Manager (${gov.managerName || 'Mr. R. Srinivasan'})</div>
                </div>
                <div class="detailed-stat-cell">
                  <div class="detailed-stat-val green">${gov.avgRecoveryTime || '~14 months'}</div>
                  <div class="detailed-stat-lbl">Avg Recovery (${gov.correctionsNavigated || '3 drawdowns'})</div>
                </div>
              </div>
              <div class="detailed-insight-callout">
                ${gov.insight || ''}
              </div>
            </div>

            <!-- Section 4: Upcoming Milestone & Execution -->
            <div class="detailed-analysis-card">
              <div class="detailed-card-header">
                <div class="detailed-card-icon" style="background: #FFF7ED; color: #EA580C;">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <h4 class="detailed-card-title">${auto.title || '4. Upcoming Milestone & Execution'}</h4>
              </div>
              <div class="detailed-stat-grid">
                <div class="detailed-stat-cell">
                  <div class="detailed-stat-val green">${auto.nextDate || '05 Apr 2025'}</div>
                  <div class="detailed-stat-lbl">Next SIP Date (${auto.amount || '₹2,000'})</div>
                </div>
                <div class="detailed-stat-cell">
                  <div class="detailed-stat-val" style="color: #EA580C;">3 / 3</div>
                  <div class="detailed-stat-lbl">Instalment Streak (100% on time)</div>
                </div>
              </div>
              <div class="detailed-insight-callout">
                ${auto.insight || ''}
              </div>
            </div>

            <!-- Bottom Actions -->
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 14px;">
              <button class="btn-primary-green btn-full-width" id="btn-back-to-insights-from-summary">Back to Portfolio Insights</button>
              <button class="btn-secondary-mint btn-full-width" id="btn-back-to-deepdive-bottom">Back to Fund Report</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // MASTER RENDER ENGINE
  // ==========================================
  function render() {
    const screenEl = document.getElementById("screen-content");
    if (!screenEl) return;

    // Toggle bottom nav bar visibility: show on dashboard, hide on sub-screens
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
      bottomNav.style.display = (state.currentView === 'dashboard') ? 'flex' : 'none';
    }

    if (state.currentView === "dashboard") {
      screenEl.className = "screen-content view-non-scroll";
      screenEl.innerHTML = renderScreen1Dashboard();
    } else if (state.currentView === "fund-detail") {
      screenEl.className = "screen-content view-non-scroll";
      screenEl.innerHTML = renderScreenFundDetails();
    } else if (state.currentView === "fund-select") {
      screenEl.className = "screen-content view-non-scroll";
      screenEl.innerHTML = renderScreen2FundSelection();
    } else if (state.currentView === "detailed-summary") {
      screenEl.className = "screen-content view-deepdive-scroll";
      screenEl.innerHTML = renderScreenDetailedSummary();
    } else {
      // 'deepdive-scroll': Single scrolling container combining all deep dive information
      screenEl.className = "screen-content view-deepdive-scroll";
      screenEl.innerHTML = renderScreen3DeepDiveScroll();
    }

    updateControlsUI();
    attachEventHandlers();

    if (scrollParam) {
      const scrollTarget = screenEl.querySelector(".fund-detail-scroll") || screenEl;
      if (scrollParam === 'bottom') {
        scrollTarget.scrollTop = 99999;
      } else {
        scrollTarget.scrollTop = parseInt(scrollParam) || 0;
      }
    }
  }

  function updateControlsUI() {
    // Update toolbar mode pills
    document.querySelectorAll(".flow-step-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === state.currentView);
    });
  }

  function attachEventHandlers() {
    // Screen 1: Click Insight Card -> Navigate to Screen 2 (Portfolio Insights / Fund Select)
    document.getElementById("btn-trigger-insights")?.addEventListener("click", () => {
      state.previousView = "dashboard";
      state.currentView = "fund-select";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    // Screen 1: Click direct holding row -> Select fund & open Authentic Fund Detail screen
    document.querySelectorAll(".holding-flat-row").forEach(el => {
      el.addEventListener("click", () => {
        state.selectedFundId = el.dataset.fundId;
        state.previousView = "dashboard";
        state.currentView = "fund-detail";
        render();
        const screenEl = document.getElementById("screen-content");
        if (screenEl) screenEl.scrollTop = 0;
      });
    });

    // Fund Details: Back button -> Back to Dashboard
    document.getElementById("btn-back-to-dashboard-detail")?.addEventListener("click", () => {
      state.currentView = "dashboard";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    // Fund Details: Bridge card to Solution ("Why is this fund down?") -> Open Deep Dive Solution!
    document.getElementById("btn-jump-to-deepdive")?.addEventListener("click", () => {
      state.previousView = "fund-detail";
      state.currentView = "deepdive-scroll";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    // Fund Details: Accordion toggles
    document.querySelectorAll(".accordion-header-row").forEach(header => {
      header.addEventListener("click", () => {
        const accKey = header.dataset.acc;
        if (accKey) {
          state.accordions[accKey] = !state.accordions[accKey];
          const body = document.getElementById(`acc-body-${accKey}`);
          const chevron = document.getElementById(`acc-chev-${accKey}`);
          if (body && chevron) {
            body.style.display = state.accordions[accKey] ? "block" : "none";
            chevron.classList.toggle("open", state.accordions[accKey]);
          }
        }
      });
    });

    // Fund Details: Calculator mode toggle (Monthly SIP vs One-time)
    document.querySelectorAll(".calc-type-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.calcMode = btn.dataset.mode;
        state.calcAmount = state.calcMode === "sip" ? 5000 : 25000;
        render();
      });
    });

    // Fund Details: Calculator slider
    const slider = document.getElementById("calc-slider-input");
    if (slider) {
      slider.addEventListener("input", (e) => {
        state.calcAmount = parseInt(e.target.value);
        updateCalculatorUI();
      });
    }

    // Fund Details: Calculator timeframe pills
    document.querySelectorAll(".calc-bar-column").forEach(col => {
      col.addEventListener("click", () => {
        state.calcTf = col.dataset.tf;
        updateCalculatorUI();
      });
    });

    // Screen 2: Back button -> Back to Screen 1 (Dashboard)
    document.getElementById("btn-back-to-dashboard")?.addEventListener("click", () => {
      state.currentView = "dashboard";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    // Screen 2: Click any fund -> Select fund & open Deep Dive Solution Report!
    document.querySelectorAll(".fund-card-soft").forEach(el => {
      el.addEventListener("click", () => {
        state.selectedFundId = el.dataset.selectFund;
        state.previousView = "fund-select";
        state.currentView = "deepdive-scroll";
        render();
        const screenEl = document.getElementById("screen-content");
        if (screenEl) screenEl.scrollTop = 0;
      });
    });

    // Screen 3: Back button -> Back to previous view (Fund Detail or Fund Select)
    document.getElementById("btn-back-to-fundselect")?.addEventListener("click", () => {
      state.currentView = (state.previousView === "fund-detail") ? "fund-detail" : "fund-select";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    // Screen 3: Bottom "Back to Insights" -> Back to Screen 2 (Portfolio Insights / Fund Select)
    document.getElementById("btn-back-to-insights-bottom")?.addEventListener("click", () => {
      state.currentView = "fund-select";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    // Screen 3: Open Detailed Summary Analysis Screen
    document.getElementById("btn-open-detailed-summary")?.addEventListener("click", () => {
      state.previousView = "deepdive-scroll";
      state.currentView = "detailed-summary";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    // Screen 4: Back from Detailed Summary Screen
    document.getElementById("btn-back-from-summary")?.addEventListener("click", () => {
      state.currentView = "deepdive-scroll";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    document.getElementById("btn-back-to-deepdive-bottom")?.addEventListener("click", () => {
      state.currentView = "deepdive-scroll";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    document.getElementById("btn-back-to-insights-from-summary")?.addEventListener("click", () => {
      state.currentView = "fund-select";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    // Screen 3: Bottom "Change Fund" -> Back to Screen 2 (Fund Select)
    document.getElementById("btn-change-fund-bottom")?.addEventListener("click", () => {
      state.currentView = "fund-select";
      render();
      const screenEl = document.getElementById("screen-content");
      if (screenEl) screenEl.scrollTop = 0;
    });

    // Manager chart timeframe buttons
    document.querySelectorAll(".tf-pill-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.managerTf = btn.dataset.tf;
        const chartBox = document.getElementById("manager-chart-container");
        if (chartBox) {
          const fund = getSelectedFund();
          chartBox.innerHTML = renderManagerChart(fund, state.managerTf);
          attachEventHandlers();
        }
      });
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    // Presentation top toolbar navigation buttons
    document.querySelectorAll(".flow-step-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.currentView = btn.dataset.view;
        render();
      });
    });

    render();
  });
})();
