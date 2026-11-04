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
    // Views: 'dashboard' (Slide 1), 'fund-select' (Slide 2), 'deepdive-scroll' (Slides 3-7 combined)
    currentView: viewParam || (slideParam === '1' ? 'dashboard' : (slideParam === '2' ? 'fund-select' : (slideParam ? 'slide-inspect' : 'dashboard'))),
    inspectSlideNum: slideParam ? parseInt(slideParam) : 3,
    selectedFundId: fundParam || "sbi-large-midcap",
    managerTf: "3Y"
  };

  const getSelectedFund = () => {
    return GROWW_DATA.funds.find(f => f.id === state.selectedFundId) || GROWW_DATA.funds[0];
  };

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
        <!-- Groww Top App Bar -->
        <div class="groww-appbar" style="padding: 14px 18px 8px 18px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #E8EBF0; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #242833;">
              U
            </div>
          </div>
          <div class="appbar-actions-right">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
        </div>

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
              <svg width="34" height="18" viewBox="0 0 40 20" fill="none">
                <path d="M2 14 L12 8 L22 16 L32 4 L38 10" stroke="#00D09C" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
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
            <div class="hero-svg-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="11" width="3.5" height="10" rx="1" fill="#6366F1"/>
                <rect x="7.5" y="6" width="3.5" height="15" rx="1" fill="#818CF8"/>
                <circle cx="16" cy="7" r="5" stroke="#00D09C" stroke-width="2"/>
                <line x1="20" y1="11" x2="23" y2="14" stroke="#00D09C" stroke-width="2"/>
                <line x1="16" y1="0.5" x2="16" y2="1.5" stroke="#00D09C" stroke-width="1.5"/>
              </svg>
            </div>
            <h2 class="hero-title-clean">Understand your mutual funds</h2>
            <p class="hero-sub-clean">Select a fund to see why its value has changed and how your SIP is performing.</p>
          </div>

          <div class="funds-soft-stack">
            ${GROWW_DATA.funds.map(f => {
      const curVal = f.slide2CurrentValue || f.currentValue;
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
                          <span class="sip-pill-tag">${f.statusBadge}</span>
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

          <!-- Section A: Recommendation Callout (Slide 3) -->
          <div style="padding: 10px 18px 0 18px;">
            <div class="rec-card-soft">
              <div class="rec-icon-box">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a6 6 0 0 0-6 6c0 2.22 1.21 4.16 3 5.2V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.8c1.79-1.04 3-2.98 3-5.2a6 6 0 0 0-6-6zM9 21h6"/></svg>
              </div>
              <div>
                <div class="rec-tag-pill">${deep.recommendation.tag}</div>
                <h4 class="rec-title-text">${deep.recommendation.headline}</h4>
                <p class="rec-desc-text">${deep.recommendation.subtext}</p>
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
                  <div class="comp-left-label">If NAV remained flat</div>
                  <div class="comp-left-units">${deep.unitAccumulation.constantNavScenario.units.toFixed(2)} units</div>
                </div>
                <div class="comp-pill-green">
                  ▲ ≈ ${deep.unitAccumulation.constantNavScenario.gainPct}% more units
                  <div style="font-size: 9.5px; font-weight: 500; opacity: 0.9;">(${deep.unitAccumulation.constantNavScenario.comparisonText})</div>
                </div>
              </div>

              <div class="disclaimer-muted">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
                <span>${deep.unitAccumulation.disclaimer}</span>
              </div>
            </div>
          </div>

          <!-- Section C: What This Means (Slide 3) -->
          <div style="padding: 14px 18px 0 18px;">
            <div class="what-means-soft">
              <div class="what-means-icon-box">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8m8 4H8m2-8H8"/></svg>
              </div>
              <div>
                <h4 style="font-size: 13.5px; font-weight: 700; color: var(--groww-text-primary); margin-bottom: 3px;">What this means</h4>
                <p style="font-size: 11.5px; line-height: 1.45; color: var(--groww-text-secondary);">${deep.whatThisMeans}</p>
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

            ${market.timingCard ? `
              <div class="timing-insight-card" style="margin-bottom: 12px;">
                <div class="timing-insight-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div class="timing-insight-content">
                  <p class="timing-insight-text">${market.timingCard.text}</p>
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
              <h3 class="flow-section-heading">Historical Performance</h3>
              <span class="flow-section-sub">How this fund navigated past market drawdowns</span>
            </div>

            <div class="hist-tabs-pill" style="margin-bottom: 10px;">
              <div class="hist-tab-btn active">This Fund</div>
              <div class="hist-tab-btn">vs Category</div>
            </div>

            <div class="chart-card-soft" style="margin-bottom: 12px;">
              <div style="width: 100%; height: 165px; position: relative;">
                ${renderHistoricalChart(fund)}
              </div>
            </div>

            <div class="info-pill-note">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
              <span>${hist.callout}</span>
            </div>
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
                <span class="essential-label">Fund Size (AUM)</span>
                <span class="essential-val">${fund.aum}</span>
              </div>
              <div class="essential-row">
                <span class="essential-label">Expense Ratio</span>
                <span class="essential-val highlight">${fund.expenseRatio}</span>
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

          <!-- Section H: Fund Health Summary (Slide 7) -->
          <div style="padding: 0 18px 30px 18px;">
            <div class="health-badge-clean" style="margin-bottom: 12px;">
              <div class="health-shield-soft">
                <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 class="health-main-title">${health.status}</h3>
              <p class="health-sub-text">${health.subtitle}</p>
            </div>

            <div class="takeaway-box-soft" style="margin-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 8px; font-size: 14.5px; font-weight: 700; color: var(--groww-text-primary);">
                <svg width="18" height="18" fill="#3B82F6" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                <span>Key Takeaways</span>
              </div>
              <ul class="takeaway-list-clean">
                ${health.takeaways.map((t, idx) => `
                  <li class="takeaway-item-clean ${idx === health.takeaways.length - 1 ? 'cohort-takeaway' : ''}">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m5 13 4 4L19 7"/></svg>
                    <span>${t}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Cohort Intelligence Card (Moat 2: What other Groww investors in this fund did) -->
            ${health.cohortActivity ? `
              <div class="cohort-intelligence-card" style="margin-bottom: 16px;">
                <div class="cohort-header">
                  <div class="cohort-title-row">
                    <div class="cohort-icon-wrap">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div>
                      <h4 class="cohort-card-title">What other Groww investors in this fund did</h4>
                      <span class="cohort-card-sub">During the last market dip (${health.cohortActivity.dipPeriod})</span>
                    </div>
                  </div>
                  <span class="proprietary-tag">Cohort Moat</span>
                </div>

                <div class="cohort-bar-track">
                  <div class="cohort-bar-segment segment-continued" style="width: ${health.cohortActivity.continuedPct}%;"></div>
                  <div class="cohort-bar-segment segment-paused" style="width: ${health.cohortActivity.pausedPct}%;"></div>
                  <div class="cohort-bar-segment segment-stopped" style="width: ${health.cohortActivity.stoppedPct}%;"></div>
                </div>

                <div class="cohort-stats-grid">
                  <div class="cohort-stat-item">
                    <div class="cohort-stat-indicator indicator-green"></div>
                    <div class="cohort-stat-info">
                      <span class="cohort-stat-val">${health.cohortActivity.continuedPct}%</span>
                      <span class="cohort-stat-label">continued their SIP</span>
                    </div>
                  </div>
                  <div class="cohort-stat-item">
                    <div class="cohort-stat-indicator indicator-amber"></div>
                    <div class="cohort-stat-info">
                      <span class="cohort-stat-val">${health.cohortActivity.pausedPct}%</span>
                      <span class="cohort-stat-label">paused temporarily</span>
                    </div>
                  </div>
                  <div class="cohort-stat-item">
                    <div class="cohort-stat-indicator indicator-red"></div>
                    <div class="cohort-stat-info">
                      <span class="cohort-stat-val">${health.cohortActivity.stoppedPct}%</span>
                      <span class="cohort-stat-label">stopped</span>
                    </div>
                  </div>
                </div>

                <div class="cohort-sample-footer">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
                  <span>Based on ${health.cohortActivity.sampleSize}</span>
                </div>
              </div>
            ` : ''}

            <!-- Dual Action Buttons Matching Groww Fund Detail (IMG_9939) -->
            <div class="dual-bottom-actions">
              <button class="btn-secondary-mint" id="btn-change-fund-bottom">Change Fund</button>
              <button class="btn-primary-green" id="btn-back-to-dashboard-bottom">Keep SIP Active</button>
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

    if (state.currentView === "dashboard") {
      screenEl.className = "screen-content view-non-scroll";
      screenEl.innerHTML = renderScreen1Dashboard();
    } else if (state.currentView === "fund-select") {
      screenEl.className = "screen-content view-non-scroll";
      screenEl.innerHTML = renderScreen2FundSelection();
    } else {
      // 'deepdive-scroll': Single scrolling container combining all deep dive information
      screenEl.className = "screen-content view-deepdive-scroll";
      screenEl.innerHTML = renderScreen3DeepDiveScroll();
    }

    updateControlsUI();
    attachEventHandlers();

    if (scrollParam) {
      if (scrollParam === 'bottom') {
        screenEl.scrollTop = 99999;
      } else {
        screenEl.scrollTop = parseInt(scrollParam) || 0;
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
    // Screen 1: Click Insight Card -> Navigate to Screen 2 (Fund Select)
    document.getElementById("btn-trigger-insights")?.addEventListener("click", () => {
      state.currentView = "fund-select";
      render();
    });

    // Screen 1: Click direct holding row -> Select fund & open Deep Dive Scroll
    document.querySelectorAll(".holding-flat-row").forEach(el => {
      el.addEventListener("click", () => {
        state.selectedFundId = el.dataset.fundId;
        state.currentView = "deepdive-scroll";
        render();
      });
    });

    // Screen 2: Back button -> Back to Screen 1 (Dashboard)
    document.getElementById("btn-back-to-dashboard")?.addEventListener("click", () => {
      state.currentView = "dashboard";
      render();
    });

    // Screen 2: Click any fund -> Select fund & open Deep Dive Scroll!
    document.querySelectorAll(".fund-card-soft").forEach(el => {
      el.addEventListener("click", () => {
        state.selectedFundId = el.dataset.selectFund;
        state.currentView = "deepdive-scroll";
        render();
        const screenEl = document.getElementById("screen-content");
        if (screenEl) screenEl.scrollTop = 0;
      });
    });

    // Screen 3: Back button -> Back to Screen 2 (Fund Select)
    document.getElementById("btn-back-to-fundselect")?.addEventListener("click", () => {
      state.currentView = "fund-select";
      render();
    });

    // Screen 3: Bottom "Keep SIP Active" -> Back to Screen 1 (Dashboard)
    document.getElementById("btn-back-to-dashboard-bottom")?.addEventListener("click", () => {
      state.currentView = "dashboard";
      render();
    });

    // Screen 3: Bottom "Change Fund" -> Back to Screen 2 (Fund Select)
    document.getElementById("btn-change-fund-bottom")?.addEventListener("click", () => {
      state.currentView = "fund-select";
      render();
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
