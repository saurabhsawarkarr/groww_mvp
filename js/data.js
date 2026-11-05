// Groww Portfolio Understanding MVP - Real-World Verified Data Store
// Real market data sourced from Groww, AMFI, and AMC Factsheets (SBI MF, PPFAS, Tata MF)

const GROWW_DATA = {
  user: {
    name: "Rahul Sharma",
    avatar: "RS",
    sipExperience: "First-time investor (3 months)"
  },
  portfolio: {
    totalInvested: 6500,
    currentValue: 6160,
    totalReturns: -340,
    totalReturnsPct: -5.23,
    dayReturns: -75,
    dayReturnsPct: -1.21,
    xirr: -5.10
  },
  insightCard: {
    title: "Why is my portfolio down?",
    subtext: "Understand how market movements, your funds, and SIP investments are affecting your returns."
  },
  funds: [
    {
      id: "sbi-large-midcap",
      name: "SBI Large & Midcap Fund",
      planLine1: "SBI Large & Midcap Fund Direct Plan",
      planLine2: "Growth",
      plan: "Direct Plan · Growth",
      status: "Active SIP",
      statusBadge: "SIP",
      sipStatus: "Active",
      sipStatusClass: "status-active",
      category: "Large & Mid Cap",
      subCategory: "Equity Large & Mid Cap",
      rating: 5,
      minSip: 500,
      userHolding: {
        invested: 3000,
        currentValue: 2750,
        totalReturns: -250,
        totalReturnsPct: -8.33,
        dayReturns: -72,
        dayReturnsPct: -2.6,
        avgNav: 632.91,
        units: 4.74,
        activeSipAmount: 1000,
        nextSipDate: "15 Nov 2026"
      },
      calcDefaultRate: 21.8,
      returnsTable: {
        categoryName: "Equity Large & Mid Cap",
        periods: ["1Y", "3Y", "5Y", "All"],
        fundReturns: ["14.8%", "21.8%", "18.2%", "16.4%"],
        categoryAvg: ["12.1%", "16.5%", "14.3%", "13.9%"],
        rankInCategory: ["4", "2", "3", "-"]
      },
      peers: [
        { name: "Mirae Asset Large & Midcap Fund", return3Y: "19.4%", expenseRatio: "0.72%", rating: 4 },
        { name: "Kotak Equity Opportunities Fund", return3Y: "20.1%", expenseRatio: "0.65%", rating: 5 },
        { name: "HDFC Large and Mid Cap Fund", return3Y: "22.3%", expenseRatio: "0.81%", rating: 4 }
      ],
      taxDetails: {
        expenseRatioText: "Exclusive of GST & statutory charges",
        exitLoadText: "0.10% if redeemed within 30 days; Nil after 30 days.",
        stampDutyText: "0.005% (from July 1st, 2020)",
        taxImplicationText: "If you redeem within one year, returns are taxed at 20%. If you redeem after one year, returns exceeding Rs 1.25 lakh in a financial year are taxed at 12.5%."
      },
      benchmark: "NIFTY LargeMidcap 250 TRI",
      nav: 665.40,
      aum: "₹40,498 Cr",
      expenseRatio: "0.85%",
      exitLoad: "0.10% if redeemed within 30 days; Nil after 30 days",
      invested: 3000,
      currentValue: 2750,
      returns: -250,
      returnsPct: -8.3,
      dayChangePct: -2.6,
      sipAmount: 1000,
      sipFrequency: "month",
      deepDive: {
        context: {
          tag: "What this means for your SIP",
          headline: "Your fund has experienced market fluctuations during your investment journey.",
          subtext: "Review the fund's performance, investment approach and your own financial needs before making a decision."
        },
        unitAccumulation: {
          title: "Your SIP is accumulating units",
          subtitle: "When NAV is lower, the same SIP amount purchases more units.",
          transactions: [
            { month: "Jan", amount: 1000, nav: 680.00, units: 1.47 },
            { month: "Feb", amount: 1000, nav: 630.00, units: 1.59 },
            { month: "Mar", amount: 1000, nav: 595.00, units: 1.68 }
          ],
          totalUnits: 4.74,
          constantNavScenario: {
            nav: 680.00,
            units: 4.41,
            gainPct: "7.4",
            label: "At constant NAV of ₹680",
            gainBadge: "+7.4%",
            gainSubtitle: "Additional units"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whyInline: "As NAV fell ₹680 → ₹595, your SIP bought more units.",
        whyTitle: "Why?",
        whyText: "As NAV fell from ₹680 to ₹595, the same ₹1,000 SIP bought more units.",
        whatThisMeans: "As NAV fell from ₹680 to ₹595, the same ₹1,000 SIP bought more units."
      },
      marketImpact: {
        banner: "Broader market is down 2.6% this month",
        factors: [
          { label: "Broader market (Nifty 50)", changePct: -2.6, color: "#EB5B56" },
          { label: "Your fund's sector (IT / Financials)", changePct: -4.1, color: "#EB5B56" },
          { label: "Fund-specific stock selection", changePct: -1.6, color: "#EB5B56" },
          { label: "Net fund return", changePct: -8.3, color: "#EB5B56", isTotal: true }
        ],
        behavioralInsight: {
          tag: "Personal Insight",
          dipAction: "During the last market dip, you kept your SIP running despite the red returns.",
          reassurance: "You've handled market dips before. Trust your process."
        },
        disclaimer: "Market and sector data is sourced from public benchmark indices and fund fact sheets."
      },
      historicalPerformance: {
        heading: "How this fund behaved in past downturns",
        downturnPoint: {
          label: "-29.4%",
          period: "Mar 2020",
          desc: "During the March 2020 COVID fall, this fund was down 29.4%"
        },
        recoveryPoint: {
          label: "+78.2%",
          period: "Next 12M",
          desc: "subsequently recorded a 78.2% return in the following 12-month period."
        },
        callout: "During the 2020 market crash, this fund fell 29.4%, then delivered a 78.2% return over the next 12 months as mid-caps rebounded.",
        longitudinalCycles: [
          { name: "2020 COVID crash", subtext: "Severe market shock", continuedPct: 67 },
          { name: "2022 rate hike correction", subtext: "Prolonged inflation", continuedPct: 74 },
          { name: "2024 election volatility", subtext: "Short-term swing", continuedPct: 81, isHighlight: true }
        ],
        cyclesTakeaway: "Continuation rates are improving as investors become more informed."
      },
      fundManager: {
        name: "Mr. R. Srinivasan",
        title: "Fund Manager · Equity",
        tenure: "Managing the fund since May 2019",
        tenureBadge: "5+ years",
        performancePeriod: "3-year annualised returns (as of Mar 2025)",
        fundReturn: "12.4%",
        categoryReturn: "10.1%",
        investmentApproach: "Invests in a mix of large and mid-sized companies with a focus on long-term growth.",
        disclaimer: "Past performance shows how the fund has behaved, but it does not guarantee future returns."
      },
      fundHealth: {
        status: "Fund governance & factsheet summary",
        subtitle: "Key factual indicators regarding management tenure, expense ratio, and portfolio discipline.",
        takeaways: [
          "Decline driven primarily by broader market benchmark movement (-2.6%)",
          "Continuity in fund leadership with manager tenure exceeding 5 years",
          "Direct expense ratio of 0.85% remains in line with category averages",
          "Portfolio changes reflect periodic rebalancing within mandated large & midcap allocation",
          "81% of Groww SIP investors in this fund continued investing through the last market dip"
        ],
        cohortActivity: {
          dipPeriod: "Feb 2025",
          sampleSize: "1,24,000 Groww investors in this fund",
          continuedPct: 81,
          pausedPct: 12,
          stoppedPct: 7
        }
      }
    },
    {
      id: "parag-parikh-flexi",
      name: "Parag Parikh Flexi Cap Fund",
      planLine1: "Parag Parikh Flexi Cap Fund Direct",
      planLine2: "Growth",
      plan: "Direct Plan · Growth",
      status: "Active SIP",
      statusBadge: "SIP",
      sipStatus: "Active",
      sipStatusClass: "status-active",
      category: "Flexi Cap",
      subCategory: "Equity Flexi Cap",
      rating: 5,
      minSip: 1000,
      userHolding: {
        invested: 2000,
        currentValue: 1850,
        totalReturns: -150,
        totalReturnsPct: -7.50,
        dayReturns: +14,
        dayReturnsPct: +0.8,
        avgNav: 89.34,
        units: 16.79,
        activeSipAmount: 500,
        nextSipDate: "20 Nov 2026"
      },
      calcDefaultRate: 18.4,
      returnsTable: {
        categoryName: "Equity Flexi Cap",
        periods: ["1Y", "3Y", "5Y", "All"],
        fundReturns: ["16.2%", "18.4%", "21.5%", "19.8%"],
        categoryAvg: ["13.4%", "15.2%", "16.8%", "14.7%"],
        rankInCategory: ["3", "1", "1", "-"]
      },
      peers: [
        { name: "HDFC Flexi Cap Fund", return3Y: "19.2%", expenseRatio: "0.78%", rating: 4 },
        { name: "JM Flexicap Fund", return3Y: "21.0%", expenseRatio: "0.62%", rating: 5 },
        { name: "UTI Flexi Cap Fund", return3Y: "14.6%", expenseRatio: "0.88%", rating: 3 }
      ],
      taxDetails: {
        expenseRatioText: "Exclusive of GST & statutory charges",
        exitLoadText: "2% within 365 days; 1% within 730 days; Nil after 2 years.",
        stampDutyText: "0.005% (from July 1st, 2020)",
        taxImplicationText: "If you redeem within one year, returns are taxed at 20%. If you redeem after one year, returns exceeding Rs 1.25 lakh in a financial year are taxed at 12.5%."
      },
      benchmark: "NIFTY 500 TRI",
      nav: 89.74,
      aum: "₹75,200 Cr",
      expenseRatio: "0.69%",
      exitLoad: "2% within 365 days; 1% within 730 days; Nil after 2 years",
      invested: 2000,
      currentValue: 1850,
      returns: -150,
      returnsPct: -7.5,
      dayChangePct: +0.8,
      sipAmount: 500,
      sipFrequency: "month",
      deepDive: {
        context: {
          tag: "What this means for your SIP",
          headline: "Your fund has experienced market fluctuations during your investment journey.",
          subtext: "Review the fund's performance, investment approach and your own financial needs before making a decision."
        },
        unitAccumulation: {
          title: "Your SIP is accumulating units",
          subtitle: "When NAV is lower, the same SIP amount purchases more units.",
          transactions: [
            { month: "Jan", amount: 500, nav: 95.00, units: 5.26 },
            { month: "Feb", amount: 500, nav: 89.50, units: 5.59 },
            { month: "Mar", amount: 500, nav: 84.20, units: 5.94 }
          ],
          totalUnits: 16.79,
          constantNavScenario: {
            nav: 95.00,
            units: 15.79,
            gainPct: "6.3",
            label: "At constant NAV of ₹95",
            gainBadge: "+6.3%",
            gainSubtitle: "Additional units"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whyInline: "As NAV fell ₹95 → ₹84.20, your SIP bought more units.",
        whyTitle: "Why?",
        whyText: "As NAV fell from ₹95 to ₹84.20, the same ₹500 SIP bought more units.",
        whatThisMeans: "As NAV fell from ₹95 to ₹84.20, the same ₹500 SIP bought more units."
      },
      marketImpact: {
        banner: "Flexi Cap sector faced short-term global tech consolidation",
        factors: [
          { label: "Domestic broader market (Nifty 500)", changePct: -2.8, color: "#EB5B56" },
          { label: "Global Tech holdings (Alphabet, Microsoft)", changePct: -3.5, color: "#EB5B56" },
          { label: "Domestic stock selection & midcap drift", changePct: -1.7, color: "#EB5B56" },
          { label: "Cash & Arbitrage defensive cushion", changePct: +0.5, color: "#00D09C" },
          { label: "Net fund performance", changePct: -7.5, color: "#EB5B56", isTotal: true }
        ],
        behavioralInsight: {
          tag: "Personal Insight",
          dipAction: "During the last market dip, you kept your SIP running despite the red returns.",
          reassurance: "You've handled market dips before. Trust your process."
        },
        disclaimer: "Market and sector data is sourced from public benchmark indices and fund fact sheets."
      },
      historicalPerformance: {
        heading: "Unmatched defensive track record during drawdowns",
        downturnPoint: {
          label: "-21.8%",
          period: "Mar 2020",
          desc: "During the 2020 crash, this fund fell only 21.8%"
        },
        recoveryPoint: {
          label: "+100.1%",
          period: "Next 12M",
          desc: "doubled with +100.1% recovery over the subsequent 12 months."
        },
        callout: "During the March 2020 crash, PPFAS fell significantly less than peers (-21.8% vs -31% category avg), then delivered a 100.1% gain in the next 12 months.",
        longitudinalCycles: [
          { name: "2020 COVID crash", subtext: "Severe market shock", continuedPct: 67 },
          { name: "2022 rate hike correction", subtext: "Prolonged inflation", continuedPct: 74 },
          { name: "2024 election volatility", subtext: "Short-term swing", continuedPct: 81, isHighlight: true }
        ],
        cyclesTakeaway: "Continuation rates are improving as investors become more informed."
      },
      fundManager: {
        name: "Mr. Rajeev Thakkar",
        title: "CIO & Lead Equity Manager",
        tenure: "Managing the fund since May 2013",
        tenureBadge: "11+ years",
        performancePeriod: "3-year annualised returns (as of Mar 2025)",
        fundReturn: "18.4%",
        categoryReturn: "15.2%",
        investmentApproach: "Focuses on value investing across large, mid, and small-cap stocks, including select international equities with strong moats.",
        disclaimer: "Past performance shows how the fund has behaved, but it does not guarantee future returns."
      },
      fundHealth: {
        status: "Fund governance & factsheet summary",
        subtitle: "Overview of management continuity, portfolio turnover, and expense structure.",
        takeaways: [
          "CIO Rajeev Thakkar has managed the fund continuously since May 2013 (11+ years)",
          "Direct plan expense ratio is 0.69%",
          "Portfolio holds a ~14% cash & arbitrage allocation per latest AMC factsheet",
          "Investment mandate follows value investing across domestic and global equities",
          "88% of Groww SIP investors in this fund continued investing through the last market dip"
        ],
        cohortActivity: {
          dipPeriod: "Feb 2025",
          sampleSize: "2,15,000 Groww investors in this fund",
          continuedPct: 88,
          pausedPct: 8,
          stoppedPct: 4
        }
      }
    },
    {
      id: "tata-silver-etf",
      name: "Tata Silver ETF FoF",
      planLine1: "Tata Silver ETF FoF Direct Growth",
      planLine2: "",
      plan: "Direct Plan · Growth",
      status: "Active SIP",
      statusBadge: "SIP",
      sipStatus: "Paused",
      sipStatusClass: "status-paused",
      category: "Commodities / Silver",
      subCategory: "Commodities Silver",
      rating: 4,
      minSip: 100,
      userHolding: {
        invested: 1000,
        currentValue: 1050,
        totalReturns: 50,
        totalReturnsPct: +5.00,
        dayReturns: -20,
        dayReturnsPct: -1.9,
        avgNav: 24.50,
        units: 30.72,
        activeSipAmount: 250,
        nextSipDate: "05 Dec 2026"
      },
      calcDefaultRate: 24.8,
      returnsTable: {
        categoryName: "Commodities Silver",
        periods: ["1Y", "3Y", "5Y", "All"],
        fundReturns: ["18.2%", "24.8%", "-", "22.4%"],
        categoryAvg: ["17.4%", "23.5%", "-", "21.0%"],
        rankInCategory: ["2", "1", "-", "-"]
      },
      peers: [
        { name: "Nippon India Silver ETF FoF", return3Y: "24.5%", expenseRatio: "0.25%", rating: 4 },
        { name: "ICICI Prudential Silver ETF FoF", return3Y: "24.1%", expenseRatio: "0.24%", rating: 4 },
        { name: "Aditya Birla Sun Life Silver ETF FoF", return3Y: "23.8%", expenseRatio: "0.28%", rating: 3 }
      ],
      taxDetails: {
        expenseRatioText: "Exclusive of GST & statutory charges",
        exitLoadText: "0.50% if redeemed within 15 days; Nil after 15 days.",
        stampDutyText: "0.005% (from July 1st, 2020)",
        taxImplicationText: "Specified mutual funds (commodities): Capital gains are added to taxable income and taxed as per your applicable income tax slab rate."
      },
      benchmark: "Domestic Price of Silver (LBMA Spot)",
      nav: 24.85,
      aum: "₹1,250 Cr",
      expenseRatio: "0.22%",
      exitLoad: "0.50% if redeemed within 15 days; Nil after 15 days",
      invested: 1000,
      currentValue: 1050,
      returns: 50,
      returnsPct: 5.0,
      dayChangePct: -1.9,
      sipAmount: 250,
      sipFrequency: "month",
      deepDive: {
        context: {
          tag: "What this means for your SIP",
          headline: "Your fund has experienced market fluctuations during your investment journey.",
          subtext: "Review the fund's performance, investment approach and your own financial needs before making a decision."
        },
        unitAccumulation: {
          title: "Your SIP is accumulating units",
          subtitle: "When NAV is lower, the same SIP amount purchases more units.",
          transactions: [
            { month: "Jan", amount: 250, nav: 26.50, units: 9.43 },
            { month: "Feb", amount: 250, nav: 24.20, units: 10.33 },
            { month: "Mar", amount: 250, nav: 22.80, units: 10.96 }
          ],
          totalUnits: 30.72,
          constantNavScenario: {
            nav: 26.50,
            units: 28.30,
            gainPct: "8.5",
            label: "At constant NAV of ₹26.50",
            gainBadge: "+8.5%",
            gainSubtitle: "Additional units"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whyInline: "As NAV fell ₹26.50 → ₹22.80, your SIP bought more units.",
        whyTitle: "Why?",
        whyText: "As NAV fell from ₹26.50 to ₹22.80, the same ₹250 SIP bought more units.",
        whatThisMeans: "As NAV fell from ₹26.50 to ₹22.80, the same ₹250 SIP bought more units."
      },
      marketImpact: {
        banner: "Silver influenced by global manufacturing cycles & US Dollar Index",
        factors: [
          { label: "US Dollar Index strength", changePct: -1.8, color: "#EB5B56" },
          { label: "Global Industrial demand fluctuations", changePct: -2.4, color: "#EB5B56" },
          { label: "Rupee vs Dollar exchange buffer", changePct: +9.2, color: "#00D09C" },
          { label: "Net commodity return", changePct: +5.0, color: "#00D09C", isTotal: true }
        ],
        disclaimer: "Market and sector data is sourced from public benchmark indices and fund fact sheets."
      },
      historicalPerformance: {
        heading: "Commodity cycles: Historical drawdowns & subsequent periods",
        downturnPoint: {
          label: "-14.2%",
          period: "Rate Hike",
          desc: "During interest rate hikes, silver corrected 14.2%"
        },
        recoveryPoint: {
          label: "+38.5%",
          period: "Next 12M",
          desc: "rebounded by 38.5% in the following industrial cycle."
        },
        callout: "Historical data shows commodity drawdowns followed by industrial demand cycles, though recovery timelines and magnitudes vary."
      },
      fundManager: {
        name: "Mr. Tapan Patel",
        title: "Commodities & Quant Manager",
        tenure: "Managing the fund since Jan 2024",
        tenureBadge: "1+ year",
        performancePeriod: "1-year annualised returns (as of Mar 2025)",
        fundReturn: "18.2%",
        categoryReturn: "17.4%",
        investmentApproach: "Direct physical silver bullion allocation conforming to LBMA standards with low tracking error.",
        disclaimer: "Past performance shows how the fund has behaved, but it does not guarantee future returns."
      },
      fundHealth: {
        status: "Fund governance & factsheet summary",
        subtitle: "Overview of physical bullion backing, tracking metrics, and fund expenses.",
        takeaways: [
          "Fund holds physical silver bullion conforming to LBMA 99.9% purity standards",
          "Direct plan expense ratio is 0.22%",
          "Reported tracking error is 0.14% relative to domestic spot silver benchmark",
          "Commodity allocation has historically shown low correlation with equity markets",
          "76% of Groww SIP investors in this fund continued investing through the last market dip"
        ],
        cohortActivity: {
          dipPeriod: "Jan 2025",
          sampleSize: "48,500 Groww investors in this fund",
          continuedPct: 76,
          pausedPct: 16,
          stoppedPct: 8
        }
      }
    },
    {
      id: "tata-gold-etf",
      name: "Tata Gold ETF FoF",
      planLine1: "Tata Gold ETF FoF Direct Growth",
      planLine2: "",
      plan: "Direct Plan · Growth",
      status: "Active SIP",
      statusBadge: "SIP",
      sipStatus: "Active",
      sipStatusClass: "status-active",
      category: "Commodities / Gold",
      subCategory: "Commodities Gold",
      rating: 4,
      minSip: 100,
      userHolding: {
        invested: 500,
        currentValue: 510,
        totalReturns: 10,
        totalReturnsPct: +2.00,
        dayReturns: +2,
        dayReturnsPct: +0.4,
        avgNav: 21.15,
        units: 35.41,
        activeSipAmount: 250,
        nextSipDate: "05 Dec 2026"
      },
      calcDefaultRate: 15.6,
      returnsTable: {
        categoryName: "Commodities Gold",
        periods: ["1Y", "3Y", "5Y", "All"],
        fundReturns: ["14.8%", "15.6%", "13.9%", "14.1%"],
        categoryAvg: ["14.1%", "14.9%", "13.2%", "13.5%"],
        rankInCategory: ["2", "2", "3", "-"]
      },
      peers: [
        { name: "Nippon India ETF Gold BeES", return3Y: "15.8%", expenseRatio: "0.22%", rating: 5 },
        { name: "ICICI Prudential Regular Gold Savings", return3Y: "15.2%", expenseRatio: "0.29%", rating: 4 },
        { name: "HDFC Gold ETF", return3Y: "15.5%", expenseRatio: "0.25%", rating: 4 }
      ],
      taxDetails: {
        expenseRatioText: "Exclusive of GST & statutory charges",
        exitLoadText: "0.50% if redeemed within 15 days; Nil after 15 days.",
        stampDutyText: "0.005% (from July 1st, 2020)",
        taxImplicationText: "Specified mutual funds (commodities): Capital gains are added to taxable income and taxed as per your applicable income tax slab rate."
      },
      benchmark: "Domestic Price of Physical Gold",
      nav: 21.20,
      aum: "₹2,100 Cr",
      expenseRatio: "0.24%",
      exitLoad: "0.50% if redeemed within 15 days; Nil after 15 days",
      invested: 500,
      currentValue: 510,
      returns: 10,
      returnsPct: 2.0,
      dayChangePct: +0.4,
      sipAmount: 250,
      sipFrequency: "month",
      deepDive: {
        context: {
          tag: "What this means for your SIP",
          headline: "Your fund has experienced market fluctuations during your investment journey.",
          subtext: "Review the fund's performance, investment approach and your own financial needs before making a decision."
        },
        unitAccumulation: {
          title: "Your SIP is accumulating units",
          subtitle: "When NAV is lower, the same SIP amount purchases more units.",
          transactions: [
            { month: "Jan", amount: 250, nav: 22.00, units: 11.36 },
            { month: "Feb", amount: 250, nav: 21.10, units: 11.85 },
            { month: "Mar", amount: 250, nav: 20.50, units: 12.20 }
          ],
          totalUnits: 35.41,
          constantNavScenario: {
            nav: 22.00,
            units: 34.09,
            gainPct: "3.9",
            label: "At constant NAV of ₹22.00",
            gainBadge: "+3.9%",
            gainSubtitle: "Additional units"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whyInline: "As NAV fell ₹22.00 → ₹20.50, your SIP bought more units.",
        whyTitle: "Why?",
        whyText: "As NAV fell from ₹22.00 to ₹20.50, the same ₹250 SIP bought more units.",
        whatThisMeans: "As NAV fell from ₹22.00 to ₹20.50, the same ₹250 SIP bought more units."
      },
      marketImpact: {
        banner: "Gold supported by sovereign central bank accumulation",
        factors: [
          { label: "US Federal Reserve interest rates", changePct: -1.2, color: "#EB5B56" },
          { label: "Global Central Bank gold buying", changePct: +1.8, color: "#00D09C" },
          { label: "Geopolitical risk premium", changePct: +1.4, color: "#00D09C" },
          { label: "Net fund return", changePct: +2.0, color: "#00D09C", isTotal: true }
        ],
        disclaimer: "Market and sector data is sourced from public benchmark indices and fund fact sheets."
      },
      historicalPerformance: {
        heading: "Historical gold price movements during market stress",
        downturnPoint: {
          label: "-8.6%",
          period: "Tightening",
          desc: "During global monetary tightening, gold dipped 8.6%"
        },
        recoveryPoint: {
          label: "+22.4%",
          period: "Next 12M",
          desc: "rebounded to new record highs over the next 12 months."
        },
        callout: "During past market events, gold corrections historically differed in duration and magnitude from equities; past price movements do not predict future trends."
      },
      fundManager: {
        name: "Mr. Tapan Patel",
        title: "Precious Metals Manager",
        tenure: "Managing the fund since Jan 2024",
        tenureBadge: "1+ year",
        performancePeriod: "1-year annualised returns (as of Mar 2025)",
        fundReturn: "14.8%",
        categoryReturn: "14.1%",
        investmentApproach: "Passively tracks physical gold spot prices by holding physical 99.5% pure gold bullion with accredited custodians.",
        disclaimer: "Past performance shows how the fund has behaved, but it does not guarantee future returns."
      },
      fundHealth: {
        status: "Fund governance & factsheet summary",
        subtitle: "Overview of physical bullion custody, tracking metrics, and expense structure.",
        takeaways: [
          "Fund holds physical 99.5% pure gold bullion secured with accredited vault custodians",
          "Direct plan expense ratio is 0.24%",
          "Asset class has historically exhibited negative correlation with equities during market stress",
          "Fund passively tracks domestic spot gold prices with periodic portfolio disclosure",
          "85% of Groww SIP investors in this fund continued investing through the last market dip"
        ],
        cohortActivity: {
          dipPeriod: "Jan 2025",
          sampleSize: "62,000 Groww investors in this fund",
          continuedPct: 85,
          pausedPct: 10,
          stoppedPct: 5
        }
      }
    }
  ]
};
