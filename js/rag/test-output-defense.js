// Groww Portfolio Understanding MVP - Phase 5 Multi-Layer Output Defense Test Suite
// Verifies Layer 1 Fast Regex, Layer 2 Number Verifier, Layer 3 Entailment Gate, and Layer 4 Compliance Sampling.

(function () {
  const isNode = typeof module !== "undefined" && module.exports;

  function getModule(name, globalName) {
    if (isNode) {
      try { return require(`./${name}.js`); } catch (e) {}
    }
    if (typeof window !== "undefined" && window[globalName]) {
      return window[globalName];
    }
    return null;
  }

  const GROWW_EVAL_ENGINE = getModule("eval-engine", "GROWW_EVAL_ENGINE");
  const GROWW_MATH_ENGINE = getModule("math-engine", "GROWW_MATH_ENGINE");
  const GROWW_KNOWLEDGE_STORE = getModule("knowledge-store", "GROWW_KNOWLEDGE_STORE");

  const ledger = GROWW_KNOWLEDGE_STORE.getLedger("sbi-large-midcap");
  const mathData = GROWW_MATH_ENGINE.computePortfolioMath(ledger);
  const sa = GROWW_KNOWLEDGE_STORE.getStructuredAttribution("sbi-large-midcap");

  const validContextBundle = {
    frozenMath: {
      invested: mathData.totalInvested,
      currentValue: mathData.currentValue,
      drawdownPct: mathData.totalReturnsPct,
      units: mathData.totalUnits,
      avgNav: mathData.avgPurchaseNav,
      bonusUnitsPct: mathData.constantNavScenario.bonusUnitsPct,
      benchmarkDrawdownPct: mathData.benchmarkComparison.benchmarkDrawdownPct,
      nifty50DrawdownPct: mathData.benchmarkComparison.nifty50DrawdownPct
    },
    structuredAttribution: sa,
    retrievedChunks: GROWW_KNOWLEDGE_STORE.getChunksForFund("sbi-large-midcap")
  };

  const tests = [
    {
      name: "Layer 1 intercepts prescriptive advisory verb 'you should sell'",
      fn: () => {
        const result = GROWW_EVAL_ENGINE.verifyLayer1Regex("Given the loss, you should sell your mutual fund units.");
        if (result.passed !== false) throw new Error("Expected Layer 1 to fail on advisory verb");
        if (!result.violations.some(v => v.type === "ADVISORY_PATTERN_DETECTED")) throw new Error("Expected advisory violation type");
      }
    },
    {
      name: "Layer 1 intercepts guaranteed return promises",
      fn: () => {
        const result = GROWW_EVAL_ENGINE.verifyLayer1Regex("The market will definitely recover next month, guaranteeing returns.");
        if (result.passed !== false) throw new Error("Expected Layer 1 to fail on guarantee");
        if (!result.violations.some(v => v.type === "ADVISORY_PATTERN_DETECTED")) throw new Error("Expected advisory violation type");
      }
    },
    {
      name: "Layer 1b intercepts ungrounded single-stock causality claims",
      fn: () => {
        const result = GROWW_EVAL_ENGINE.verifyLayer1Regex("HDFC Bank caused the loss in your mutual fund portfolio.");
        if (result.passed !== false) throw new Error("Expected Layer 1b to fail on single-stock blame");
        if (!result.violations.some(v => v.type === "HOLDINGS_CAUSALITY_VIOLATION")) throw new Error("Expected causality violation type");
      }
    },
    {
      name: "Layer 2 approves text containing exact frozen math and attribution numbers",
      fn: () => {
        const validText = "Invested ₹3,000 with current value ₹2,749 (-8.36%). You hold 4.74 units at avg NAV ₹633.10 with 31.4% BFSI allocation.";
        const result = GROWW_EVAL_ENGINE.verifyLayer2Numbers(validText, validContextBundle.frozenMath, validContextBundle.structuredAttribution, validContextBundle);
        if (result.passed !== true) throw new Error("Expected Layer 2 to pass valid numbers");
        if (result.discrepancies.length !== 0) throw new Error("Expected zero discrepancies");
      }
    },
    {
      name: "Layer 2 rejects fabricated financial numbers not in frozen math",
      fn: () => {
        const rogueText = "Your current portfolio value is ₹1,850 and you accumulated 9.42 units.";
        const result = GROWW_EVAL_ENGINE.verifyLayer2Numbers(rogueText, validContextBundle.frozenMath, validContextBundle.structuredAttribution, validContextBundle);
        if (result.passed !== false) throw new Error("Expected Layer 2 to fail on fabricated numbers");
        if (result.discrepancies.length === 0) throw new Error("Expected discrepancies to be recorded");
      }
    },
    {
      name: "Layer 3 entails valid factsheet citations",
      fn: () => {
        const candidate = {
          headline: "Fund Performance Context",
          explanationHtml: "Banking and Financial Services sector margin compression and foreign capital outflows."
        };
        const result = GROWW_EVAL_ENGINE.verifyLayer3Entailment(candidate, validContextBundle);
        if (result.groundednessScore < 90) throw new Error("Expected groundedness score >= 90");
        if (result.passed !== true) throw new Error("Expected Layer 3 to pass");
      }
    },
    {
      name: "Layer 4 enqueues fallback triggers for human compliance audit",
      fn: () => {
        GROWW_EVAL_ENGINE.clearComplianceReviewQueue();
        const fallbackResponse = {
          traceId: "tr_test_fallback_01",
          status: "SAFE_FALLBACK_TRIGGERED",
          headline: "SEBI Regulatory Guardrail Triggered",
          complianceDisclaimer: "Refusal to provide advisory recommendations under SEBI RIA regulations."
        };
        GROWW_EVAL_ENGINE.evaluate(fallbackResponse, validContextBundle, "Should I stop my SIP?");
        const queue = GROWW_EVAL_ENGINE.getComplianceReviewQueue();
        if (queue.length === 0) throw new Error("Compliance queue must record fallback");
        if (queue[0].auditTrigger !== "FALLBACK_DISCLOSURE") throw new Error("Expected trigger FALLBACK_DISCLOSURE");
        if (queue[0].traceId !== "tr_test_fallback_01") throw new Error("Expected traceId to match");
      }
    },
    {
      name: "Layer 4 enqueues quality gate rejected candidate outputs",
      fn: () => {
        GROWW_EVAL_ENGINE.clearComplianceReviewQueue();
        const rogueResponse = {
          traceId: "tr_test_rogue_01",
          status: "GROUNDED_SUCCESS",
          headline: "You should sell your units immediately to avoid further loss."
        };
        const evalResult = GROWW_EVAL_ENGINE.evaluate(rogueResponse, validContextBundle, "What should I do?");
        if (evalResult.passed !== false) throw new Error("Expected evaluation to fail");
        const queue = GROWW_EVAL_ENGINE.getComplianceReviewQueue();
        if (queue.length === 0) throw new Error("Expected rejection in queue");
        if (queue[0].auditTrigger !== "REJECTED_QUALITY_GATE") throw new Error("Expected trigger REJECTED_QUALITY_GATE");
      }
    },
    {
      name: "End-to-End evaluate() approves compliant response with 100% scores",
      fn: () => {
        const compliantResponse = {
          traceId: "tr_test_compliant_01",
          status: "GROUNDED_SUCCESS",
          headline: "Your fund experienced sectoral margin compression while your SIP continued:",
          explanationHtml: "<p>Total invested is ₹3,000, current value is ₹2,749 (-8.36%). The fund allocates 31.4% to Banking & Financial Services.</p>",
          complianceDisclaimer: "Educational analytics only. Not investment advice."
        };
        const evalResult = GROWW_EVAL_ENGINE.evaluate(compliantResponse, validContextBundle, "Why is my fund down?");
        if (evalResult.passed !== true) throw new Error("Expected compliant response to pass");
        if (evalResult.advisoryRiskScore !== 0) throw new Error("Expected advisory risk = 0");
        if (evalResult.factualAccuracyScore !== 100) throw new Error("Expected factual accuracy = 100");
        if (evalResult.groundednessScore < 90) throw new Error("Expected groundedness >= 90");
      }
    }
  ];

  function runAllTests() {
    console.log("================================================================================");
    console.log("  PHASE 5 TEST SUITE: MULTI-LAYER OUTPUT DEFENSE & EVALUATION ENGINE");
    console.log("================================================================================");

    let passed = 0;
    const results = [];

    tests.forEach((t, i) => {
      try {
        t.fn();
        passed++;
        console.log(`  [PASS] Test ${(i + 1).toString().padStart(2, "0")}: ${t.name}`);
        results.push({ name: t.name, passed: true });
      } catch (err) {
        console.error(`  [FAIL] Test ${(i + 1).toString().padStart(2, "0")}: ${t.name} -> ${err.message}`);
        results.push({ name: t.name, passed: false, error: err.message });
      }
    });

    console.log("================================================================================");
    console.log(`  PHASE 5 TEST RESULTS: ${passed} / ${tests.length} PASSED (${Math.round((passed / tests.length) * 100)}%)`);
    console.log("================================================================================\n");

    return {
      total: tests.length,
      passed,
      failed: tests.length - passed,
      verdict: passed === tests.length ? "PASSED" : "FAILED",
      results
    };
  }

  if (isNode) {
    const summary = runAllTests();
    if (summary.failed > 0) process.exit(1);
    module.exports = { runAllTests };
  } else {
    window.GROWW_OUTPUT_DEFENSE_TESTS = { runAllTests };
  }
})();
