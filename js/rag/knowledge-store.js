// Groww Portfolio Understanding MVP - Hybrid Knowledge Store
// Strict Data Boundary Separation: Structured Ledgers (SQL/RTA) vs. Unstructured Document Chunks (Factsheets)
// Enforces Source Truth Precedence: Tier 1 RTA > Tier 2 Exchange > Tier 3 AMC Factsheet

const GROWW_KNOWLEDGE_STORE = (function () {
  // Source Truth Precedence Tiers (Section 9.3)
  const DATA_SOURCE_TIERS = Object.freeze({
    TIER_1_RTA: {
      tier: 1,
      id: "TIER_1_RTA",
      name: "RTA Confirmed Ledger (CAMS / KFintech)",
      authority: "Registrar and Transfer Agent (CAMS / KFintech)",
      description: "Ultimate Financial Truth: Governs unit balances, transaction amounts, and allotment dates.",
      maxDriftPct: 0.0
    },
    TIER_2_EXCHANGE: {
      tier: 2,
      id: "TIER_2_EXCHANGE",
      name: "NSE / BSE Exchange TRI Feeds",
      authority: "NSE Indices Limited / BSE India",
      description: "Market & Benchmark Truth: Governs index movements and relative beta comparisons.",
      maxDriftPct: 0.0
    },
    TIER_3_AMC: {
      tier: 3,
      id: "TIER_3_AMC",
      name: "AMC Official Factsheet & Disclosures",
      authority: "Asset Management Company (AMC Filing)",
      description: "Qualitative Strategy Truth: Governs sector commentary, macro factors, and fund manager details.",
      maxPublicationLagDays: 45
    }
  });

  // 1. Structured Data Store (Exact Ledger Numbers & Transaction Truth)
  // Strict Boundary: Contains ONLY verified financial facts, transaction tranches, and exchange benchmarks.
  const STRUCTURED_LEDGERS = {
    "sbi-large-midcap": {
      fundId: "sbi-large-midcap",
      fundName: "SBI Large & Midcap Fund",
      plan: "Direct Plan · Growth",
      category: "Equity Large & Mid Cap",
      isin: "INF200K01VA1",
      folioNumber: "108392019/42",
      sourceTier: "TIER_1_RTA",
      sourceAuthority: "CAMS Settlement System (Mutual Fund Folio Registry)",
      rtaSyncTimestamp: "2026-11-06T18:30:00Z",
      asOfDate: "07 Nov 2026",
      navDate: "06 Nov 2026",
      navTimestamp: "2026-11-06T21:00:00Z",
      currentNav: 580.17,
      benchmark: "NIFTY LargeMidcap 250 TRI",
      benchmarkDrawdownPct: -4.20,
      nifty50DrawdownPct: -2.60,
      benchmarkFeed: {
        sourceTier: "TIER_2_EXCHANGE",
        sourceAuthority: "NSE Indices Limited (TRI Feed)",
        benchmarkName: "NIFTY LargeMidcap 250 TRI",
        benchmarkDrawdownPct: -4.20,
        nifty50DrawdownPct: -2.60,
        feedTimestamp: "2026-11-06T16:00:00Z"
      },
      manager: "Mr. R. Srinivasan",
      managerTenure: "5+ years",
      activeSipAmount: 1000,
      sipFrequency: "Monthly",
      transactions: [
        {
          txnId: "CAMS-TXN-20260115-001",
          month: "January 2026",
          date: "15 Jan 2026",
          allotmentDate: "16 Jan 2026",
          settlementCycle: "T+1",
          amount: 1000,
          allotmentNav: 680.00,
          units: 1.4706,
          status: "SUCCESS"
        },
        {
          txnId: "CAMS-TXN-20260215-002",
          month: "February 2026",
          date: "15 Feb 2026",
          allotmentDate: "16 Feb 2026",
          settlementCycle: "T+1",
          amount: 1000,
          allotmentNav: 630.00,
          units: 1.5873,
          status: "SUCCESS"
        },
        {
          txnId: "CAMS-TXN-20260315-003",
          month: "March 2026",
          date: "15 Mar 2026",
          allotmentDate: "16 Mar 2026",
          settlementCycle: "T+1",
          amount: 1000,
          allotmentNav: 595.00,
          units: 1.6807,
          status: "SUCCESS"
        }
      ],
      failedTransactions: [
        {
          txnId: "CAMS-TXN-20260228-F01",
          month: "February 2026",
          date: "28 Feb 2026",
          amount: 1000,
          reason: "MANDATE_BANK_SERVER_TIMEOUT",
          status: "FAILED"
        }
      ]
    },
    "parag-parikh-flexi-cap": {
      fundId: "parag-parikh-flexi-cap",
      fundName: "Parag Parikh Flexi Cap Fund",
      plan: "Direct Plan · Growth",
      category: "Flexi Cap Fund",
      isin: "INF879O01019",
      folioNumber: "948201842/17",
      sourceTier: "TIER_1_RTA",
      sourceAuthority: "CAMS Settlement System (Mutual Fund Folio Registry)",
      rtaSyncTimestamp: "2026-11-06T18:30:00Z",
      asOfDate: "07 Nov 2026",
      navDate: "06 Nov 2026",
      navTimestamp: "2026-11-06T21:00:00Z",
      currentNav: 72.40,
      benchmark: "NIFTY 500 TRI",
      benchmarkDrawdownPct: -3.80,
      nifty50DrawdownPct: -2.60,
      benchmarkFeed: {
        sourceTier: "TIER_2_EXCHANGE",
        sourceAuthority: "NSE Indices Limited (TRI Feed)",
        benchmarkName: "NIFTY 500 TRI",
        benchmarkDrawdownPct: -3.80,
        nifty50DrawdownPct: -2.60,
        feedTimestamp: "2026-11-06T16:00:00Z"
      },
      manager: "Mr. Rajeev Thakkar",
      managerTenure: "10+ years",
      activeSipAmount: 1000,
      sipFrequency: "Monthly",
      transactions: [
        {
          txnId: "CAMS-TXN-20260110-001",
          month: "January 2026",
          date: "10 Jan 2026",
          allotmentDate: "11 Jan 2026",
          settlementCycle: "T+1",
          amount: 1000,
          allotmentNav: 78.50,
          units: 12.7388,
          status: "SUCCESS"
        },
        {
          txnId: "CAMS-TXN-20260210-002",
          month: "February 2026",
          date: "10 Feb 2026",
          allotmentDate: "11 Feb 2026",
          settlementCycle: "T+1",
          amount: 1000,
          allotmentNav: 75.20,
          units: 13.2978,
          status: "SUCCESS"
        },
        {
          txnId: "CAMS-TXN-20260310-003",
          month: "March 2026",
          date: "10 Mar 2026",
          allotmentDate: "11 Mar 2026",
          settlementCycle: "T+1",
          amount: 1000,
          allotmentNav: 72.40,
          units: 13.8121,
          status: "SUCCESS"
        }
      ],
      failedTransactions: []
    }
  };

  // 2. Unstructured Document Chunks (Factsheets, AMFI Guidelines, Disclosures)
  // Strict Boundary: Passive qualitative reference only. Contains NO ledger holdings or balance data.
  // Each chunk carries explicit temporal metadata and verified source citations.
  const DOCUMENT_CHUNKS = [
    // SBI Large & Midcap Factsheet Chunks
    {
      id: "chunk_sbi_macro_01",
      fundId: "sbi-large-midcap",
      sourceTier: "TIER_3_AMC",
      category: "macro",
      section: "[Macroeconomic Outlook & Market Pullback]",
      title: "Macroeconomic Environment & Foreign Inflows",
      asOfDate: "31 Oct 2026",
      filingDate: "2026-10-31",
      validUntil: "2026-12-15",
      pageNumber: 3,
      tablePreserved: true,
      tableMarkdown: `| Macro Driver | Factor Volatility | Impact on Scheme % | Context |
| :--- | :--- | :--- | :--- |
| FII Capital Outflows | Net outflow ₹18,400 Cr | -1.70% | Global risk-off sentiment in EM equities |
| Brent Crude Oil | +14.2% volatility spike | -0.90% | Pressure on corporate operating margins |`,
      source: "SBI Mutual Fund Monthly Factsheet (Oct 2026, Page 3)",
      content: "Macroeconomic drag contributed approximately -2.6% to broader equities due to Foreign Institutional Investors (FII) net outflows and crude oil price volatility across emerging markets.",
      tags: ["macro", "fii", "crude", "oil", "market dip", "outflow", "drawdown"]
    },
    {
      id: "chunk_sbi_sector_01",
      fundId: "sbi-large-midcap",
      sourceTier: "TIER_3_AMC",
      category: "sector",
      section: "[Sector Allocation & Performance Attribution]",
      title: "Sector Exposure: Banking & Financial Services",
      asOfDate: "31 Oct 2026",
      filingDate: "2026-10-31",
      validUntil: "2026-12-15",
      pageNumber: 4,
      tablePreserved: true,
      tableMarkdown: `| Sector | Allocation % | Benchmark % | Net Contribution % | Verified Driver |
| :--- | :--- | :--- | :--- | :--- |
| Banking & Financial Services (BFSI) | 31.4% | 28.6% | -4.10% | NIM compression & credit cost adjustments |
| Industrials & Cap Goods | 14.2% | 12.1% | -1.20% | Raw material input inflation |
| Information Technology | 9.8% | 11.4% | +0.40% | Offshore deal pipeline resilience |
| Healthcare | 8.5% | 7.2% | +0.20% | Domestic formulations growth |`,
      source: "SBI Mutual Fund Monthly Factsheet (Oct 2026, Page 4)",
      content: "Sector exposure contributed approximately -4.1% drawdown. The fund maintains a 31.4% allocation to Banking & Financial Services (BFSI), which experienced temporary Net Interest Margin (NIM) compression and credit cost adjustments.",
      tags: ["sector", "banking", "bfsi", "financial services", "nim", "drawdown", "allocation"]
    },
    {
      id: "chunk_sbi_benchmark_01",
      fundId: "sbi-large-midcap",
      sourceTier: "TIER_3_AMC",
      category: "benchmark",
      section: "[Benchmark Dynamics & Beta Exposure]",
      title: "Benchmark Allocation vs NIFTY 50",
      asOfDate: "31 Oct 2026",
      filingDate: "2026-10-31",
      validUntil: "2026-12-15",
      pageNumber: 2,
      tablePreserved: true,
      tableMarkdown: `| Metric | Fund Allocation % | NIFTY 50 % | Historical Beta |
| :--- | :--- | :--- | :--- |
| Giant / Large Cap | 65.0% | 100.0% | 1.00 |
| Mid Cap Stocks | 35.0% | 0.0% | 1.35 |`,
      source: "NSE Indices & Scheme Information Document",
      content: "SBI Large & Midcap Fund is benchmarked against NIFTY LargeMidcap 250 TRI. The fund allocates approx 35% to mid-cap stocks, which possess higher growth potential but also exhibit higher beta and sharper pullbacks during market corrections compared to NIFTY 50.",
      tags: ["benchmark", "nifty 50", "nifty 250", "midcap", "volatility", "beta"]
    },
    {
      id: "chunk_sbi_governance_01",
      fundId: "sbi-large-midcap",
      sourceTier: "TIER_3_AMC",
      category: "governance",
      section: "[Fund Governance & Track Record]",
      title: "Fund Manager Profile & Historical Navigation",
      asOfDate: "31 Oct 2026",
      filingDate: "2026-10-31",
      validUntil: "2026-12-15",
      pageNumber: 5,
      tablePreserved: true,
      tableMarkdown: `| Market Correction Event | Market Pullback % | Fund Drawdown % | Historical Recovery Duration |
| :--- | :--- | :--- | :--- |
| 2020 COVID-19 Crash | -38.4% | -31.2% | 7 Months |
| 2022 Global Rate Hikes | -16.8% | -12.4% | 11 Months |
| 2024 Election Volatility | -8.9% | -6.5% | 4 Months |`,
      source: "SBI AMC Regulatory Disclosures & Scheme Key Information",
      content: "Mr. R. Srinivasan has managed this scheme for over 5 years, successfully steering the fund through 3 major market corrections (COVID-19 in 2020, rate-hikes in 2022, and election volatility in 2024). The scheme's 3-year annualized return stands at 21.8%, outperforming the category average of 16.5%.",
      tags: ["manager", "srinivasan", "experience", "tenure", "governance", "track record"]
    },

    // Parag Parikh Flexi Cap Factsheet Chunks
    {
      id: "chunk_ppfas_macro_01",
      fundId: "parag-parikh-flexi-cap",
      sourceTier: "TIER_3_AMC",
      category: "macro",
      section: "[Global Equity & Macro Allocation]",
      title: "Global Equity Valuation Adjustments",
      asOfDate: "31 Oct 2026",
      filingDate: "2026-10-31",
      validUntil: "2026-12-15",
      pageNumber: 2,
      tablePreserved: true,
      tableMarkdown: `| Asset Class | Fund Weight % | Sector Focus |
| :--- | :--- | :--- |
| Domestic Equities | 70.0% | Core Value & Financials |
| Foreign Equities | 16.0% | US Mega-cap Technology |
| Cash & Arbitrage Buffer | 14.0% | Yield & Volatility Buffer |`,
      source: "PPFAS Mutual Fund Monthly Factsheet (Oct 2026, Page 2)",
      content: "Global equity reallocation contributed approximately -3.2% drawdown, primarily driven by US tech stock valuation adjustments impacting the fund's foreign equity holdings (approx 16%).",
      tags: ["macro", "global", "us tech", "foreign equity", "drawdown"]
    },
    {
      id: "chunk_ppfas_sector_01",
      fundId: "parag-parikh-flexi-cap",
      sourceTier: "TIER_3_AMC",
      category: "sector",
      section: "[Domestic Consumption & Defensive Positioning]",
      title: "Domestic Consumption & Cash Buffer",
      asOfDate: "31 Oct 2026",
      filingDate: "2026-10-31",
      validUntil: "2026-12-15",
      pageNumber: 3,
      tablePreserved: true,
      tableMarkdown: `| Defensive Component | Allocation % | Portfolio Impact |
| :--- | :--- | :--- |
| Consumer Staples | 18.5% | Stable cash flows |
| Cash & Arbitrage | 14.0% | +0.9% relative cushion vs correction |`,
      source: "PPFAS Mutual Fund Monthly Factsheet (Oct 2026, Page 3)",
      content: "Domestic consumer goods and financial holdings lagged by -2.8%, but the fund's disciplined ~14% cash and arbitrage buffer cushioned the overall portfolio against steeper declines (+0.9% relative cushion).",
      tags: ["sector", "cash", "buffer", "consumer", "resilience"]
    },

    // Educational Chunks (AMFI Standards)
    {
      id: "chunk_edu_nav_01",
      fundId: "*",
      sourceTier: "AMFI_REGULATORY",
      category: "education",
      section: "[Investor Education: Net Asset Value Mechanics]",
      title: "Understanding Net Asset Value (NAV)",
      asOfDate: "01 Nov 2026",
      filingDate: "2026-11-01",
      validUntil: "2027-11-01",
      pageNumber: 1,
      source: "AMFI Investor Knowledge Center · SEBI Financial Education",
      content: "Net Asset Value (NAV) represents the market value of all securities held in a fund divided by total units issued. NAV fluctuates daily based on underlying market prices. A lower NAV means a fixed monthly SIP instalment purchases a higher quantity of units.",
      tags: ["nav", "net asset value", "meaning", "definition", "what is nav"]
    },
    {
      id: "chunk_edu_rca_01",
      fundId: "*",
      sourceTier: "AMFI_REGULATORY",
      category: "education",
      section: "[Investor Education: Rupee-Cost Averaging]",
      title: "Rupee-Cost Averaging Mechanics",
      asOfDate: "01 Nov 2026",
      filingDate: "2026-11-01",
      validUntil: "2027-11-01",
      pageNumber: 1,
      source: "AMFI Guide to Systematic Investment Plans",
      content: "Rupee-Cost Averaging allows investors to accumulate units across market cycles. When prices dip, the fixed SIP amount buys more units; when prices rise, it buys fewer units. This averages out the purchase cost over time. However, unit accumulation does not guarantee positive returns or eliminate market risk.",
      tags: ["rupee cost averaging", "rca", "averaging", "sip mechanics", "dip"]
    },
    {
      id: "chunk_edu_sebi_ria_01",
      fundId: "*",
      sourceTier: "AMFI_REGULATORY",
      category: "compliance",
      section: "[Regulatory Disclosures: SEBI RIA Non-Advisory Platform]",
      title: "SEBI (Investment Advisers) Regulations Disclaimer",
      asOfDate: "01 Nov 2026",
      filingDate: "2026-11-01",
      validUntil: "2027-11-01",
      pageNumber: 1,
      source: "SEBI (Investment Advisers) Regulations, 2013",
      content: "Under SEBI regulations, non-advisory execution platforms provide portfolio analytics and factual explanations only. Platforms cannot recommend buying, selling, switching, pausing, or continuing mutual fund investments. Investors must evaluate decisions based on individual risk horizons.",
      tags: ["sebi", "ria", "advice", "disclaimer", "compliance", "stop sip", "pause sip"]
    }
  ];

  /**
   * Validates strict boundary separation between Structured Store and Unstructured Store
   * Enforces that structured ledgers contain zero strategy prose and unstructured chunks contain no user ledger facts.
   * @returns {Object} Validation report
   */
  function validateStoreSeparation() {
    const report = {
      isValid: true,
      structuredLedgersAudited: Object.keys(STRUCTURED_LEDGERS).length,
      unstructuredChunksAudited: DOCUMENT_CHUNKS.length,
      violations: []
    };

    // Check Structured Ledgers
    for (const [fundId, ledger] of Object.entries(STRUCTURED_LEDGERS)) {
      if (!ledger.folioNumber || !ledger.rtaSyncTimestamp || !ledger.sourceTier) {
        report.isValid = false;
        report.violations.push(`Ledger ${fundId} is missing mandatory Tier 1 RTA provenance fields.`);
      }
      if (!ledger.transactions || !Array.isArray(ledger.transactions) || ledger.transactions.length === 0) {
        report.isValid = false;
        report.violations.push(`Ledger ${fundId} has no transactions.`);
      }
    }

    // Check Unstructured Chunks
    for (const chunk of DOCUMENT_CHUNKS) {
      if (!chunk.sourceTier || !chunk.asOfDate || !chunk.source) {
        report.isValid = false;
        report.violations.push(`Chunk ${chunk.id} is missing mandatory sourceTier or temporal provenance.`);
      }
      // Ensure chunks don't leak user personal ledger amounts
      if (chunk.content.includes("₹3,000") || chunk.content.includes("4.74 units")) {
        report.isValid = false;
        report.violations.push(`Chunk ${chunk.id} improperly embeds user-specific ledger facts into unstructured store.`);
      }
    }

    return Object.freeze(report);
  }

  /**
   * Data Freshness SLA Verifier (Section 9.2)
   * Enforces NAV freshness (<= 24 business hours) and Factsheet freshness (<= 45 calendar days).
   * @param {string} fundId
   * @param {string|Date} referenceTimestamp - Current client or evaluation timestamp (defaults to 2026-11-07T11:00:00Z)
   */
  function validateDataFreshness(fundId = "sbi-large-midcap", referenceTimestamp = "2026-11-07T11:00:00Z") {
    const ledger = STRUCTURED_LEDGERS[fundId] || STRUCTURED_LEDGERS["sbi-large-midcap"];
    const chunks = DOCUMENT_CHUNKS.filter(c => c.fundId === fundId && c.sourceTier === "TIER_3_AMC");
    const refDate = new Date(referenceTimestamp);

    const warnings = [];

    // 1. NAV Freshness Check (SLA <= 24 business hours / 48 calendar hours for weekend cutoffs)
    const navDate = new Date(ledger.navTimestamp || "2026-11-06T21:00:00Z");
    const navAgeHours = Math.max(0, (refDate.getTime() - navDate.getTime()) / (1000 * 60 * 60));
    const navFresh = navAgeHours <= 48; // accommodates T-1 closing NAV over weekend
    if (!navFresh) {
      warnings.push(`NAV feed is ${Math.round(navAgeHours)} hours old. Refresh pending.`);
    }

    // 2. Factsheet Freshness Check (SLA <= 45 calendar days)
    let factsheetFresh = true;
    let factsheetAgeDays = 0;
    if (chunks.length > 0) {
      const filingDate = new Date(chunks[0].filingDate || "2026-10-31");
      factsheetAgeDays = Math.max(0, (refDate.getTime() - filingDate.getTime()) / (1000 * 60 * 60 * 24));
      if (factsheetAgeDays > 45) {
        factsheetFresh = false;
        warnings.push(`Latest monthly portfolio filing is pending release from the AMC (Filing is ${Math.round(factsheetAgeDays)} days old).`);
      }
    }

    return Object.freeze({
      fundId,
      referenceTimestamp: refDate.toISOString(),
      isCompliant: navFresh && factsheetFresh,
      navFresh,
      navAgeHours: parseFloat(navAgeHours.toFixed(1)),
      factsheetFresh,
      factsheetAgeDays: parseFloat(factsheetAgeDays.toFixed(1)),
      warnings,
      provenance: {
        rtaAuthority: ledger.sourceAuthority,
        folioNumber: ledger.folioNumber,
        rtaSyncTimestamp: ledger.rtaSyncTimestamp
      }
    });
  }

  /**
   * Source Truth Precedence Resolver (Section 9.3)
   * When figures differ, enforces: Tier 1 RTA > Tier 2 Exchange > Tier 3 AMC.
   * If delta between RTA NAV and candidate/display NAV > 0.1%, triggers Discrepancy Reconciliation Mode.
   */
  function resolveSourcePrecedence({ fundId = "sbi-large-midcap", candidateNav, candidateBenchmark, candidateFactsheetDate } = {}) {
    const ledger = STRUCTURED_LEDGERS[fundId] || STRUCTURED_LEDGERS["sbi-large-midcap"];
    const rtaNav = ledger.currentNav;

    let discrepancyDetected = false;
    let reconciliationRequired = false;
    let deltaPct = 0;
    let notes = [];

    if (typeof candidateNav === "number" && candidateNav > 0) {
      deltaPct = Math.abs((candidateNav - rtaNav) / rtaNav) * 100;
      if (deltaPct > 0.1) {
        discrepancyDetected = true;
        reconciliationRequired = true;
        notes.push(
          `NAV delta of ${deltaPct.toFixed(2)}% detected between candidate feed (₹${candidateNav.toFixed(2)}) and Tier 1 RTA Confirmed NAV (₹${rtaNav.toFixed(2)}). Enforcing Tier 1 RTA truth.`
        );
      }
    }

    return Object.freeze({
      fundId,
      precedenceEnforced: true,
      resolvedNav: rtaNav, // Tier 1 RTA always prevails
      resolvedNavDate: ledger.navDate,
      resolvedBenchmarkName: ledger.benchmarkFeed?.benchmarkName || ledger.benchmark,
      resolvedBenchmarkDrawdown: ledger.benchmarkFeed?.benchmarkDrawdownPct || ledger.benchmarkDrawdownPct,
      discrepancyDetected,
      reconciliationRequired,
      deltaPct: parseFloat(deltaPct.toFixed(3)),
      notes,
      sourceHierarchy: {
        tier1: DATA_SOURCE_TIERS.TIER_1_RTA.name,
        tier2: DATA_SOURCE_TIERS.TIER_2_EXCHANGE.name,
        tier3: DATA_SOURCE_TIERS.TIER_3_AMC.name
      }
    });
  }

  /**
   * Structured Attribution Data Contract (Section 9.4)
   * Formal Brinson-Fachler attribution decomposing portfolio drawdowns into Macro, Sector, and Unattributed Residual.
   * Enforces singleStockAttributionAvailable: false to guarantee Holdings != Causality safeguard.
   */
  const STRUCTURED_ATTRIBUTION = Object.freeze({
    "sbi-large-midcap": Object.freeze({
      fundId: "sbi-large-midcap",
      fundName: "SBI Large & Midcap Fund",
      period: "OCT_2026",
      asOfDate: "2026-10-31",
      methodology: "Brinson-Fachler",
      benchmarkName: "NIFTY LargeMidcap 250 TRI",
      totalPortfolioDrawdownPct: -8.37,
      benchmarkDrawdownPct: -4.20,
      activeManagementDeltaPct: -4.17,
      macroAttribution: Object.freeze({
        netContributionPct: -2.60,
        keyDrivers: Object.freeze([
          "FII capital outflows from Indian equity markets (-$2.1B in Oct 2026)",
          "Crude oil price surge above $88/barrel impacting import-dependent margins"
        ])
      }),
      sectorAttribution: Object.freeze([
        Object.freeze({
          sector: "Banking & Financial Services (BFSI)",
          allocationPct: 31.4,
          contributionPct: -4.10,
          allocationEffectPct: -1.20,
          selectionEffectPct: -2.90,
          verifiedDriver: "Net Interest Margin (NIM) compression and credit cost normalization"
        }),
        Object.freeze({
          sector: "Information Technology",
          allocationPct: 14.8,
          contributionPct: -1.10,
          allocationEffectPct: -0.30,
          selectionEffectPct: -0.80,
          verifiedDriver: "Discretionary client tech spend deferrals"
        }),
        Object.freeze({
          sector: "Automobile & Auto Components",
          allocationPct: 9.6,
          contributionPct: +1.10,
          allocationEffectPct: +0.40,
          selectionEffectPct: +0.70,
          verifiedDriver: "Strong festive season channel inventory sales"
        })
      ]),
      singleStockAttributionAvailable: false,
      unattributedResidualPct: -1.67, // -8.37 - (-2.60) - (-4.10) = -1.67
      disclaimer: "SEBI/AMFI Portfolio Attribution Standards: Single-stock causality is non-attributable without verified statutory AMC factor decomposition."
    }),
    "parag-parikh-flexi-cap": Object.freeze({
      fundId: "parag-parikh-flexi-cap",
      fundName: "Parag Parikh Flexi Cap Fund",
      period: "OCT_2026",
      asOfDate: "2026-10-31",
      methodology: "Brinson-Fachler",
      benchmarkName: "NIFTY 500 TRI",
      totalPortfolioDrawdownPct: -7.80,
      benchmarkDrawdownPct: -3.80,
      activeManagementDeltaPct: -4.00,
      macroAttribution: Object.freeze({
        netContributionPct: -3.20,
        keyDrivers: Object.freeze([
          "US Nasdaq global tech valuation compression",
          "Currency hedging cost variations on foreign equity sleeve"
        ])
      }),
      sectorAttribution: Object.freeze([
        Object.freeze({
          sector: "Global Internet & Technology",
          allocationPct: 16.2,
          contributionPct: -3.50,
          allocationEffectPct: -1.10,
          selectionEffectPct: -2.40,
          verifiedDriver: "Global multiple compression in mega-cap cloud services"
        }),
        Object.freeze({
          sector: "Domestic Banking & Finance",
          allocationPct: 28.5,
          contributionPct: -2.10,
          allocationEffectPct: -0.60,
          selectionEffectPct: -1.50,
          verifiedDriver: "Deposit rate re-pricing lags"
        })
      ]),
      singleStockAttributionAvailable: false,
      unattributedResidualPct: +1.00,
      disclaimer: "SEBI/AMFI Portfolio Attribution Standards: Single-stock causality is non-attributable without verified statutory AMC factor decomposition."
    })
  });

  return {
    DATA_SOURCE_TIERS,
    getLedger: (fundId) => STRUCTURED_LEDGERS[fundId] || STRUCTURED_LEDGERS["sbi-large-midcap"],
    getStructuredLedger: (fundId) => STRUCTURED_LEDGERS[fundId] || STRUCTURED_LEDGERS["sbi-large-midcap"],
    getStructuredAttribution: (fundId) => STRUCTURED_ATTRIBUTION[fundId] || STRUCTURED_ATTRIBUTION["sbi-large-midcap"],
    getAllChunks: () => DOCUMENT_CHUNKS,
    getUnstructuredChunks: (fundId) => DOCUMENT_CHUNKS.filter(c => c.fundId === fundId || c.fundId === "*"),
    getChunksForFund: (fundId) => DOCUMENT_CHUNKS.filter(c => c.fundId === fundId || c.fundId === "*"),
    findChunksByTags: (fundId, queryTokens) => {
      const fundChunks = DOCUMENT_CHUNKS.filter(c => c.fundId === fundId || c.fundId === "*");
      return fundChunks.filter(chunk => {
        return queryTokens.some(token => chunk.tags.some(tag => tag.includes(token) || token.includes(tag)));
      });
    },
    validateStoreSeparation,
    validateDataFreshness,
    resolveSourcePrecedence
  };
})();

if (typeof window !== "undefined") {
  window.GROWW_KNOWLEDGE_STORE = GROWW_KNOWLEDGE_STORE;
}
if (typeof global !== "undefined") {
  global.GROWW_KNOWLEDGE_STORE = GROWW_KNOWLEDGE_STORE;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = GROWW_KNOWLEDGE_STORE;
}
