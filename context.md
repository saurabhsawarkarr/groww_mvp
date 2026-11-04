# Project Context: Groww – Portfolio Understanding MVP ("Why is my portfolio down?")

---

## 1. Executive Summary & Product Vision

* **Product:** Groww Mutual Funds – Portfolio Understanding  
* **Key Feature:** *"Why is my portfolio down?"* / Portfolio Insights  
* **Platform:** Mobile-first web application / interactive prototype  
* **Design System:** Strict Groww mobile dark mode design standards  
* **Primary Business Goal:** Improve **12-month active SIP retention** among first-time mutual fund investors by addressing panic and confusion during early market drawdowns.

### Vision Statement
Help first-time mutual fund investors understand the dynamics behind portfolio fluctuations by providing fund-specific explanations and visually demonstrating how their ongoing SIP contributions accumulate more units at lower NAVs (Rupee-Cost Averaging), shifting their perspective from short-term panic to informed, long-term confidence.

---

## 2. Background, Problem & Target User

### 2.1 The Core Problem
First-time mutual fund investors typically monitor their investments through Groww’s portfolio dashboard. When they notice a negative return in the first 2–4 months (e.g., Invested ₹6,000, Current Value ₹5,500, Return -8.33%), they face high uncertainty:
* They cannot distinguish between broader market correction vs. fund underperformance.
* They view the portfolio as a simple loss rather than an active unit-accumulation phase.
* **Result:** Without context, anxiety leads to pausing, reducing, or cancelling active SIPs prematurely.

### 2.2 Target User Persona
* **Segment:** First-time retail mutual fund SIP investors.
* **Tenure:** Investing for 1–6 months.
* **Behaviour:** Regularly opens Groww, tracks 1-day and total returns, becomes anxious during market dips.
* **Need:** Plain-language, transparent context explaining why the decline happened and what their SIP is actually doing.

---

## 3. Strict Groww Design System & UI Specifications

To maintain brand consistency, the MVP adheres strictly to Groww’s mobile app aesthetic:

### 3.1 Color Palette
| Token | Hex / Value | Usage |
|---|---|---|
| **Background (Primary)** | `#121212` / `#0E1015` | Main app background |
| **Card Surface (Elevated)** | `#1A1D24` / `#1F222A` | Elevated cards, list items, containers |
| **Borders & Dividers** | `rgba(255, 255, 255, 0.08)` / `#282D3A` | Subtle dividers and outlines |
| **Groww Brand Green** | `#00D09C` / `#00C988` | Positive returns, active tabs, success badges |
| **Negative Red** | `#EB5B56` / `#F43F5E` | Negative returns, downward metrics |
| **Insight Indigo/Purple** | `#1E1B4B` to `#312E81` | Dedicated gradient background for the insight card |
| **Text Primary** | `#FFFFFF` / `#F9FAFB` | Primary headers, values, amounts |
| **Text Secondary** | `#9CA3AF` / `#8B95A5` | Subtitles, labels, timestamps |
| **Text Muted** | `#4B5563` / `#6B7280` | Tertiary captions and small icons |

### 3.2 Typography & Formatting
* **Font Family:** Clean geometric sans-serif (Inter, SF Pro, or Gilroy style).
* **Number Formatting:** Standard Indian numbering system with the `₹` symbol (e.g., `₹6,000`, `-₹500 (-8.33%)`).
* **Visual Density:** Mobile-native dimensions (approx. 390px–420px viewport width), 12px–16px border-radius, clean card padding (16px).

---

## 4. Screen-by-Screen Breakdown (Canva Slides & PRD Mapping)

### Slide 1: Existing Groww Mutual Funds Dashboard (Entry Point)
* **Top App Bar:** Search, Watchlist (eye icon), Analytics/Reports icon.
* **Portfolio Metrics Header:**
  * 1D Returns: `-₹120 (-2.1%)`
  * Total Returns: `-₹500 (-8.33%)`
  * Invested Amount: `₹6,000`
  * XIRR: `-8.1%` (dropdown toggle)
* **The "Hook" (Insight Card):**
  * Positioned prominently below the portfolio summary and above the holdings list.
  * Deep indigo/purple gradient container with bar chart icon and mini trendline.
  * **Title:** *"Why is my portfolio down?"*
  * **Subtitle:** *"Understand how market movements, your funds, and SIP investments are affecting your returns."*
  * Right chevron `>` indicating actionable navigation.
* **Holdings Preview:**
  * Filter & Sort control: `< > Day Change (%)`
  * SBI Large & Midcap Fund Direct Plan Growth (`₹2,450`, `-2.6%`)
  * Parag Parikh Flexi Cap Fund Direct Growth (`₹1,720`, `+0.8%`)
  * Tata Silver ETF FoF Direct Growth (`₹820`, `-1.9%`)
  * Tata Gold ETF FoF Direct Growth (`₹510`, `+0.4%`)
* **Groww Bottom Navigation:** Stocks, Mutual Funds (active indicator `#00D09C`), Pay/UPI, Profile.

---

### Slide 2: Mutual Fund Selection ("Portfolio Insights")
* **Header:** Back button `←`, Title: *"Portfolio Insights"*
* **Hero Banner:**
  * Analytics / magnifying glass illustration.
  * **Headline:** *"Understand your mutual funds"*
  * **Subtext:** *"Select a fund to see why its value has changed and how your SIP is performing."*
* **Fund Cards List:**
  * **SBI Large & Midcap Fund:** Invested `₹3,000`, Current `₹2,750`, Return `-₹250 (-8.3%)`, SIP `₹1,000/month`, Badge: `SIP`.
  * **Parag Parikh Flexi Cap Fund:** Invested `₹2,000`, Current `₹1,850`, Return `-₹150 (-7.5%)`, SIP `₹500/month`.
  * **Tata Silver ETF FoF:** Invested `₹1,000`, Current `₹1,050`, Return `+₹50 (+5.0%)`, SIP `₹250/month`.
  * **Tata Gold ETF FoF:** Invested `₹500`, Current `₹510`, Return `+₹10 (+2.0%)`, SIP `₹250/month`.
* **Action:** Tapping any fund navigates to the fund-specific explanation.

---

### Slide 3: Fund Deep-Dive – SIP Unit Accumulation & Rupee-Cost Averaging
* **Header:** Back button `←`, *"Why is my portfolio down?"*, Fund Logo & Name: *SBI Large & Midcap Fund (Direct Plan · Growth · Active SIP)*
* **Context Card ("My Recommendation" / Context):**
  * Light bulb icon.
  * *"Your fund has experienced market fluctuations while your SIP investments have continued."*
  * Explains that short-term volatility is normal and ongoing SIPs continue as scheduled.
* **SIP Unit Accumulation Table:**
  * Section title: *"Your SIP is accumulating units"*
  * Subtitle: *"When NAV is lower, the same SIP amount purchases more units."*
  * **Transaction Table:**
    | Month | SIP Amount | NAV (₹) | Units Purchased |
    |---|---|---|---|
    | **Jan** | ₹1,000 | 100.00 | 10.00 |
    | **Feb** | ₹1,000 | 90.00 | 11.11 |
    | **Mar** | ₹1,000 | 85.00 | 11.76 |
  * **Total Units Accumulated:** `32.87 units` (highlighted in Groww green `#00D09C`).
  * **Comparison Pill:** If NAV had stayed at ₹100, investor would have `30.00 units` ➔ **`▲ ≈ 9.6% more units (32.87 vs 30.00)`**.
  * **Mandatory Disclaimer:** *"More units do not guarantee positive returns."*
* **"What this means" Summary Card:**
  * Neutral, reassuring breakdown explaining that market dips allow investors to acquire more units at a lower average cost.

---

### Slide 4: Market Impact & Attribution Breakdown (Proprietary Defensibility Moat)
* **Header:** Back button `←`, *"Market Impact"*
* **Banner:** *"Broader market is down 2.6% this month"*
* **Attribution Breakdown List (Combining Public + Proprietary Ledger Data):**
  * Broader market (Nifty 50): `-2.6%` (Public index)
  * Fund's sector (e.g. IT / BFSI): `-4.1%` (Public index)
  * Fund-specific / Stock selection factors: `-2.0%` (Public fund data)
  * **Your personal entry timing:** `+0.4%` (★ **Groww Proprietary Ledger** – unique competitive moat)
  * **Total fund portfolio change:** `-8.3%`
* **Personalized Ledger Insight Card:**
  * *"You bought 23 units at ₹85 in February — lower than the fund's average NAV that month (₹91). Your timing worked in your favour."*
* **SEBI & Methodology Disclaimer:**
  * *"Attribution is calculated using your actual transaction dates and NAV history. Market and sector data is sourced from public indices."*

---

### Slide 5: Historical Performance in Downturns
* **Header:** Back button `←`, *"Historical Performance"*
* **Toggle Tabs:** `This Fund` (active) vs. `vs Category`
* **Heading:** *"How this fund behaved in past downturns"*
* **Interactive Timeline / Chart:**
  * Jan 2020: Baseline
  * Mar–May 2020: Drop of `-12.4%` (highlighted dip)
  * May 2021: Recovery of `+31.2%` over the subsequent 12 months.
* **Key Lesson:** Contextual reminder that equity funds periodically recover from short-term crashes over medium-to-long horizons.

---

### Slide 6: Fund Manager & Strategy Continuity
* **Header:** Back button `←`, *"Fund Manager"*
* **Profile Section:**
  * Manager avatar & status: *"Same fund manager | Managing since May 2019 (5+ years) ✓"*
* **Performance Comparison Chart (1Y / 3Y / 5Y):**
  * Shows *This Fund* (+12.4% 3Y) outperforming *Category Average* (+10.1% 3Y).
* **Takeaway Note:** Confirms that fund governance, philosophy, and management remain stable.

---

### Slide 7: Fund Health Summary & Key Takeaways (Proprietary Cohort Intelligence Moat)
* **Header:** Back button `←`, *"Fund Health Summary"*
* **Health Badge:** Shield icon with green checkmark: *"Fund is healthy – No significant changes in manager, strategy, cost or holdings."*
* **Checklist of Key Takeaways:**
  * ✓ Decline mainly due to broader market movement (-2.6%)
  * ✓ No change in fund manager or investment strategy
  * ✓ Expense ratio unchanged (1.10%)
  * ✓ Portfolio changes are within normal historical variance
  * ✓ **81% of Groww SIP investors in this fund continued investing through the last market dip** (★ **Cohort Intelligence Moat**)
* **Cohort Intelligence Card (Proprietary Network Moat):**
  * Headline: *"What other Groww investors in this fund did during the last market dip (Feb 2025)"*
  * Segments: `81% continued their SIP` | `12% paused temporarily` | `7% stopped`
  * Sample size verification: `Based on 1,24,000 Groww investors in this fund`
* **Empowering Conclusion:** Reassures the user through factual peer behavior without advising rash exits or providing illegal return guarantees.

---

## 5. Regulatory, Compliance & Ethical Guardrails

As specified in the Product Requirements (`Problem STataemnt.txt`), the MVP must strictly observe:
1. **No Guaranteed Returns:** Accumulating more units must never be framed as guaranteed future profit.
2. **Neutral Education:** Tone must remain factual and educational rather than coercive or high-pressure.
3. **No Advice/Recommendation to Buy or Sell:** Educate on mechanics; do not nudge users to invest beyond their financial means.
4. **Investor Autonomy:** Investors must retain full freedom to pause, stop, or adjust their SIPs.

---

## 6. Implementation Strategy & Phasing

* **Step 1: Slide-by-Slide Verification (Current Focus):**
  * Build each screen component in isolation with high-fidelity Groww styling.
  * Allows detailed visual, copy, and layout inspection against `Canva SOlution.pdf`.
* **Step 2: Unified Mobile Experience:**
  * Combine the slides into a responsive, seamless single-page scrolling prototype with:
    * Interactive navigation (clicking cards opens detail screens or scrolls to sections).
    * Switchable view modes (Slide Presentation Mode vs. Long Scrolling App Mode).
* **Step 3: User Revisions:**
  * Implement user's upcoming slide modifications and custom tweaks on the working baseline.

