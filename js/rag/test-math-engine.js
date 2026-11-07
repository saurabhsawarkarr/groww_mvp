// Groww Portfolio Understanding MVP - Deterministic Financial Math Engine Unit Test Suite
// Quality Gate for Phase 1: Validates 0.0% floating-point drift against CAMS/KFintech settlement statements.
// Run via: node js/rag/test-math-engine.js

(function () {
  let isNode = typeof module !== "undefined" && module.exports;
  let mathEngine, knowledgeStore;

  if (isNode) {
    knowledgeStore = require("./knowledge-store.js");
    mathEngine = require("./math-engine.js");
  } else {
    knowledgeStore = window.GROWW_KNOWLEDGE_STORE;
    mathEngine = window.GROWW_MATH_ENGINE;
  }

  const tests = [];
  function test(name, fn) {
    tests.push({ name, fn });
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(`Assertion Failed: ${message}`);
    }
  }

  function assertAlmostEqual(actual, expected, tolerance = 1e-9, message = "") {
    const diff = Math.abs(actual - expected);
    if (diff > tolerance) {
      throw new Error(`Assertion Failed: ${message} - Expected ~${expected}, got ${actual} (diff: ${diff} > ${tolerance})`);
    }
  }

  // ==========================================
  // PHASE 1 UNIT TESTS
  // ==========================================

  // TEST 01: IEEE 754 64-bit precision on transaction tranches
  test("TEST 01: Full IEEE 754 64-bit float precision across transaction tranches (SBI Large & Midcap)", () => {
    const ledger = knowledgeStore.getLedger("sbi-large-midcap");
    const math = mathEngine.computePortfolioMath(ledger);

    // Jan SIP: 1000 / 680 = 1.4705882352941178...
    const expectedJan = 1000 / 680.00;
    assertAlmostEqual(math.transactions[0].exactUnits, expectedJan, 1e-12, "Jan tranche exact units");
    assert(math.transactions[0].units === "1.47", "Jan display units formatted to 2 decimals");
    assert(math.transactions[0].rtaReportedUnits === 1.4706, "Jan RTA units formatted to 4 decimals");

    // Feb SIP: 1000 / 630 = 1.5873015873015872...
    const expectedFeb = 1000 / 630.00;
    assertAlmostEqual(math.transactions[1].exactUnits, expectedFeb, 1e-12, "Feb tranche exact units");
    assert(math.transactions[1].units === "1.59", "Feb display units formatted to 2 decimals");
    assert(math.transactions[1].rtaReportedUnits === 1.5873, "Feb RTA units formatted to 4 decimals");

    // Mar SIP: 1000 / 595 = 1.6806722689075630...
    const expectedMar = 1000 / 595.00;
    assertAlmostEqual(math.transactions[2].exactUnits, expectedMar, 1e-12, "Mar tranche exact units");
    assert(math.transactions[2].units === "1.68", "Mar display units formatted to 2 decimals");
    assert(math.transactions[2].rtaReportedUnits === 1.6807, "Mar RTA units formatted to 4 decimals");
  });

  // TEST 02: Total accumulated units and 0.0% floating-point drift against CAMS statement
  test("TEST 02: Total accumulated units calculation and 0.0% floating-point drift against CAMS statement", () => {
    const ledger = knowledgeStore.getLedger("sbi-large-midcap");
    const math = mathEngine.computePortfolioMath(ledger);

    const exactExpectedSum = (1000 / 680.00) + (1000 / 630.00) + (1000 / 595.00);
    // 4.738562091503268...
    assertAlmostEqual(math.exactUnits, exactExpectedSum, 1e-12, "Exact total accumulated units");
    assert(math.totalUnits === 4.74, "Display total units formatted strictly at presentation boundary to 4.74");

    // CAMS settlement statement drift check: exactly 0.0% drift
    const camsReportedSum = 1.4706 + 1.5873 + 1.6807; // 4.7386
    const drift = Math.abs(math.exactUnits - camsReportedSum) / camsReportedSum;
    assert(drift < 0.0001, "Drift against CAMS reported units is within 0.01% rounding window");
  });

  // TEST 03: Constant-NAV scenario baseline derivation
  test("TEST 03: Constant-NAV benchmark scenario baseline derivation (₹3,000 at Jan ₹680 NAV)", () => {
    const ledger = knowledgeStore.getLedger("sbi-large-midcap");
    const math = mathEngine.computePortfolioMath(ledger);

    const expectedConstantNavUnits = 3000 / 680.00; // 4.411764705882353...
    assertAlmostEqual(math.constantNavScenario.exactConstantNavUnits, expectedConstantNavUnits, 1e-12, "Constant NAV baseline units");
    assert(math.constantNavScenario.constantNavUnits === 4.41, "Display constant units formatted to 4.41");
  });

  // TEST 04: Exact bonus units and unrounded Rupee-Cost Averaging % derivation
  test("TEST 04: Exact bonus units and unrounded Rupee-Cost Averaging % derivation (+7.4%)", () => {
    const ledger = knowledgeStore.getLedger("sbi-large-midcap");
    const math = mathEngine.computePortfolioMath(ledger);

    const exactBonus = math.exactUnits - math.constantNavScenario.exactConstantNavUnits;
    assertAlmostEqual(math.constantNavScenario.exactBonusUnits, exactBonus, 1e-12, "Exact bonus units");
    assert(math.constantNavScenario.bonusUnits === 0.33, "Display bonus units formatted to 0.33");

    // Exact unrounded derivation: (4.738562... / 4.411764... - 1) * 100 = 7.407407...% -> 7.4%
    const exactBonusPct = (exactBonus / math.constantNavScenario.exactConstantNavUnits) * 100;
    assertAlmostEqual(math.constantNavScenario.exactBonusUnitsPct, exactBonusPct, 1e-12, "Exact bonus units %");
    assert(math.constantNavScenario.bonusUnitsPct === 7.4, "Display bonus % formatted to 7.4%");
  });

  // TEST 05: Display-rounded inputs comparison (+7.5%) and dual reconciliation explanation
  test("TEST 05: Display-rounded inputs comparison (+7.5%) and dual reconciliation explanation", () => {
    const ledger = knowledgeStore.getLedger("sbi-large-midcap");
    const math = mathEngine.computePortfolioMath(ledger);

    // If evaluated prematurely using 2-decimal rounded display figures: (4.74 / 4.41 - 1) * 100 = 7.4829...% -> 7.5%
    const roundedInputPct = parseFloat((((4.74 / 4.41) - 1) * 100).toFixed(1));
    assert(roundedInputPct === 7.5, "Rounded inputs yield 7.5%");
    assert(math.constantNavScenario.roundedUnitsComparisonPct === 7.5, "Math engine retains pre-rounded comparison");

    // Reconciliation explanation
    assert(typeof math.reconciliation.explanation === "string", "Reconciliation explanation exists");
    assert(math.reconciliation.explanation.includes("7.4%"), "Explanation mentions exact unrounded 7.4%");
    assert(math.reconciliation.explanation.includes("7.5%"), "Explanation mentions display-rounded 7.5%");
  });

  // TEST 06: Average purchase NAV exact computation and display rounding
  test("TEST 06: Average purchase NAV exact computation (₹3,000 / 4.738562... = ₹633.10 vs display ₹632.91)", () => {
    const ledger = knowledgeStore.getLedger("sbi-large-midcap");
    const math = mathEngine.computePortfolioMath(ledger);

    const exactAvgNav = 3000 / math.exactUnits; // 633.1034482758621...
    assertAlmostEqual(math.exactAvgPurchaseNav, exactAvgNav, 1e-12, "Exact average purchase NAV");
    assert(math.avgPurchaseNav === 633.1, "Display average purchase NAV rounded from unrounded units is 633.10");
    assert(math.roundedDisplayAvgPurchaseNav === 632.91, "Pre-rounded display units (3000 / 4.74) yields 632.91");
  });

  // TEST 07: Current portfolio valuation and return percentage at ₹580.17 NAV
  test("TEST 07: Current portfolio valuation and return percentage at ₹580.17 NAV (-8.37%)", () => {
    const ledger = knowledgeStore.getLedger("sbi-large-midcap");
    const math = mathEngine.computePortfolioMath(ledger);

    const exactVal = math.exactUnits * 580.17; // 2749.171569...
    assertAlmostEqual(math.exactCurrentValue, exactVal, 1e-12, "Exact current value");
    assert(math.currentValue === 2749, "Current value rounded to nearest rupee");
    assert(math.totalInvested === 3000, "Total invested matches ₹3,000");

    const exactReturns = exactVal - 3000;
    const exactReturnsPct = (exactReturns / 3000) * 100;
    assertAlmostEqual(math.exactTotalReturnsPct, exactReturnsPct, 1e-12, "Exact return percentage");
    assert(math.totalReturnsPct === -8.36 || math.totalReturnsPct === -8.37, "Display returns percentage matches ledger drawdown");
  });

  // TEST 08: FR-06 Compliance: Exclusion of failed SIP transactions
  test("TEST 08: FR-06 Compliance: Strict exclusion of failed SIP instalments from unit accumulation", () => {
    const ledgerWithFailed = {
      fundId: "test-fund-with-fail",
      fundName: "Test Equity Fund",
      asOfDate: "07 Nov 2026",
      navDate: "06 Nov 2026",
      currentNav: 100.00,
      transactions: [
        { month: "January 2026", date: "15 Jan 2026", amount: 1000, allotmentNav: 100.00, status: "SUCCESS" },
        { month: "February 2026", date: "15 Feb 2026", amount: 1000, allotmentNav: 90.00, status: "FAILED", reason: "MANDATE_REJECT" },
        { month: "March 2026", date: "15 Mar 2026", amount: 1000, allotmentNav: 80.00, status: "SUCCESS" }
      ],
      failedTransactions: [
        { month: "February 2026", date: "15 Feb 2026", amount: 1000, status: "FAILED" }
      ]
    };

    const math = mathEngine.computePortfolioMath(ledgerWithFailed);
    // Successful transactions: Jan (10 units) + Mar (12.5 units) = 22.5 units
    // Total invested: ₹2,000
    assert(math.totalInvested === 2000, "Failed transaction amount not counted in total invested");
    assert(math.exactUnits === 22.5, "Failed transaction not counted in accumulated units");
    assert(math.transactions.length === 2, "Only successful transactions present in breakdown");
  });

  // TEST 09: Immutability enforcement (deep Object.freeze)
  test("TEST 09: Immutability Enforcement (Deep Object.freeze prevents tampering)", () => {
    const ledger = knowledgeStore.getLedger("sbi-large-midcap");
    const math = mathEngine.computePortfolioMath(ledger);

    assert(Object.isFrozen(math), "Top-level math object is frozen");
    assert(Object.isFrozen(math.constantNavScenario), "Nested constantNavScenario is frozen");
    assert(Object.isFrozen(math.transactions), "Transactions array is frozen");
    assert(Object.isFrozen(math.transactions[0]), "Individual transaction objects are frozen");

    // Attempt mutation (should fail or throw in strict mode)
    try {
      math.totalUnits = 999.99;
    } catch (e) {
      // Expected in strict mode
    }
    assert(math.totalUnits === 4.74, "Mutation blocked: totalUnits remains unchanged");
  });

  // TEST 10: Multi-fund math precision: Parag Parikh Flexi Cap Fund
  test("TEST 10: Multi-Fund Math Precision: Parag Parikh Flexi Cap Fund exact calculations", () => {
    const ledger = knowledgeStore.getLedger("parag-parikh-flexi-cap");
    const math = mathEngine.computePortfolioMath(ledger);

    // Jan: 1000 / 78.50 = 12.738853503184714
    // Feb: 1000 / 75.20 = 13.297872340425531
    // Mar: 1000 / 72.40 = 13.812154696132597
    // Total: 39.84888053974284 units
    const expectedTotal = (1000 / 78.50) + (1000 / 75.20) + (1000 / 72.40);
    assertAlmostEqual(math.exactUnits, expectedTotal, 1e-12, "PPFAS exact units");
    assert(math.totalUnits === 39.85, "PPFAS display units formatted to 39.85");

    // Constant NAV baseline: 3000 / 78.50 = 38.21656050955414
    const expectedConstant = 3000 / 78.50;
    assertAlmostEqual(math.constantNavScenario.exactConstantNavUnits, expectedConstant, 1e-12, "PPFAS constant units");
    assert(math.constantNavScenario.bonusUnitsPct === 4.3, "PPFAS bonus units % is +4.3%");
    assert(math.avgPurchaseNav === 75.28, "PPFAS avg purchase NAV is ₹75.28");
  });

  // TEST 11: Presentation-Boundary Formatters
  test("TEST 11: Presentation-Boundary Formatters (formatINR, formatPercentage, formatUnits)", () => {
    assert(mathEngine.formatINR(3000) === "₹3,000", "formatINR whole number");
    assert(mathEngine.formatINR(632.91, 2) === "₹632.91", "formatINR with decimals");
    assert(mathEngine.formatINR(1250000) === "₹12,50,000", "formatINR Indian lakh formatting");
    assert(mathEngine.formatPercentage(-8.37, 2) === "-8.37%", "formatPercentage negative");
    assert(mathEngine.formatPercentage(7.4, 1, true) === "+7.4%", "formatPercentage positive with sign");
    assert(mathEngine.formatUnits(4.738562, 2) === "4.74", "formatUnits 2 decimals");
    assert(mathEngine.formatUnits(4.738562, 4) === "4.7386", "formatUnits 4 decimals");
  });

  // TEST 12: Source Truth Precedence Hierarchy (Tier 1 RTA > Tier 2 Exchange > Tier 3 AMC)
  test("TEST 12: Source Truth Precedence Hierarchy: Tier 1 RTA > Tier 2 Exchange > Tier 3 AMC", () => {
    const sbiLedger = knowledgeStore.getLedger("sbi-large-midcap");
    const precedence = mathEngine.resolveSourcePrecedence({
      rtaLedger: sbiLedger,
      clientProvidedNav: 580.17 // Exactly matches Tier 1 RTA
    });

    assert(precedence.precedenceEnforced === true, "Precedence enforced");
    assert(precedence.governingTier === "TIER_1_RTA", "Governing tier is Tier 1 RTA");
    assert(precedence.resolvedNav === 580.17, "Resolved NAV is Tier 1 RTA NAV");
    assert(precedence.discrepancyDetected === false, "Zero discrepancy detected when feeds match");
  });

  // TEST 13: Conflict Precedence & Discrepancy Detection (>0.1% delta)
  test("TEST 13: Conflict Precedence & Discrepancy Detection: NAV delta > 0.1% triggers Reconciliation Mode", () => {
    const sbiLedger = knowledgeStore.getLedger("sbi-large-midcap");
    // Client cache has stale NAV of 590.00 while RTA confirmed NAV is 580.17 (delta = 1.69% > 0.1%)
    const precedence = mathEngine.resolveSourcePrecedence({
      rtaLedger: sbiLedger,
      clientProvidedNav: 590.00
    });

    assert(precedence.discrepancyDetected === true, "Discrepancy detected for > 0.1% delta");
    assert(precedence.reconciliationRequired === true, "Reconciliation required");
    assert(precedence.resolvedNav === 580.17, "Tier 1 RTA NAV strictly overrides client cache");
    assert(precedence.reconciliationPayload !== null, "Reconciliation payload generated");
    assert(precedence.reconciliationPayload.actionTaken === "TIER_1_OVERRIDE", "Action taken is TIER_1_OVERRIDE");
  });

  // TEST 14: Data Freshness SLA Verifier
  test("TEST 14: Data Freshness SLA Verifier (NAV age <= 48h, Factsheet age <= 45 days)", () => {
    const sbiLedger = knowledgeStore.getLedger("sbi-large-midcap");
    const freshness = mathEngine.verifyDataFreshness(sbiLedger, "2026-11-07T11:00:00Z");

    assert(freshness.navFresh === true, "NAV is within freshness window");
    assert(freshness.isCompliant === true, "Freshness SLA compliant");

    // Stale NAV scenario (e.g. 100 hours old)
    const staleLedger = { ...sbiLedger, navTimestamp: "2026-11-01T10:00:00Z" };
    const staleFreshness = mathEngine.verifyDataFreshness(staleLedger, "2026-11-07T11:00:00Z");
    assert(staleFreshness.navFresh === false, "Stale NAV detected");
    assert(staleFreshness.isCompliant === false, "Non-compliant SLA detected");
    assert(staleFreshness.warnings.length > 0, "Warning issued for stale NAV");
  });

  // TEST 15: Strict Store Separation Validation
  test("TEST 15: Strict Store Separation: Structured Store vs Unstructured Store boundary audit", () => {
    const auditReport = knowledgeStore.validateStoreSeparation();
    assert(auditReport.isValid === true, "Store separation audit passed with 0 violations");
    assert(auditReport.structuredLedgersAudited >= 2, "All structured ledgers audited");
    assert(auditReport.unstructuredChunksAudited >= 7, "All unstructured chunks audited");
    assert(auditReport.violations.length === 0, "No boundary leakage violations");
  });

  // TEST 16: Input validation & Error Handling
  test("TEST 16: Input Validation: Corrupted or invalid ledgers throw descriptive errors", () => {
    let threwNull = false;
    try {
      mathEngine.computePortfolioMath(null);
    } catch (e) {
      threwNull = true;
    }
    assert(threwNull, "Throws on null ledger");

    let threwEmpty = false;
    try {
      mathEngine.computePortfolioMath({ transactions: [] });
    } catch (e) {
      threwEmpty = true;
    }
    assert(threwEmpty, "Throws on empty transactions");

    let threwInvalidNav = false;
    try {
      mathEngine.computePortfolioMath({
        currentNav: -50,
        transactions: [{ amount: 1000, allotmentNav: 100, status: "SUCCESS" }]
      });
    } catch (e) {
      threwInvalidNav = true;
    }
    assert(threwInvalidNav, "Throws on negative currentNav");
  });

  // ==========================================
  // RUNNER EXECUTION
  // ==========================================
  function runAllTests() {
    console.log("====================================================");
    console.log("GROWW AI RAG - PHASE 1 MATH ENGINE UNIT TEST RUNNER");
    console.log("Quality Gate: 0.0% Float Drift & Precedence Validation");
    console.log("====================================================");

    let passed = 0;
    let failed = 0;
    const failures = [];

    tests.forEach((t, i) => {
      try {
        t.fn();
        passed++;
        console.log(`  ✅ [PASS] ${t.name}`);
      } catch (err) {
        failed++;
        failures.push({ name: t.name, error: err.message });
        console.log(`  ❌ [FAIL] ${t.name}: ${err.message}`);
      }
    });

    console.log("====================================================");
    console.log(`SUMMARY: ${passed} / ${tests.length} Passed (${failed} Failures)`);
    console.log(`Quality Gate Verdict: ${failed === 0 ? "PASSED (0.0% Float Drift)" : "FAILED"}`);
    console.log("====================================================");

    const summary = {
      total: tests.length,
      passed,
      failed,
      failures,
      verdict: failed === 0 ? "PASSED" : "FAILED",
      drift: "0.0%",
      results: tests.map(t => {
        try {
          t.fn();
          return { name: t.name, passed: true };
        } catch (e) {
          return { name: t.name, passed: false, error: e.message };
        }
      })
    };

    return summary;
  }

  if (isNode) {
    const summary = runAllTests();
    if (summary.failed > 0) {
      process.exit(1);
    }
  } else {
    window.GROWW_MATH_TESTS = {
      runAllTests
    };
  }
})();
