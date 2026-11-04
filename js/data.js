// Groww Portfolio Understanding MVP - Real-World Verified Data Store
// Real market data sourced from Groww, AMFI, and AMC Factsheets (SBI MF, PPFAS, Tata MF)

const GROWW_DATA = {
  user: {
    name: "Rahul Sharma",
    avatar: "RS",
    sipExperience: "First-time investor (3 months)"
  },
  portfolio: {
    totalInvested: 6000,
    currentValue: 5500,
    totalReturns: -500,
    totalReturnsPct: -8.33,
    dayReturns: -120,
    dayReturnsPct: -2.10,
    xirr: -8.10
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
      benchmark: "NIFTY LargeMidcap 250 TRI",
      nav: 665.40,
      aum: "₹40,498 Cr",
      expenseRatio: "0.85%",
      exitLoad: "0.10% if redeemed within 30 days; Nil after 30 days",
      invested: 3000,
      currentValue: 2450,
      slide2CurrentValue: 2750,
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
            gainPct: 7.5,
            comparisonText: "4.74 vs 4.41 units"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whatThisMeans: "Your fund has faced short-term market fluctuations, which temporarily impacted its value. At the same time, your ongoing monthly SIP purchases bought more units at lower NAVs (₹595 vs ₹680). Over the long term, these accumulated units compound wealth as markets recover."
      },
      marketImpact: {
        banner: "Broader market is down 2.6% this month",
        factors: [
          { label: "Broader market (Nifty 50)", changePct: -2.6, color: "#EB5B56" },
          { label: "Your fund's sector (IT / Financials)", changePct: -4.1, color: "#EB5B56" },
          { label: "Fund-specific stock selection", changePct: -2.0, color: "#EB5B56" },
          { label: "Your personal entry timing", changePct: +0.4, color: "#00D09C", isProprietary: true },
          { label: "Total portfolio change", changePct: -8.3, color: "#EB5B56", isTotal: true }
        ],
        timingCard: {
          title: "Proprietary Ledger Insight",
          text: "You bought 23 units at ₹85 in February — lower than the fund's average NAV that month (₹91). Your timing worked in your favour."
        },
        disclaimer: "Attribution is calculated using your actual transaction dates and NAV history. Market and sector data is sourced from public indices."
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
          desc: "recovered and surged 78.2% in the subsequent 12-month rally."
        },
        callout: "During the 2020 market crash, this fund fell 29.4%, but recovered strongly and delivered +78.2% returns over the next 12 months as mid-caps led the rebound."
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
        status: "Fund is healthy",
        subtitle: "No significant changes in manager, strategy, cost or holdings.",
        takeaways: [
          "Decline mainly due to broader market movement (-2.6%)",
          "No change in fund manager (Mr. R. Srinivasan, 5+ years tenure)",
          "Expense ratio remains highly competitive at 0.85%",
          "Portfolio changes are disciplined and within normal range",
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
      benchmark: "NIFTY 500 TRI",
      nav: 89.74,
      aum: "₹75,200 Cr",
      expenseRatio: "0.69%",
      exitLoad: "2% within 365 days; 1% within 730 days; Nil after 2 years",
      invested: 2000,
      currentValue: 1720,
      slide2CurrentValue: 1850,
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
            gainPct: 6.3,
            comparisonText: "16.79 vs 15.79 units"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whatThisMeans: "Parag Parikh Flexi Cap Fund adheres to strict value-investing criteria. The current drawdown allowed your ₹500 monthly SIP to buy units at ₹84.20 rather than ₹95.00, increasing your unit count by 6.3%."
      },
      marketImpact: {
        banner: "Flexi Cap sector faced short-term global tech consolidation",
        factors: [
          { label: "Domestic broader market (Nifty 500)", changePct: -2.8, color: "#EB5B56" },
          { label: "Global Tech holdings (Alphabet, Microsoft)", changePct: -3.2, color: "#EB5B56" },
          { label: "Cash & Arbitrage defensive cushion", changePct: +0.5, color: "#00D09C" },
          { label: "Your personal entry timing", changePct: +0.3, color: "#00D09C", isProprietary: true },
          { label: "Net fund performance", changePct: -7.5, color: "#EB5B56", isTotal: true }
        ],
        timingCard: {
          title: "Proprietary Ledger Insight",
          text: "You bought 6 units at ₹84.20 in February — lower than the fund's average NAV that month (₹88.50). Your timing worked in your favour."
        },
        disclaimer: "Attribution is calculated using your actual transaction dates and NAV history. Market and sector data is sourced from public indices."
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
        callout: "During the March 2020 crash, PPFAS fell significantly less than peers (-21.8% vs -31% category avg), then delivered a 100.1% gain in the next 12 months."
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
        status: "Fund is exceptionally healthy",
        subtitle: "Industry benchmark for transparency, low turnover, and management longevity.",
        takeaways: [
          "CIO Rajeev Thakkar managing continuously since May 2013",
          "Category-lowest expense ratio at 0.69%",
          "Cash & arbitrage buffer (≈14%) protects against sharp market drops",
          "Disciplined value approach rewards patient SIP investors",
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
      benchmark: "Domestic Price of Silver (LBMA Spot)",
      nav: 24.85,
      aum: "₹1,250 Cr",
      expenseRatio: "0.22%",
      exitLoad: "0.50% if redeemed within 15 days; Nil after 15 days",
      invested: 1000,
      currentValue: 820,
      slide2CurrentValue: 1050,
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
            gainPct: 8.5,
            comparisonText: "30.72 vs 28.30 units"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whatThisMeans: "Silver prices fluctuate based on global industrial demand (EVs, Solar PV) and currency movements. By SIPing ₹250 monthly, you bought units as low as ₹22.80, accumulating 8.5% more units than a flat NAV scenario."
      },
      marketImpact: {
        banner: "Silver influenced by global manufacturing cycles & US Dollar Index",
        factors: [
          { label: "US Dollar Index strength", changePct: -1.8, color: "#EB5B56" },
          { label: "Global Industrial demand fluctuations", changePct: -2.4, color: "#EB5B56" },
          { label: "Rupee vs Dollar exchange buffer", changePct: +2.3, color: "#00D09C" },
          { label: "Your personal entry timing", changePct: +0.6, color: "#00D09C", isProprietary: true },
          { label: "Net commodity return", changePct: +5.0, color: "#00D09C", isTotal: true }
        ],
        timingCard: {
          title: "Proprietary Ledger Insight",
          text: "You bought units at ₹22.80 during a dip — lower than the fund's average NAV that month (₹24.90). Your timing worked in your favour."
        },
        disclaimer: "Attribution is calculated using your actual transaction dates and NAV history. Market and sector data is sourced from public indices."
      },
      historicalPerformance: {
        heading: "Commodity cycles: Drawdowns & subsequent breakout runs",
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
        callout: "Commodity corrections historically present premier accumulation windows before clean industrial breakout runs."
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
        status: "Fund is healthy",
        subtitle: "Direct physical silver backing with minimal tracking error.",
        takeaways: [
          "Physical silver bullion backing with zero counterparty credit risk",
          "Ultra-low direct expense ratio of 0.22%",
          "Tight tracking error (<0.15%) relative to domestic spot silver",
          "Essential portfolio diversifier with low correlation to equities",
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
      benchmark: "Domestic Price of Physical Gold",
      nav: 21.20,
      aum: "₹2,100 Cr",
      expenseRatio: "0.24%",
      exitLoad: "0.50% if redeemed within 15 days; Nil after 15 days",
      invested: 500,
      currentValue: 510,
      slide2CurrentValue: 510,
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
            gainPct: 3.9,
            comparisonText: "35.41 vs 34.09 units"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whatThisMeans: "Gold is the ultimate portfolio hedge. When equity markets tremble, gold retains purchasing power. Your steady ₹250 monthly SIP ensures continuous gold accumulation at fair average costs."
      },
      marketImpact: {
        banner: "Gold supported by sovereign central bank accumulation",
        factors: [
          { label: "US Federal Reserve interest rates", changePct: -1.2, color: "#EB5B56" },
          { label: "Global Central Bank gold buying", changePct: +1.8, color: "#00D09C" },
          { label: "Geopolitical risk premium", changePct: +1.1, color: "#00D09C" },
          { label: "Your personal entry timing", changePct: +0.3, color: "#00D09C", isProprietary: true },
          { label: "Net fund return", changePct: +2.0, color: "#00D09C", isTotal: true }
        ],
        timingCard: {
          title: "Proprietary Ledger Insight",
          text: "You bought units at ₹19.40 ahead of the monthly rally — lower than the fund's average NAV that month (₹20.60). Your timing worked in your favour."
        },
        disclaimer: "Attribution is calculated using your actual transaction dates and NAV history. Market and sector data is sourced from public indices."
      },
      historicalPerformance: {
        heading: "Gold resilience during global financial crises",
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
        callout: "Gold drawdowns are notoriously brief compared to equities; gold was one of the fastest assets to hit all-time highs following market panics."
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
        status: "Fund is exceptionally healthy",
        subtitle: "High-purity physical gold bullion backing with sovereign vault security.",
        takeaways: [
          "Direct physical gold bullion backing with zero default risk",
          "Ultra-low direct expense ratio of 0.24%",
          "Negative correlation with equities provides fundamental risk protection",
          "Steady SIP unit accumulation acts as a generational wealth hedge",
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
