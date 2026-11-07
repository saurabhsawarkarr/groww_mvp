// Groww Portfolio Understanding MVP - Phase 8 Canary Router & Business Retention Test Suite
// Verifies 5% Canary Cohort allocation, demographic eligibility, kill switch, and 12-month active retention metrics.

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

  const GROWW_CANARY_ROUTER = getModule("canary-router", "GROWW_CANARY_ROUTER");
  const GROWW_RETENTION_METRICS = getModule("retention-metrics", "GROWW_RETENTION_METRICS");

  const tests = [
    {
      name: "Target demographic filter identifies eligible first-time investors with drawdown",
      fn: () => {
        const eligibleUser = {
          userId: "usr_rahul_sharma",
          tenureMonths: 3,
          totalReturnsPct: -8.37,
          isFirstTimeInvestor: true
        };
        const eligibility = GROWW_CANARY_ROUTER.evaluateCanaryEligibility(eligibleUser);
        if (!eligibility.isEligible) throw new Error("Expected user to be eligible");
        if (!eligibility.criteriaChecks.tenureMatch.passed) throw new Error("Expected tenure check to pass");
        if (!eligibility.criteriaChecks.lossMatch.passed) throw new Error("Expected loss check to pass");

        const ineligibleUserProfit = {
          userId: "usr_priya",
          tenureMonths: 3,
          totalReturnsPct: +4.5,
          isFirstTimeInvestor: true
        };
        if (GROWW_CANARY_ROUTER.evaluateCanaryEligibility(ineligibleUserProfit).isEligible !== false) {
          throw new Error("Expected user with positive returns to be ineligible");
        }

        const ineligibleUserTenure = {
          userId: "usr_vikram",
          tenureMonths: 18,
          totalReturnsPct: -5.0,
          isFirstTimeInvestor: false
        };
        if (GROWW_CANARY_ROUTER.evaluateCanaryEligibility(ineligibleUserTenure).isEligible !== false) {
          throw new Error("Expected non-first-time investor to be ineligible");
        }
      }
    },
    {
      name: "Deterministic hashing maps the same userId to identical buckets repeatedly",
      fn: () => {
        const bucket1 = GROWW_CANARY_ROUTER.hashStringToBucket("EXP:usr_rahul_sharma");
        const bucket2 = GROWW_CANARY_ROUTER.hashStringToBucket("EXP:usr_rahul_sharma");
        const bucket3 = GROWW_CANARY_ROUTER.hashStringToBucket("EXP:usr_rahul_sharma");
        if (bucket1 !== bucket2 || bucket2 !== bucket3) throw new Error("Bucket mapping must be deterministic");
        if (bucket1 < 0 || bucket1 >= 10000) throw new Error("Bucket out of bounds");
      }
    },
    {
      name: "Canary Router assigns eligible users to either 5% treatment or control cohort",
      fn: () => {
        const route = GROWW_CANARY_ROUTER.routeUser({
          userId: "usr_rahul_sharma",
          tenureMonths: 3,
          totalReturnsPct: -8.37
        });
        if (route.cohort !== "CANARY_TREATMENT_5PCT" && route.cohort !== "CONTROL_GROUP_95PCT") {
          throw new Error(`Unexpected cohort: ${route.cohort}`);
        }
        if (route.canaryThreshold !== 500) throw new Error("Expected threshold 500");
      }
    },
    {
      name: "Emergency kill switch immediately diverts all traffic to control group",
      fn: () => {
        GROWW_CANARY_ROUTER.setKillSwitch(true);
        const route = GROWW_CANARY_ROUTER.routeUser({
          userId: "usr_rahul_sharma",
          tenureMonths: 3,
          totalReturnsPct: -8.37
        });
        if (route.cohort !== "CONTROL_GROUP_95PCT") throw new Error("Kill switch must divert to control group");
        if (route.isCanaryActive !== false) throw new Error("isCanaryActive must be false");
        GROWW_CANARY_ROUTER.setKillSwitch(false); // Reset
      }
    },
    {
      name: "Simulation models 12-Month Active SIP Retention lift (+12.4% lift, p < 0.0001)",
      fn: () => {
        const analysis = GROWW_RETENTION_METRICS.getSimulatedCohortAnalysis();
        if (analysis.sampleSizePerCohort !== 10000) throw new Error("Expected sample size 10000");
        if (analysis.controlGroup.activeSipRetention12M !== 62.4) throw new Error("Expected control retention 62.4%");
        if (analysis.treatmentGroup.activeSipRetention12M !== 74.8) throw new Error("Expected treatment retention 74.8%");
        if (analysis.statisticalSignificance.absoluteRetentionLiftPct !== 12.4) throw new Error("Expected lift 12.4%");
      }
    },
    {
      name: "Simulation models -59.8% reduction in avoidable panic-induced SIP interruptions",
      fn: () => {
        const analysis = GROWW_RETENTION_METRICS.getSimulatedCohortAnalysis();
        if (analysis.controlGroup.avoidableSipPauseRate !== 28.1) throw new Error("Expected control pause 28.1%");
        if (analysis.treatmentGroup.avoidableSipPauseRate !== 11.3) throw new Error("Expected treatment pause 11.3%");
        if (analysis.statisticalSignificance.avoidablePauseReductionPct !== -59.8) throw new Error("Expected -59.8% reduction");
      }
    },
    {
      name: "Telemetry event logger records user interactions and computes live engagement KPIs",
      fn: () => {
        GROWW_RETENTION_METRICS.clearEvents();
        GROWW_RETENTION_METRICS.trackEvent("usr_rahul", "CARD_IMPRESSION");
        GROWW_RETENTION_METRICS.trackEvent("usr_rahul", "CARD_CLICK");
        GROWW_RETENTION_METRICS.trackEvent("usr_rahul", "UNIT_ACCUMULATION_VIEW");
        GROWW_RETENTION_METRICS.trackEvent("usr_rahul", "AI_QUERY_ASKED", { query: "Why is my fund down?" });

        const kpis = GROWW_RETENTION_METRICS.getAggregatedKPIs();
        if (kpis.totalRecordedEvents !== 4) throw new Error("Expected 4 events");
        if (kpis.totalQueriesProcessed !== 1) throw new Error("Expected 1 query");
        if (kpis.cardCTR !== "100%") throw new Error("Expected 100% CTR");
      }
    }
  ];

  function runAllTests() {
    console.log("================================================================================");
    console.log("  PHASE 8 TEST SUITE: CANARY ROUTER & BUSINESS RETENTION METRICS");
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
    console.log(`  PHASE 8 TEST RESULTS: ${passed} / ${tests.length} PASSED (${Math.round((passed / tests.length) * 100)}%)`);
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
    window.GROWW_CANARY_TESTS = { runAllTests };
  }
})();
