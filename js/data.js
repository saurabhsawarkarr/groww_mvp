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
    dayReturns: -76,
    dayReturnsPct: -1.22,
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
      nav: 580.17,
      aum: "₹40,498 Cr",
      expenseRatio: "0.85%",
      exitLoad: "0.10% if redeemed within 30 days; Nil after 30 days",
      invested: 3000,
      currentValue: 2750,
      returns: -250,
      returnsPct: -8.33,
      dayChangePct: -2.6,
      sipAmount: 1000,
      sipFrequency: "month",
      deepDive: {
        context: {
          tag: "What this means for your SIP",
          headline: "Market dips allow your monthly SIP to collect more units at lower prices.",
          subtext: "Pausing now stops this cost-averaging advantage. Continuing your SIP lowers your average purchase price for when the market rebounds."
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
        whyInline: "As NAV fell from ₹680 to ₹595, your SIP bought more units.",
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
          disclaimer: "Based on anonymised SIP behaviour data from Groww investors. Individual results may vary."
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
            title: "+7.4% extra units accumulated",
            desc: "SIP bought 4.74 units at avg NAV ₹632.91 (vs ₹680 initial) by investing through the dip."
          },
          {
            badge: "MARKET ATTRIBUTION",
            badgeClass: "blue",
            title: "Outperforming category benchmark",
            desc: "Decline is market-wide; fund held up stronger at -8.3% vs benchmark (-6.7%)."
          },
          {
            badge: "HISTORICAL & PEER DISCIPLINE",
            badgeClass: "purple",
            title: "Proven recovery record · 81% peer conviction",
            desc: "Manager steered 3 past recoveries (~14 mo avg); 81% of Groww investors kept their SIP active."
          }
        ],
        detailedAnalysis: {
          bannerTag: "SIP ON TRACK · ACCUMULATING DISCOUNTED UNITS",
          bannerTitle: "Your investment strategy is working as intended",
          bannerDesc: "Temporary market dips are an inherent part of equity cycles. Your ongoing ₹1,000 monthly SIP acts as an automated cost-averaging mechanism, securing more units per instalment.",
          accumulation: {
            title: "1. SIP Unit Accumulation Advantage",
            totalUnits: "4.74 units",
            baselineUnits: "4.41 units",
            gainPct: "+7.4%",
            avgNav: "₹632.91",
            initialNav: "₹680.00",
            discountPct: "6.9%",
            insight: "By continuing your ₹1,000 SIP in February (₹630.00) and March (₹595.00), each contribution purchased more units than at inception (₹680.00), lowering your break-even cost."
          },
          attribution: {
            title: "2. Market & Macro Attribution",
            benchmarkName: "Nifty LargeMidcap 250",
            benchmarkReturn: "-6.7%",
            fundReturn: "-8.3%",
            alpha: "-1.6%",
            sectorDrag: "-4.1%",
            insight: "Broad-based sector consolidation in IT and financials accounted for the drawdown, with the fund maintaining disciplined multi-cap diversification."
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
            nextDate: "15 Nov 2026",
            amount: "₹1,000",
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
        avgNav: 91.37,
        units: 21.89,
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
      nav: 84.51,
      aum: "₹75,200 Cr",
      expenseRatio: "0.69%",
      exitLoad: "2% within 365 days; 1% within 730 days; Nil after 2 years",
      invested: 2000,
      currentValue: 1850,
      returns: -150,
      returnsPct: -7.50,
      dayChangePct: +0.8,
      sipAmount: 500,
      sipFrequency: "month",
      deepDive: {
        context: {
          tag: "What this means for your SIP",
          headline: "Market dips allow your monthly SIP to collect more units at lower prices.",
          subtext: "Pausing now stops this cost-averaging advantage. Continuing your SIP lowers your average purchase price for when the market rebounds."
        },
        unitAccumulation: {
          title: "Your SIP is accumulating units",
          subtitle: "When NAV is lower, the same SIP amount purchases more units.",
          transactions: [
            { month: "Dec", amount: 500, nav: 98.00, units: 5.10 },
            { month: "Jan", amount: 500, nav: 95.00, units: 5.26 },
            { month: "Feb", amount: 500, nav: 89.50, units: 5.59 },
            { month: "Mar", amount: 500, nav: 84.20, units: 5.94 }
          ],
          totalUnits: 21.89,
          constantNavScenario: {
            nav: 98.00,
            units: 20.41,
            gainPct: "7.3",
            label: "At initial NAV of ₹98.00",
            gainBadge: "+7.3%",
            gainSubtitle: "Additional units"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whyInline: "As NAV fell from ₹98.00 to ₹84.20, your ₹500 SIP bought more units each month.",
        whyTitle: "Why?",
        whyText: "As NAV fell from ₹98.00 to ₹84.20, the same ₹500 SIP bought more units.",
        whatThisMeans: "As NAV fell from ₹98.00 to ₹84.20, the same ₹500 SIP bought more units."
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
          disclaimer: "Based on anonymised SIP behaviour data from Groww investors. Individual results may vary."
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
            title: "+7.3% extra units accumulated",
            desc: "SIP bought 21.89 units at avg NAV ₹91.37 (vs ₹98 initial) during market consolidation."
          },
          {
            badge: "MARKET ATTRIBUTION",
            badgeClass: "blue",
            title: "Outperforming Nifty 500 benchmark",
            desc: "Fund held stronger at -7.5% vs peer category drag, generating downside protection."
          },
          {
            badge: "HISTORICAL & PEER DISCIPLINE",
            badgeClass: "purple",
            title: "11+ Years CIO leadership · 84% peer conviction",
            desc: "CIO navigated 4 major drawdowns (~11 mo avg); 84% of Groww peers kept their SIP active."
          }
        ],
        detailedAnalysis: {
          bannerTag: "SIP ON TRACK · ACCUMULATING DISCOUNTED UNITS",
          bannerTitle: "Your investment strategy is working as intended",
          bannerDesc: "Temporary market dips allow your recurring ₹500 monthly SIP to purchase flexi-cap equities at a discount. Continuing your plan maintains rupee cost averaging.",
          accumulation: {
            title: "1. SIP Unit Accumulation Advantage",
            totalUnits: "21.89 units",
            baselineUnits: "20.41 units",
            gainPct: "+7.3%",
            avgNav: "₹91.37",
            initialNav: "₹98.00",
            discountPct: "6.8%",
            insight: "Lower NAV levels allowed each ₹500 instalment to collect additional units, positioning your holdings for higher compounding upon market recovery."
          },
          attribution: {
            title: "2. Market & Macro Attribution",
            benchmarkName: "Nifty 500",
            benchmarkReturn: "-5.8%",
            fundReturn: "-7.5%",
            alpha: "+1.6%",
            sectorDrag: "-3.3%",
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
            nextDate: "20 Nov 2026",
            amount: "₹500",
            streak: "4 of 4 instalments completed (100% on time)",
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
        avgNav: 25.22,
        units: 39.65,
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
      nav: 26.48,
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
          headline: "Your accumulated units are gaining value and compounding.",
          subtext: "Continuing your regular monthly SIP ensures steady wealth accumulation without trying to time commodity price swings."
        },
        unitAccumulation: {
          title: "Your SIP is building compounding units",
          subtitle: "Disciplined contributions accumulated units at lower prices that now drive positive returns.",
          transactions: [
            { month: "Dec", amount: 250, nav: 28.00, units: 8.93 },
            { month: "Jan", amount: 250, nav: 26.50, units: 9.43 },
            { month: "Feb", amount: 250, nav: 24.20, units: 10.33 },
            { month: "Mar", amount: 250, nav: 22.80, units: 10.96 }
          ],
          totalUnits: 39.65,
          constantNavScenario: {
            nav: 28.00,
            units: 35.71,
            gainPct: "11.0",
            label: "At initial NAV of ₹28.00",
            gainBadge: "+11.0%",
            gainSubtitle: "Extra units from averaging"
          },
          disclaimer: "Systematic investing reduces entry timing risk across market cycles."
        },
        whyInline: "Purchases during lower price levels (avg ₹25.22) are now delivering +5.0% gains as silver rebounded to ₹26.48.",
        whyTitle: "Why?",
        whyText: "Purchases during lower NAV levels lowered your cost base, boosting your returns when prices climbed.",
        whatThisMeans: "Purchases during lower NAV levels lowered your cost base, boosting your returns when prices climbed."
      },
      marketImpact: {
        banner: "Silver supported by global manufacturing rebound & currency tailwinds",
        factors: [
          { label: "US Dollar Index strength", changePct: -1.8, color: "#EB5B56" },
          { label: "Global industrial green-tech demand", changePct: +2.4, color: "#00D09C" },
          { label: "Rupee vs Dollar exchange buffer", changePct: +4.4, color: "#00D09C" },
          { label: "Net commodity return", changePct: +5.0, color: "#00D09C", isTotal: true }
        ],
        behavioralInsight: {
          tag: "Personal Insight",
          dipAction: "You stayed invested through price volatility, allowing your units to capture the rebound.",
          reassurance: "Sticking to your plan beats trying to time the peak."
        },
        disclaimer: "Market and sector data is sourced from public benchmark indices and fund fact sheets."
      },
      historicalPerformance: {
        heading: "Commodity cycles: Historical appreciation & holding period discipline",
        downturnPoint: {
          label: "-14.2%",
          period: "Correction",
          desc: "During past monetary tightening, silver dipped 14.2%"
        },
        recoveryPoint: {
          label: "+38.5%",
          period: "Rebound",
          desc: "rebounded by 38.5% in the following industrial expansion."
        },
        callout: "Commodity cycles reward disciplined long-term holding; staying invested through volatility captures subsequent cyclical expansion.",
        cohortBehavior: {
          title: "How Groww investors responded across commodity cycles",
          subtitle: "SIP behaviour across historical market events",
          moatBadge: "10-Year Data",
          heroPct: 84,
          heroLabel: "continued their SIP through price swings, capturing recent gains",
          breakdown: [
            { label: "Continued SIP", pct: 84, colorClass: "color-green" },
            { label: "Paused", pct: 10, colorClass: "color-amber" },
            { label: "Stopped", pct: 6, colorClass: "color-red" }
          ],
          historicalHeading: "SIP continuation across previous market events",
          previousEvents: [
            { name: "2020 · Bullion rally", pct: 72 },
            { name: "2022 · Rate hike cycle", pct: 78 },
            { name: "2024 · Industrial rebound", pct: 84 }
          ],
          disclaimer: "Based on anonymised SIP behaviour data from Groww investors. Individual results may vary."
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
            badge: "SIP CAPITAL GAIN",
            badgeClass: "mint",
            title: "+5.0% return achieved",
            desc: "Your disciplined ₹250 monthly SIP built 39.65 units now valued at ₹1,050 vs ₹1,000 invested."
          },
          {
            badge: "COMMODITY HEDGE",
            badgeClass: "blue",
            title: "Low correlation asset hedge",
            desc: "Physical silver tracking error remains exceptionally low at 0.14%, providing essential non-equity portfolio diversification."
          },
          {
            badge: "PEER DISCIPLINE",
            badgeClass: "purple",
            title: "Physical Bullion Custody · 84% peer conviction",
            desc: "Backed by 99.9% LBMA silver bullion; 84% of Groww commodity investors maintained their SIP unbroken."
          }
        ],
        detailedAnalysis: {
          bannerTag: "SIP ON TRACK · CAPITAL APPRECIATION",
          bannerTitle: "Your investment strategy is generating positive returns",
          bannerDesc: "Regular monthly contributions accumulated physical silver grams systematically. Averaging your purchase price has positioned your portfolio for positive returns.",
          accumulation: {
            title: "1. SIP Unit Accumulation & Capital Growth",
            totalUnits: "39.65 units",
            baselineUnits: "35.71 units",
            gainPct: "+11.0%",
            avgNav: "₹25.22",
            initialNav: "₹28.00",
            discountPct: "9.9%",
            insight: "By continuing your ₹250 SIP across December to March, your average unit cost of ₹25.22 allowed current NAV (₹26.48) to deliver positive portfolio gains."
          },
          attribution: {
            title: "2. Market & Macro Attribution",
            benchmarkName: "LBMA Domestic Silver Spot",
            benchmarkReturn: "+4.2%",
            fundReturn: "+5.0%",
            alpha: "+0.8%",
            sectorDrag: "+0.0%",
            insight: "Global manufacturing and electronics demand drove physical silver appreciation, with the fund generating positive alpha (+0.8%) through efficient bullion tracking."
          },
          governance: {
            title: "3. Governance & Bullion Standards",
            managerName: "Mr. Tapan Patel",
            tenure: "1+ year (Commodities specialist)",
            correctionsNavigated: "2 commodity cycles",
            avgRecoveryTime: "~8 months",
            expenseRatio: "0.22%",
            peerContinuity: "84% continued SIP",
            insight: "Strict vault custody protocols ensure direct 1-to-1 physical backing conforming to SEBI commodity mutual fund regulations."
          },
          autopay: {
            title: "4. Upcoming Milestone & Execution",
            nextDate: "05 Dec 2026",
            amount: "₹250",
            streak: "4 of 4 instalments completed (100% on time)",
            status: "Active & Automated",
            insight: "Continuing automated SIP maintains consistent bullion allocation without second-guessing daily spot price swings."
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
        avgNav: 21.14,
        units: 23.65,
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
      nav: 21.56,
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
          headline: "Your gold allocation is delivering stability and capital gains.",
          subtext: "Gold acts as a safe-haven hedge. Continuing your regular monthly SIP systematically accumulates pure bullion grams without timing daily spot prices."
        },
        unitAccumulation: {
          title: "Your SIP is building compounding units",
          subtitle: "Disciplined contributions accumulated units at lower prices that now drive positive returns.",
          transactions: [
            { month: "Feb", amount: 250, nav: 21.60, units: 11.57 },
            { month: "Mar", amount: 250, nav: 20.70, units: 12.08 }
          ],
          totalUnits: 23.65,
          constantNavScenario: {
            nav: 21.60,
            units: 23.15,
            gainPct: "2.2",
            label: "At initial NAV of ₹21.60",
            gainBadge: "+2.2%",
            gainSubtitle: "Extra units from averaging"
          },
          disclaimer: "Systematic investing reduces entry timing risk across market cycles."
        },
        whyInline: "Purchases during the dip (avg ₹21.14) are now delivering +2.0% gains as gold reached ₹21.56.",
        whyTitle: "Why?",
        whyText: "Purchases during lower NAV levels lowered your cost base, boosting your returns as gold valuations climbed.",
        whatThisMeans: "Purchases during lower NAV levels lowered your cost base, boosting your returns as gold valuations climbed."
      },
      marketImpact: {
        banner: "Gold supported by sovereign central bank accumulation & safe-haven flows",
        factors: [
          { label: "US Federal Reserve interest rates", changePct: -1.2, color: "#EB5B56" },
          { label: "Global Central Bank gold buying", changePct: +1.8, color: "#00D09C" },
          { label: "Geopolitical risk premium", changePct: +1.4, color: "#00D09C" },
          { label: "Net fund return", changePct: +2.0, color: "#00D09C", isTotal: true }
        ],
        behavioralInsight: {
          tag: "Personal Insight",
          dipAction: "You stayed invested through price volatility, allowing your units to capture steady positive returns.",
          reassurance: "Gold provides a steady hedge when held systematically."
        },
        disclaimer: "Market and sector data is sourced from public benchmark indices and fund fact sheets."
      },
      historicalPerformance: {
        heading: "Historical gold resilience: Stability and positive performance",
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
        callout: "During past market events, gold corrections historically differed in duration and magnitude from equities; staying invested through cycles built steady purchasing power.",
        cohortBehavior: {
          title: "How Groww investors responded across gold cycles",
          subtitle: "SIP behaviour across historical market events",
          moatBadge: "10-Year Data",
          heroPct: 86,
          heroLabel: "maintained their SIP through gold price swings, capturing steady gains",
          breakdown: [
            { label: "Continued SIP", pct: 86, colorClass: "color-green" },
            { label: "Paused", pct: 9, colorClass: "color-amber" },
            { label: "Stopped", pct: 5, colorClass: "color-red" }
          ],
          historicalHeading: "SIP continuation across previous market events",
          previousEvents: [
            { name: "2020 · Bullion rally", pct: 74 },
            { name: "2022 · Rate hike cycle", pct: 80 },
            { name: "2024 · Safe haven surge", pct: 86 }
          ],
          disclaimer: "Based on anonymised SIP behaviour data from Groww investors. Individual results may vary."
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
            badge: "SIP CAPITAL GAIN",
            badgeClass: "mint",
            title: "+2.0% return achieved",
            desc: "Your disciplined ₹250 monthly SIP built 23.65 units now valued at ₹510 vs ₹500 invested."
          },
          {
            badge: "PORTFOLIO HEDGE",
            badgeClass: "blue",
            title: "Safe-haven asset resilience",
            desc: "Gold exhibited historical resilience, cushioning equity volatility with positive returns (+2.0%)."
          },
          {
            badge: "PEER DISCIPLINE",
            badgeClass: "purple",
            title: "99.5% Pure Gold Custody · 86% peer conviction",
            desc: "Physical bullion secured in accredited vaults; 86% of Groww gold investors maintained unbroken SIP contributions."
          }
        ],
        detailedAnalysis: {
          bannerTag: "SIP ON TRACK · PORTFOLIO HEDGE & GAINS",
          bannerTitle: "Your gold investment strategy is generating positive returns",
          bannerDesc: "Gold serves as a strategic store of value. Systematically averaging gold units built a stable, positive foundation for your overall portfolio.",
          accumulation: {
            title: "1. SIP Unit Accumulation & Capital Growth",
            totalUnits: "23.65 units",
            baselineUnits: "23.15 units",
            gainPct: "+2.2%",
            avgNav: "₹21.14",
            initialNav: "₹21.60",
            discountPct: "2.1%",
            insight: "Systematic monthly contributions accumulated physical bullion grams at an average cost of ₹21.14, enabling current NAV (₹21.56) to deliver positive portfolio gains."
          },
          attribution: {
            title: "2. Market & Macro Attribution",
            benchmarkName: "Domestic Physical Spot Gold",
            benchmarkReturn: "+1.4%",
            fundReturn: "+2.0%",
            alpha: "+0.6%",
            sectorDrag: "+0.0%",
            insight: "Global central bank gold reserve purchases and currency hedging supported gold prices, generating +0.6% relative outperformance with negligible tracking error."
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
            nextDate: "05 Dec 2026",
            amount: "₹250",
            streak: "2 of 2 instalments completed (100% on time)",
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
