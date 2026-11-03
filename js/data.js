// Groww Portfolio Understanding MVP - Data Store
// Aligned with Problem STataemnt.txt and Canva SOlution.pdf

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
      invested: 3000,
      currentValue: 2450, // Matches Canva Slide 1 (₹2,450) and Slide 2 (invested ₹3,000, val ₹2,750)
      slide2CurrentValue: 2750,
      returns: -250,
      returnsPct: -8.3,
      dayChangePct: -2.6,
      sipAmount: 1000,
      sipFrequency: "month",
      category: "Large & Midcap",
      deepDive: {
        recommendation: {
          tag: "MY RECOMMENDATION",
          headline: "Your fund has experienced market fluctuations while your SIP investments have continued.",
          subtext: "Market movements can impact your fund's value in the short term, even when your SIP is on track."
        },
        unitAccumulation: {
          title: "Your SIP is accumulating units",
          subtitle: "When NAV is lower, the same SIP amount purchases more units.",
          transactions: [
            { month: "Jan", amount: 1000, nav: 100.00, units: 10.00 },
            { month: "Feb", amount: 1000, nav: 90.00, units: 11.11 },
            { month: "Mar", amount: 1000, nav: 85.00, units: 11.76 }
          ],
          totalUnits: 32.87,
          constantNavScenario: {
            nav: 100.00,
            units: 30.00,
            gainPct: 9.6,
            comparisonText: "32.87 vs 30.00"
          },
          disclaimer: "More units do not guarantee positive returns."
        },
        whatThisMeans: "Your fund has faced short-term market fluctuations, which has impacted its value. At the same time, your SIP investments have continued to buy more units at lower NAVs. Over the long term, these additional units can help in wealth creation."
      },
      marketImpact: {
        banner: "Broader market is down 2.6% this month",
        factors: [
          { label: "Broader market (Nifty 50)", changePct: -2.6, color: "#EB5B56" },
          { label: "Your fund's sector (IT / Financials)", changePct: -4.1, color: "#EB5B56" },
          { label: "Fund-specific factors", changePct: -1.6, color: "#EB5B56" },
          { label: "Total portfolio change", changePct: -8.3, color: "#EB5B56", isTotal: true }
        ],
        callout: "Most of the drop (≈ 2.6%) is due to overall market movement, while the rest is from your fund's sector and stock performance."
      },
      historicalPerformance: {
        heading: "How this fund behaved in past downturns",
        downturnPoint: {
          label: "-12.4%",
          period: "Mar–May 2020",
          desc: "During the 2020 market fall, this fund was down 12.4%"
        },
        recoveryPoint: {
          label: "+31.2%",
          period: "next 12 months",
          desc: "recovered and gave 31.2% returns in the next 12 months."
        }
      },
      fundManager: {
        name: "Saurabh Pant",
        title: "Same fund manager",
        tenure: "Managing since May 2019 (5+ years)",
        verified: true,
        performances: {
          "1Y": { fund: "+16.8%", category: "+14.2%" },
          "3Y": { fund: "+12.4%", category: "+10.1%" },
          "5Y": { fund: "+18.2%", category: "+15.6%" }
        },
        activeTab: "3Y",
        callout: "The fund manager and investment approach remain unchanged."
      },
      fundHealth: {
        status: "Fund is healthy",
        subtitle: "No significant changes in manager, strategy, cost or holdings.",
        takeaways: [
          "Decline mainly due to broader market movement (-2.6%)",
          "No change in fund manager or investment strategy",
          "Expense ratio unchanged (1.10%)",
          "Portfolio changes are within the usual range"
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
      invested: 2000,
      currentValue: 1720, // Matches Canva Slide 1 (₹1,720)
      slide2CurrentValue: 1850,
      returns: -150,
      returnsPct: -7.5,
      dayChangePct: +0.8,
      sipAmount: 500,
      sipFrequency: "month",
      category: "Flexi Cap"
    },
    {
      id: "tata-silver-etf",
      name: "Tata Silver ETF FoF",
      planLine1: "Tata Silver ETF FoF Direct Growth",
      planLine2: "",
      plan: "Direct Plan · Growth",
      status: "Active SIP",
      statusBadge: "SIP",
      invested: 1000,
      currentValue: 820, // Matches Canva Slide 1 (₹820)
      slide2CurrentValue: 1050,
      returns: 50,
      returnsPct: 5.0,
      dayChangePct: -1.9,
      sipAmount: 250,
      sipFrequency: "month",
      category: "Commodities / Silver"
    },
    {
      id: "tata-gold-etf",
      name: "Tata Gold ETF FoF",
      planLine1: "Tata Gold ETF FoF Direct Growth",
      planLine2: "",
      plan: "Direct Plan · Growth",
      status: "Active SIP",
      statusBadge: "SIP",
      invested: 500,
      currentValue: 510, // Matches Canva Slide 1 (₹510)
      slide2CurrentValue: 510,
      returns: 10,
      returnsPct: 2.0,
      dayChangePct: +0.4,
      sipAmount: 250,
      sipFrequency: "month",
      category: "Commodities / Gold"
    }
  ]
};

