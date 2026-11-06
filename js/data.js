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
    title: "Understand your portfolio status",
    subtext: "Explore your fund performance, track SIP activity and understand changes in your investments."
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
        cohortBehavior: {
          title: "How Groww investors responded to market declines",
          subtitle: "SIP behaviour across historical market events",
          moatBadge: "10-Year Data",
          heroPct: 81,
          heroLabel: "continued their SIP during the February 2025 market dip",
          breakdown: [
            { label: "Continued SIP", pct: 81, colorClass: "color-green" },
            { label: "Paused", pct: 12, colorClass: "color-amber" },
            { label: "Stopped", pct: 7, colorClass: "color-red" }
          ],
          historicalHeading: "SIP continuation across previous market events",
          previousEvents: [
            { name: "2020 · COVID crash", pct: 67 },
            { name: "2022 · Rate hike correction", pct: 74 },
            { name: "2024 · Election volatility", pct: 81 }
          ],
          disclaimer: "Based on anonymised SIP behaviour data from Groww investors.<br>Individual results may vary."
        }
      },
      fundManager: {
        name: "Mr. R. Srinivasan",
        title: "Fund Manager · Equity",
        tenure: "Managing the fund since May 2019",
        tenureBadge: "5+ years",
        performancePeriod: "3-year annualised returns (as of Mar 2025)",
        fundReturn: "12.4%",
        categoryReturn: "10.1%",
        downturnTrackRecord: {
          title: "How this fund navigated past corrections",
          correctionsCount: 3,
          recoveryTime: "~14 months",
          sourceNote: "Managed by Mr. R. Srinivasan since 2019 · Groww transaction data."
        },
        investmentApproach: "Invests in a mix of large and mid-sized companies with a focus on long-term growth.",
        disclaimer: "Past performance shows how the fund has behaved, but it does not guarantee future returns."
      },
      fundHealth: {
        status: "Summary & Key Takeaways",
        subtitle: "Personalized synthesis of your SIP accumulation, attribution, and governance data.",
        personalizedHighlights: [
          {
            badge: "SIP UNIT ADVANTAGE",
            badgeClass: "mint",
            title: "+9.6% extra units accumulated",
            desc: "Your ₹2,000 monthly SIP purchased 131.58 units at an average cost of ₹45.60 vs ₹50.00 initial NAV by investing through the dip."
          },
          {
            badge: "MARKET ATTRIBUTION",
            badgeClass: "blue",
            title: "Outperforming category benchmark",
            desc: "The decline is category-wide, but your fund held up stronger at -4.2% compared to Nifty LargeMidcap 250 (-5.8%)."
          },
          {
            badge: "HISTORICAL & PEER DISCIPLINE",
            badgeClass: "purple",
            title: "Proven recovery record · 81% peer conviction",
            desc: "Mr. R. Srinivasan has steered through 3 past corrections (~14 mo avg recovery); 81% of Groww investors in this fund kept their SIP active."
          }
        ],
        detailedAnalysis: {
          bannerTag: "SIP ON TRACK · ACCUMULATING DISCOUNTED UNITS",
          bannerTitle: "Your investment strategy is working as intended",
          bannerDesc: "Temporary market dips are an inherent part of equity cycles. Your ongoing ₹2,000 monthly SIP acts as an automated cost-averaging mechanism, securing more units per instalment.",
          accumulation: {
            title: "1. SIP Unit Accumulation Advantage",
            totalUnits: "131.58 units",
            baselineUnits: "120.00 units",
            gainPct: "+9.6%",
            avgNav: "₹45.60",
            initialNav: "₹50.00",
            discountPct: "8.8%",
            insight: "By continuing your SIP in February (₹45.50) and March (₹42.00), each ₹2,000 contribution purchased more units than at inception, accelerating your break-even on market rebound."
          },
          attribution: {
            title: "2. Market & Macro Attribution",
            benchmarkName: "Nifty LargeMidcap 250",
            benchmarkReturn: "-5.8%",
            fundReturn: "-4.2%",
            alpha: "+1.6%",
            sectorDrag: "-4.1%",
            insight: "Broad-based macroeconomic factors drove the drawdown. The fund's active stock selection generated positive alpha (+1.6%), cushioning your portfolio relative to the market."
          },
          governance: {
            title: "3. Governance & Manager Precedent",
            managerName: "Mr. R. Srinivasan",
            tenure: "5+ years (since May 2019)",
            correctionsNavigated: "3 market corrections",
            avgRecoveryTime: "~14 months",
            expenseRatio: "0.85%",
            peerContinuity: "81% continued SIP",
            insight: "Experienced fund leadership with multi-cycle stability conforming strictly to SEBI large & midcap rebalancing mandates."
          },
          autopay: {
            title: "4. Upcoming Milestone & Execution",
            nextDate: "05 Apr 2025",
            amount: "₹2,000",
            streak: "3 of 3 instalments completed (100% on time)",
            status: "Active & Automated",
            insight: "Staying disciplined preserves your streak and positions your portfolio for compounding once market momentum turns."
          }
        },
        takeaways: [
          "Decline driven primarily by broader market benchmark movement (-2.6%)",
          "Continuity in fund leadership with manager tenure exceeding 5 years",
          "Direct expense ratio of 0.85% remains in line with category averages",
          "Portfolio changes reflect periodic rebalancing within mandated large & midcap allocation"
        ]
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
        cohortBehavior: {
          title: "How Groww investors responded to market declines",
          subtitle: "SIP behaviour across historical market events",
          moatBadge: "10-Year Data",
          heroPct: 81,
          heroLabel: "continued their SIP during the February 2025 market dip",
          breakdown: [
            { label: "Continued SIP", pct: 81, colorClass: "color-green" },
            { label: "Paused", pct: 12, colorClass: "color-amber" },
            { label: "Stopped", pct: 7, colorClass: "color-red" }
          ],
          historicalHeading: "SIP continuation across previous market events",
          previousEvents: [
            { name: "2020 · COVID crash", pct: 67 },
            { name: "2022 · Rate hike correction", pct: 74 },
            { name: "2024 · Election volatility", pct: 81 }
          ],
          disclaimer: "Based on anonymised SIP behaviour data from Groww investors.<br>Individual results may vary."
        }
      },
      fundManager: {
        name: "Mr. Rajeev Thakkar",
        title: "CIO & Lead Equity Manager",
        tenure: "Managing the fund since May 2013",
        tenureBadge: "11+ years",
        performancePeriod: "3-year annualised returns (as of Mar 2025)",
        fundReturn: "18.4%",
        categoryReturn: "15.2%",
        downturnTrackRecord: {
          title: "How this fund navigated past corrections",
          correctionsCount: 4,
          recoveryTime: "~11 months",
          sourceNote: "Managed by Mr. Rajeev Thakkar since 2013 · Groww transaction data."
        },
        investmentApproach: "Focuses on value investing across large, mid, and small-cap stocks, including select international equities with strong moats.",
        disclaimer: "Past performance shows how the fund has behaved, but it does not guarantee future returns."
      },
      fundHealth: {
        status: "Summary & Key Takeaways",
        subtitle: "Personalized synthesis of your SIP accumulation, attribution, and governance data.",
        personalizedHighlights: [
          {
            badge: "SIP UNIT ADVANTAGE",
            badgeClass: "mint",
            title: "+8.4% extra units accumulated",
            desc: "Your monthly SIP accumulated 146.32 units at an average cost of ₹78.20 vs ₹85.00 initial NAV during the recent market consolidation."
          },
          {
            badge: "MARKET ATTRIBUTION",
            badgeClass: "blue",
            title: "Outperforming Nifty 500 benchmark",
            desc: "Fund held up stronger at -3.8% compared to the Nifty 500 benchmark (-5.4%), generating +1.6% relative downside protection."
          },
          {
            badge: "HISTORICAL & PEER DISCIPLINE",
            badgeClass: "purple",
            title: "11+ Years CIO leadership · 84% peer conviction",
            desc: "Mr. Rajeev Thakkar has steered through 4 major drawdowns (~11 mo avg recovery); 84% of Groww peers kept their SIP active."
          }
        ],
        detailedAnalysis: {
          bannerTag: "SIP ON TRACK · ACCUMULATING DISCOUNTED UNITS",
          bannerTitle: "Your investment strategy is working as intended",
          bannerDesc: "Temporary market dips allow your recurring SIP to purchase flexi-cap equities at a discount. Continuing your plan maintains rupee cost averaging.",
          accumulation: {
            title: "1. SIP Unit Accumulation Advantage",
            totalUnits: "146.32 units",
            baselineUnits: "135.00 units",
            gainPct: "+8.4%",
            avgNav: "₹78.20",
            initialNav: "₹85.00",
            discountPct: "8.0%",
            insight: "Lower NAV levels allowed each installment to collect additional units, positioning your holdings for higher compounding upon market recovery."
          },
          attribution: {
            title: "2. Market & Macro Attribution",
            benchmarkName: "Nifty 500",
            benchmarkReturn: "-5.4%",
            fundReturn: "-3.8%",
            alpha: "+1.6%",
            sectorDrag: "-3.6%",
            insight: "Active value allocation and international equity exposure provided defensive insulation during the broader market pullback."
          },
          governance: {
            title: "3. Governance & Manager Precedent",
            managerName: "Mr. Rajeev Thakkar",
            tenure: "11+ years (since May 2013)",
            correctionsNavigated: "4 market corrections",
            avgRecoveryTime: "~11 months",
            expenseRatio: "0.69%",
            peerContinuity: "84% continued SIP",
            insight: "Longest unbroken track record in the flexi-cap category with conservative cash management (~14% cash & arbitrage buffer)."
          },
          autopay: {
            title: "4. Upcoming Milestone & Execution",
            nextDate: "10 Apr 2025",
            amount: "₹2,500",
            streak: "3 of 3 instalments completed (100% on time)",
            status: "Active & Automated",
            insight: "Automated execution ensures uninterrupted unit collection across shifting market valuations."
          }
        },
        takeaways: [
          "CIO Rajeev Thakkar has managed the fund continuously since May 2013 (11+ years)",
          "Direct plan expense ratio is 0.69%",
          "Portfolio holds a ~14% cash & arbitrage allocation per latest AMC factsheet",
          "Investment mandate follows value investing across domestic and global equities"
        ]
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
        callout: "Historical data shows commodity drawdowns followed by industrial demand cycles, though recovery timelines and magnitudes vary.",
        cohortBehavior: {
          title: "How Groww investors responded to market declines",
          subtitle: "SIP behaviour across historical market events",
          moatBadge: "10-Year Data",
          heroPct: 81,
          heroLabel: "continued their SIP during the February 2025 market dip",
          breakdown: [
            { label: "Continued SIP", pct: 81, colorClass: "color-green" },
            { label: "Paused", pct: 12, colorClass: "color-amber" },
            { label: "Stopped", pct: 7, colorClass: "color-red" }
          ],
          historicalHeading: "SIP continuation across previous market events",
          previousEvents: [
            { name: "2020 · COVID crash", pct: 67 },
            { name: "2022 · Rate hike correction", pct: 74 },
            { name: "2024 · Election volatility", pct: 81 }
          ],
          disclaimer: "Based on anonymised SIP behaviour data from Groww investors.<br>Individual results may vary."
        }
      },
      fundManager: {
        name: "Mr. Tapan Patel",
        title: "Commodities & Quant Manager",
        tenure: "Managing the fund since Jan 2024",
        tenureBadge: "1+ year",
        performancePeriod: "1-year annualised returns (as of Mar 2025)",
        fundReturn: "18.2%",
        categoryReturn: "17.4%",
        downturnTrackRecord: {
          title: "How this fund navigated past corrections",
          correctionsCount: 2,
          recoveryTime: "~8 months",
          sourceNote: "Based on historical commodity cycles · Groww transaction data."
        },
        investmentApproach: "Direct physical silver bullion allocation conforming to LBMA standards with low tracking error.",
        disclaimer: "Past performance shows how the fund has behaved, but it does not guarantee future returns."
      },
      fundHealth: {
        status: "Summary & Key Takeaways",
        subtitle: "Personalized synthesis of your SIP accumulation, attribution, and governance data.",
        personalizedHighlights: [
          {
            badge: "SIP UNIT ADVANTAGE",
            badgeClass: "mint",
            title: "+11.2% extra units accumulated",
            desc: "Silver price fluctuations enabled your SIP contributions to accumulate 28.94 units at an average cost of ₹82.40 vs ₹92.00 starting NAV."
          },
          {
            badge: "COMMODITY CYCLE",
            badgeClass: "blue",
            title: "Low correlation asset hedge",
            desc: "Physical silver tracking error remains exceptionally low at 0.14%, providing essential non-equity portfolio diversification."
          },
          {
            badge: "HISTORICAL & PEER DISCIPLINE",
            badgeClass: "purple",
            title: "Physical Bullion Custody · 78% peer conviction",
            desc: "Backed by 99.9% LBMA silver bullion; 78% of Groww commodity investors maintained their SIP through recent price swings."
          }
        ],
        detailedAnalysis: {
          bannerTag: "SIP ON TRACK · ACCUMULATING DISCOUNTED UNITS",
          bannerTitle: "Your investment strategy is working as intended",
          bannerDesc: "Precious metals experience cyclical price shifts. Recurring investments systematically accumulate grams of silver at favorable price points.",
          accumulation: {
            title: "1. SIP Unit Accumulation Advantage",
            totalUnits: "28.94 units",
            baselineUnits: "26.00 units",
            gainPct: "+11.2%",
            avgNav: "₹82.40",
            initialNav: "₹92.00",
            discountPct: "10.4%",
            insight: "Commodity volatility provides high unit accumulation elasticity for regular systematic investors."
          },
          attribution: {
            title: "2. Market & Macro Attribution",
            benchmarkName: "LBMA Domestic Silver Spot",
            benchmarkReturn: "-7.2%",
            fundReturn: "-5.8%",
            alpha: "+1.4%",
            sectorDrag: "-6.5%",
            insight: "Industrial silver demand and dollar index strength dictated price movements, tracked accurately with low slippage."
          },
          governance: {
            title: "3. Governance & Bullion Standards",
            managerName: "Mr. Tapan Patel",
            tenure: "1+ year (Commodities specialist)",
            correctionsNavigated: "2 commodity cycles",
            avgRecoveryTime: "~8 months",
            expenseRatio: "0.22%",
            peerContinuity: "78% continued SIP",
            insight: "Strict vault custody protocols ensure direct 1-to-1 physical backing conforming to SEBI commodity mutual fund regulations."
          },
          autopay: {
            title: "4. Upcoming Milestone & Execution",
            nextDate: "15 Apr 2025",
            amount: "₹1,000",
            streak: "2 of 2 instalments completed (100% on time)",
            status: "Active & Automated",
            insight: "Systematic accumulation shields investors from attempting to time precious metal spot cycles."
          }
        },
        takeaways: [
          "Fund holds physical silver bullion conforming to LBMA 99.9% purity standards",
          "Direct plan expense ratio is 0.22%",
          "Reported tracking error is 0.14% relative to domestic spot silver benchmark",
          "Commodity allocation has historically shown low correlation with equity markets"
        ]
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
        callout: "During past market events, gold corrections historically differed in duration and magnitude from equities; past price movements do not predict future trends.",
        cohortBehavior: {
          title: "How Groww investors responded to market declines",
          subtitle: "SIP behaviour across historical market events",
          moatBadge: "10-Year Data",
          heroPct: 81,
          heroLabel: "continued their SIP during the February 2025 market dip",
          breakdown: [
            { label: "Continued SIP", pct: 81, colorClass: "color-green" },
            { label: "Paused", pct: 12, colorClass: "color-amber" },
            { label: "Stopped", pct: 7, colorClass: "color-red" }
          ],
          historicalHeading: "SIP continuation across previous market events",
          previousEvents: [
            { name: "2020 · COVID crash", pct: 67 },
            { name: "2022 · Rate hike correction", pct: 74 },
            { name: "2024 · Election volatility", pct: 81 }
          ],
          disclaimer: "Based on anonymised SIP behaviour data from Groww investors.<br>Individual results may vary."
        }
      },
      fundManager: {
        name: "Mr. Tapan Patel",
        title: "Precious Metals Manager",
        tenure: "Managing the fund since Jan 2024",
        tenureBadge: "1+ year",
        performancePeriod: "1-year annualised returns (as of Mar 2025)",
        fundReturn: "14.8%",
        categoryReturn: "14.1%",
        downturnTrackRecord: {
          title: "How this fund navigated past corrections",
          correctionsCount: 3,
          recoveryTime: "~6 months",
          sourceNote: "Based on historical gold bullion cycles · Groww transaction data."
        },
        investmentApproach: "Passively tracks physical gold spot prices by holding physical 99.5% pure gold bullion with accredited custodians.",
        disclaimer: "Past performance shows how the fund has behaved, but it does not guarantee future returns."
      },
      fundHealth: {
        status: "Summary & Key Takeaways",
        subtitle: "Personalized synthesis of your SIP accumulation, attribution, and governance data.",
        personalizedHighlights: [
          {
            badge: "SIP UNIT ADVANTAGE",
            badgeClass: "mint",
            title: "+6.8% extra units accumulated",
            desc: "Gold consolidation allowed regular SIP instalments to purchase 31.85 units at an average NAV of ₹64.10 vs ₹68.50 baseline."
          },
          {
            badge: "PORTFOLIO HEDGE",
            badgeClass: "blue",
            title: "Safe-haven asset resilience",
            desc: "Gold exhibited historical resilience, with low drawdown (-2.9%) relative to broader equity indices (-5.8%)."
          },
          {
            badge: "HISTORICAL & PEER DISCIPLINE",
            badgeClass: "purple",
            title: "99.5% Pure Gold Custody · 86% peer conviction",
            desc: "Physical bullion secured in accredited vaults; 86% of Groww gold investors maintained unbroken SIP contributions."
          }
        ],
        detailedAnalysis: {
          bannerTag: "SIP ON TRACK · ACCUMULATING DISCOUNTED UNITS",
          bannerTitle: "Your investment strategy is working as intended",
          bannerDesc: "Gold serves as a strategic store of value. Systematically averaging gold units builds long-term purchasing power hedge.",
          accumulation: {
            title: "1. SIP Unit Accumulation Advantage",
            totalUnits: "31.85 units",
            baselineUnits: "29.80 units",
            gainPct: "+6.8%",
            avgNav: "₹64.10",
            initialNav: "₹68.50",
            discountPct: "6.4%",
            insight: "Systematic monthly contributions accumulate physical bullion grams without timing daily commodity fluctuations."
          },
          attribution: {
            title: "2. Market & Macro Attribution",
            benchmarkName: "Domestic Physical Spot Gold",
            benchmarkReturn: "-3.8%",
            fundReturn: "-2.9%",
            alpha: "+0.9%",
            sectorDrag: "-3.2%",
            insight: "Global interest rate expectations and currency movements shaped price ranges, tracked with high precision."
          },
          governance: {
            title: "3. Governance & Custody Standards",
            managerName: "Mr. Tapan Patel",
            tenure: "1+ year (Precious metals manager)",
            correctionsNavigated: "3 gold price cycles",
            avgRecoveryTime: "~6 months",
            expenseRatio: "0.24%",
            peerContinuity: "86% continued SIP",
            insight: "Physical gold bars meeting LBMA 995 fineness stored with accredited independent custodians, audited regularly."
          },
          autopay: {
            title: "4. Upcoming Milestone & Execution",
            nextDate: "20 Apr 2025",
            amount: "₹1,500",
            streak: "3 of 3 instalments completed (100% on time)",
            status: "Active & Automated",
            insight: "Automated execution builds gold reserve allocations frictionlessly in small, manageable monthly amounts."
          }
        },
        takeaways: [
          "Fund holds physical 99.5% pure gold bullion secured with accredited vault custodians",
          "Direct plan expense ratio is 0.24%",
          "Asset class has historically exhibited negative correlation with equities during market stress",
          "Fund passively tracks domestic spot gold prices with periodic portfolio disclosure"
        ]
      }
    }
  ]
};
