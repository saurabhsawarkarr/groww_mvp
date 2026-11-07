// Groww Portfolio Understanding MVP - Phase 4 Attribution & Grounded Generation Test Suite
// Verifies Structured Attribution Contract (Brinson-Fachler), Prompt Assembler, and Holdings != Causality Safeguard.

(function () {
  const isNode = typeof module !== "undefined" && module.exports;

  function getModule(name, globalName) {
    if (isNode) {
      try { return require(`./${name}.js`); } catch (e) { }
    }
    if (typeof window !== "undefined" && window[globalName]) {
      return window[globalName];
    }
    return null;
  }

  const GROWW_KNOWLEDGE_STORE = getModule("knowledge-store", "GROWW_KNOWLEDGE_STORE");
  const GROWW_MATH_ENGINE = getModule("math-engine", "GROWW_MATH_ENGINE");
  const GROWW_RAG_GENERATOR = getModule("rag-generator", "GROWW_RAG_GENERATOR");
  const GROWW_PRE_GUARDRAILS = getModule("guardrails-pre", "GROWW_PRE_GUARDRAILS");

  const tests = [
    {
      name: "Structured Attribution Schema adheres to Brinson-Fachler contract",
      fn: () => {
        const sa = GROWW_KNOWLEDGE_STORE.getStructuredAttribution("sbi-large-midcap");
        if (!sa) throw new Error("Structured attribution data must exist");
        if (sa.methodology !== "Brinson-Fachler") throw new Error("Methodology must be Brinson-Fachler");
        if (sa.asOfDate !== "2026-10-31") throw new Error("As-of date must be verified monthly filing");
        if (typeof sa.macroAttribution.netContributionPct !== "number") throw new Error("Macro attribution must be numeric");
        if (!Array.isArray(sa.sectorAttribution)) throw new Error("Sector attribution must be an array");
        if (sa.singleStockAttributionAvailable !== false) throw new Error("Single stock attribution must be false");
        if (typeof sa.unattributedResidualPct !== "number") throw new Error("Unattributed residual must be numeric");
      }
    },
    {
      name: "Attribution factor components sum up to total portfolio drawdown (-8.37%)",
      fn: () => {
        const sa = GROWW_KNOWLEDGE_STORE.getStructuredAttribution("sbi-large-midcap");
        const macroPct = sa.macroAttribution.netContributionPct; // -2.60
        const bfsiSector = sa.sectorAttribution.find(s => s.sector.includes("BFSI"));
        const bfsiPct = bfsiSector ? bfsiSector.contributionPct : 0; // -4.10
        const residualPct = sa.unattributedResidualPct; // -1.67
        const totalAttributed = parseFloat((macroPct + bfsiPct + residualPct).toFixed(2));
        if (totalAttributed !== -8.37) throw new Error(`Factor sum must equal -8.37%, got ${totalAttributed}%`);
      }
    },
    {
      name: "Prompt Assembler produces structured prompt with XML isolation and anchors",
      fn: () => {
        const ledger = GROWW_KNOWLEDGE_STORE.getLedger("sbi-large-midcap");
        const mathData = GROWW_MATH_ENGINE.computePortfolioMath(ledger);
        const intent = GROWW_PRE_GUARDRAILS.inspectQuery("Why is my fund down?");
        const prompt = GROWW_RAG_GENERATOR.assemblePrompt("sbi-large-midcap", "Why is my fund down?", intent, mathData);

        if (!prompt.includes("SYSTEM INSTRUCTIONS:")) throw new Error("Prompt must include system instructions");
        if (!prompt.includes("<temporal_context>")) throw new Error("Prompt must enclose temporal context");
        if (!prompt.includes("<frozen_math_anchors>")) throw new Error("Prompt must enclose frozen math anchors");
        if (!prompt.includes("<structured_attribution")) throw new Error("Prompt must enclose structured attribution");
        if (!prompt.includes("<untrusted_evidence")) throw new Error("Prompt must enclose untrusted evidence");
        if (!prompt.includes("HOLDINGS != CAUSALITY SAFEGUARD")) throw new Error("Prompt must include Holdings != Causality directive");
        if (!prompt.includes(String(mathData.currentValue))) throw new Error("Prompt must include exact currentValue");
        if (!prompt.includes("4.74")) throw new Error("Prompt must include exact units 4.74");
      }
    },
    {
      name: "All fund schemes have singleStockAttributionAvailable set to false",
      fn: () => {
        const sbiSa = GROWW_KNOWLEDGE_STORE.getStructuredAttribution("sbi-large-midcap");
        const ppfasSa = GROWW_KNOWLEDGE_STORE.getStructuredAttribution("parag-parikh-flexi-cap");
        if (sbiSa.singleStockAttributionAvailable !== false) throw new Error("SBI fund single stock attribution must be false");
        if (ppfasSa.singleStockAttributionAvailable !== false) throw new Error("PPFAS fund single stock attribution must be false");
      }
    },
    {
      name: "Query blaming HDFC Bank triggers non-causal attribution safeguard",
      fn: () => {
        const ledger = GROWW_KNOWLEDGE_STORE.getLedger("sbi-large-midcap");
        const mathData = GROWW_MATH_ENGINE.computePortfolioMath(ledger);
        const intent = GROWW_PRE_GUARDRAILS.inspectQuery("Is my fund down because HDFC Bank fell?");
        if (intent.intentCategory !== "FACTUAL_STOCK_ATTRIBUTION_SAFEGUARD") throw new Error("Must classify intent as safeguard");

        const response = GROWW_RAG_GENERATOR.generate("sbi-large-midcap", "Is my fund down because HDFC Bank fell?", intent, mathData, "tr_phase4_05");
        if (response.status !== "GROUNDED_SUCCESS") throw new Error("Response status must be GROUNDED_SUCCESS");
        if (!response.badge.text.includes("Attribution Safeguard")) throw new Error("Badge must indicate attribution safeguard");
        if (!response.explanationHtml.includes("31.4% allocation to Banking & Financial Services")) throw new Error("Must cite sector allocation");
        if (!response.explanationHtml.includes("cannot be attributed to a specific individual company")) throw new Error("Must refuse single stock blame");
      }
    },
    {
      name: "Response strictly distinguishes holdings allocation from performance attribution",
      fn: () => {
        const ledger = GROWW_KNOWLEDGE_STORE.getLedger("sbi-large-midcap");
        const mathData = GROWW_MATH_ENGINE.computePortfolioMath(ledger);
        const intent = GROWW_PRE_GUARDRAILS.inspectQuery("Is my fund down because HDFC Bank fell?");
        const response = GROWW_RAG_GENERATOR.generate("sbi-large-midcap", "Is my fund down because HDFC Bank fell?", intent, mathData, "tr_phase4_06");

        if (!response.explanationHtml.includes("What the fund invests in:")) throw new Error("Must have section for what fund invests in");
        if (!response.explanationHtml.includes("Verified Sector Performance Attribution:")) throw new Error("Must have verified sector attribution section");
        if (!response.explanationHtml.includes("Attribution Safeguard:")) throw new Error("Must have attribution safeguard section");
      }
    },
    {
      name: "Parag Parikh Flexi Cap attribution contains global tech and currency factors",
      fn: () => {
        const ppfasSa = GROWW_KNOWLEDGE_STORE.getStructuredAttribution("parag-parikh-flexi-cap");
        if (ppfasSa.macroAttribution.netContributionPct !== -3.20) throw new Error("PPFAS macro net contribution must be -3.20%");
        const techSector = ppfasSa.sectorAttribution.find(s => s.sector.includes("Global Internet"));
        if (!techSector) throw new Error("Global tech sector must exist in PPFAS attribution");
        if (techSector.allocationPct !== 16.2) throw new Error("Global tech allocation must be 16.2%");
        if (techSector.contributionPct !== -3.50) throw new Error("Global tech contribution must be -3.50%");
      }
    },
    {
      name: "Context bundle contains both frozenMath and structuredAttribution",
      fn: () => {
        const ledger = GROWW_KNOWLEDGE_STORE.getLedger("sbi-large-midcap");
        const mathData = GROWW_MATH_ENGINE.computePortfolioMath(ledger);
        const intent = GROWW_PRE_GUARDRAILS.inspectQuery("Why is my fund down?");
        const bundle = GROWW_RAG_GENERATOR.buildContextBundle("sbi-large-midcap", "Why is my fund down?", intent, mathData);

        if (!bundle.frozenMath) throw new Error("Context bundle must contain frozenMath");
        if (bundle.frozenMath.units !== 4.74) throw new Error("Frozen math units must match 4.74");
        if (bundle.frozenMath.avgNav !== 633.10) throw new Error("Frozen math avgNav must match 633.10");
        if (!bundle.structuredAttribution) throw new Error("Context bundle must contain structuredAttribution");
        if (bundle.structuredAttribution.methodology !== "Brinson-Fachler") throw new Error("Attribution methodology must be Brinson-Fachler");
      }
    }
  ];

  function runAllTests() {
    console.log("================================================================================");
    console.log("  PHASE 4 TEST SUITE: STRUCTURED ATTRIBUTION & GROUNDED GENERATION");
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
    console.log(`  PHASE 4 TEST RESULTS: ${passed} / ${tests.length} PASSED (${Math.round((passed / tests.length) * 100)}%)`);
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
    window.GROWW_ATTRIBUTION_TESTS = { runAllTests };
  }
})();
