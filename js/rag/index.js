// Groww Portfolio Understanding MVP - Master RAG Pipeline Orchestrator
// Connects Knowledge Store, Deterministic Math, Pre-Guardrails, Generator, Evaluator, Fallbacks & Audit Logger.

const GROWW_RAG_PIPELINE = (function () {
  function getKnowledgeStore() {
    if (typeof GROWW_KNOWLEDGE_STORE !== "undefined") return GROWW_KNOWLEDGE_STORE;
    if (typeof require !== "undefined") return require("./knowledge-store.js");
    return null;
  }
  function getMathEngine() {
    if (typeof GROWW_MATH_ENGINE !== "undefined") return GROWW_MATH_ENGINE;
    if (typeof require !== "undefined") return require("./math-engine.js");
    return null;
  }
  function getPreGuardrails() {
    if (typeof GROWW_PRE_GUARDRAILS !== "undefined") return GROWW_PRE_GUARDRAILS;
    if (typeof require !== "undefined") return require("./guardrails-pre.js");
    return null;
  }
  function getRagGenerator() {
    if (typeof GROWW_RAG_GENERATOR !== "undefined") return GROWW_RAG_GENERATOR;
    if (typeof require !== "undefined") return require("./rag-generator.js");
    return null;
  }
  function getEvalEngine() {
    if (typeof GROWW_EVAL_ENGINE !== "undefined") return GROWW_EVAL_ENGINE;
    if (typeof require !== "undefined") return require("./eval-engine.js");
    return null;
  }
  function getFallbacks() {
    if (typeof GROWW_FALLBACKS !== "undefined") return GROWW_FALLBACKS;
    if (typeof require !== "undefined") return require("./fallbacks.js");
    return null;
  }
  function getAuditLogger() {
    if (typeof GROWW_AUDIT_LOGGER !== "undefined") return GROWW_AUDIT_LOGGER;
    if (typeof require !== "undefined") return require("./audit-logger.js");
    return null;
  }
  function getSecurityGateway() {
    if (typeof GROWW_SECURITY_GATEWAY !== "undefined") return GROWW_SECURITY_GATEWAY;
    if (typeof require !== "undefined") return require("./security-gateway.js");
    return null;
  }
  function getRetriever() {
    if (typeof GROWW_RAG_RETRIEVER !== "undefined") return GROWW_RAG_RETRIEVER;
    if (typeof require !== "undefined") return require("./rag-retriever.js");
    return null;
  }
  function getGoldenBenchmark() {
    if (typeof GROWW_GOLDEN_BENCHMARK !== "undefined") return GROWW_GOLDEN_BENCHMARK;
    if (typeof require !== "undefined") return require("./eval-benchmark.js");
    return null;
  }
  function getCanaryRouter() {
    if (typeof GROWW_CANARY_ROUTER !== "undefined") return GROWW_CANARY_ROUTER;
    if (typeof require !== "undefined") return require("./canary-router.js");
    return null;
  }
  function getRetentionMetrics() {
    if (typeof GROWW_RETENTION_METRICS !== "undefined") return GROWW_RETENTION_METRICS;
    if (typeof require !== "undefined") return require("./retention-metrics.js");
    return null;
  }
  function getLlmProvider() {
    if (typeof GROWW_LLM_PROVIDER !== "undefined") return GROWW_LLM_PROVIDER;
    if (typeof require !== "undefined") {
      try { return require("./llm-provider.js"); } catch (e) { }
    }
    return null;
  }

  /**
   * Main query processor
   * @param {string} fundId - Fund Identifier (e.g. "sbi-large-midcap")
   * @param {string} query - Raw user question
   * @param {Array} history - Previous conversation messages
   * @param {Object} [options={}] - Optional security session and configuration
   * @returns {Object} SEBI-Compliant, Eval-Gated Response Payload
   */
  function processQuery(fundId = "sbi-large-midcap", query = "Why is my fund down?", history = [], options = {}) {
    const traceId = options.traceId || `tr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const startTime = Date.now();

    const ks = getKnowledgeStore();
    const me = getMathEngine();
    const pg = getPreGuardrails();
    const rg = getRagGenerator();
    const ee = getEvalEngine();
    const fb = getFallbacks();
    const al = getAuditLogger();
    const sg = getSecurityGateway();

    // 0. Authorization & IDOR Check (Section 9.1)
    if (sg && options.sessionToken) {
      const authResult = sg.sanitizeAndAuthorizeRequest({
        fundId,
        query,
        conversationHistory: history,
        sessionToken: options.sessionToken,
        traceId
      });

      if (!authResult.isAuthorized) {
        if (al) {
          al.logInteraction({
            traceId,
            fundId,
            rawQuery: query,
            preGuardrail: { action: "SECURITY_GATEWAY_BLOCKED", riskLevel: "HIGH", guardrailName: "IDOR Prevention" },
            retrievedChunkIds: [],
            frozenMath: null,
            evalMetrics: { groundednessScore: 0, advisoryRiskScore: 0, latencyMs: Date.now() - startTime },
            finalStatus: authResult.denialResponse.status,
            servedHeadline: authResult.denialResponse.headline,
            disclaimerShown: authResult.denialResponse.complianceDisclaimer
          });
        }
        return authResult.denialResponse;
      }
    }

    // 1. Fetch Structured Ledger & Compute Frozen Math
    const ledger = ks.getLedger(fundId);
    const mathData = me.computePortfolioMath(ledger);

    // 2. Pre-LLM Guardrail & Intent Classification (< 5ms)
    const preGuardrail = pg.inspectQuery(query, history);

    let finalResponse;

    // Check Pre-LLM Gate Decisions (Gate 1 Interceptions - 0 Tokens Consumed)
    if (preGuardrail.action === "TRIGGER_TIER_1_REFUSAL") {
      finalResponse = fb.createTier1AdvisoryRefusal(mathData, query, traceId, preGuardrail);
    } else if (preGuardrail.action === "TRIGGER_TIER_1_PREDICTION") {
      finalResponse = fb.createTier1PredictionUncertainty(mathData, query, traceId, preGuardrail);
    } else if (preGuardrail.action === "TRIGGER_TIER_2_CLARIFICATION") {
      finalResponse = fb.createTier2Clarification(mathData, query, traceId);
    } else {
      // 3. Execute Grounded RAG Generator
      const candidateResponse = rg.generate(fundId, query, preGuardrail, mathData, traceId);

      // 4. Post-Generation Evaluation Engine Gate
      const evalVerdict = ee.evaluate(candidateResponse, candidateResponse.contextBundle, query);

      if (evalVerdict.passed) {
        finalResponse = {
          ...candidateResponse,
          evaluationMetrics: {
            groundednessScore: evalVerdict.groundednessScore,
            factualAccuracyScore: evalVerdict.factualAccuracyScore,
            relevanceScore: evalVerdict.relevanceScore,
            advisoryRiskScore: evalVerdict.advisoryRiskScore,
            latencyMs: Date.now() - startTime
          }
        };
      } else {
        // Quality Gate Failed: Route to graceful fallback
        if (evalVerdict.advisoryRiskScore > 0) {
          finalResponse = fb.createTier1AdvisoryRefusal(mathData, query, traceId, preGuardrail);
        } else {
          // Tier 3 Partial Grounding
          const availableFactors = [
            { type: "macro", title: "Macroeconomic Drag", body: "FII net outflows and crude oil volatility." },
            { type: "sector", title: "Sector Exposure", body: "BFSI sector margin compression." }
          ];
          finalResponse = fb.createTier3PartialGrounding(
            mathData,
            availableFactors,
            "Specific individual stock attribution failed strict 95% grounding score and has been omitted.",
            traceId
          );
        }
      }
    }

    // 5. SEBI Telemetry Audit Logging
    if (al) {
      al.logInteraction({
        traceId,
        fundId,
        rawQuery: query,
        preGuardrail,
        retrievedChunkIds: finalResponse.retrievedChunkIds || [],
        frozenMath: mathData,
        evalMetrics: finalResponse.evaluationMetrics,
        finalStatus: finalResponse.status,
        servedHeadline: finalResponse.headline,
        disclaimerShown: finalResponse.complianceDisclaimer
      });
    }

    return finalResponse;
  }

  /**
   * Asynchronous query processor with Live LLM routing (Groq low-token / Gemini deep reasoning / Dual-LLM)
   */
  async function processQueryAsync(fundId = "sbi-large-midcap", query = "Why is my fund down?", history = [], options = {}) {
    const traceId = options.traceId || `tr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const startTime = Date.now();

    const ks = getKnowledgeStore();
    const me = getMathEngine();
    const pg = getPreGuardrails();
    const rg = getRagGenerator();
    const ee = getEvalEngine();
    const fb = getFallbacks();
    const al = getAuditLogger();
    const sg = getSecurityGateway();

    // 0. Authorization & IDOR Check
    if (sg && options.sessionToken) {
      const authResult = sg.sanitizeAndAuthorizeRequest({
        fundId,
        query,
        conversationHistory: history,
        sessionToken: options.sessionToken,
        traceId
      });

      if (!authResult.isAuthorized) {
        if (al) {
          al.logInteraction({
            traceId,
            fundId,
            rawQuery: query,
            preGuardrail: { action: "SECURITY_GATEWAY_BLOCKED", riskLevel: "HIGH", guardrailName: "IDOR Prevention" },
            retrievedChunkIds: [],
            frozenMath: null,
            evalMetrics: { groundednessScore: 0, advisoryRiskScore: 0, latencyMs: Date.now() - startTime },
            finalStatus: authResult.denialResponse.status,
            servedHeadline: authResult.denialResponse.headline,
            disclaimerShown: authResult.denialResponse.complianceDisclaimer
          });
        }
        return authResult.denialResponse;
      }
    }

    // 1. Fetch Structured Ledger & Compute Frozen Math
    const ledger = ks.getLedger(fundId);
    const mathData = me.computePortfolioMath(ledger);

    // 2. Pre-LLM Guardrail & Intent Classification (0 Tokens on Advisory Traps)
    const preGuardrail = pg.inspectQuery(query, history);
    let finalResponse;

    if (preGuardrail.action === "TRIGGER_TIER_1_REFUSAL") {
      finalResponse = fb.createTier1AdvisoryRefusal(mathData, query, traceId, preGuardrail);
    } else if (preGuardrail.action === "TRIGGER_TIER_1_PREDICTION") {
      finalResponse = fb.createTier1PredictionUncertainty(mathData, query, traceId, preGuardrail);
    } else if (preGuardrail.action === "TRIGGER_TIER_2_CLARIFICATION") {
      finalResponse = fb.createTier2Clarification(mathData, query, traceId);
    } else {
      // 3. Execute Live or Grounded Generator
      let candidateResponse;
      if (rg && typeof rg.generateLive === "function" && options.mode !== "deterministic") {
        candidateResponse = await rg.generateLive(fundId, query, preGuardrail, mathData, traceId, options);
      } else {
        candidateResponse = rg.generate(fundId, query, preGuardrail, mathData, traceId);
      }

      // 4. Post-Generation Evaluation Engine Gate
      const evalVerdict = ee.evaluate(candidateResponse, candidateResponse.contextBundle, query);

      // Dual-LLM Critic check if requested
      let criticResult = null;
      const llmProv = getLlmProvider();
      if (options.mode === "dual" && llmProv) {
        try {
          criticResult = await llmProv.auditWithCritic(
            candidateResponse.explanationHtml,
            candidateResponse.contextBundle.frozenMath,
            candidateResponse.contextBundle.retrievedChunks
          );
        } catch (e) { }
      }

      const passedAll = evalVerdict.passed && (!criticResult || criticResult.compliant);

      if (passedAll) {
        finalResponse = {
          ...candidateResponse,
          evaluationMetrics: {
            groundednessScore: evalVerdict.groundednessScore,
            factualAccuracyScore: evalVerdict.factualAccuracyScore,
            relevanceScore: evalVerdict.relevanceScore,
            advisoryRiskScore: evalVerdict.advisoryRiskScore,
            latencyMs: Date.now() - startTime
          },
          dualCriticAudit: criticResult
        };
      } else {
        if (evalVerdict.advisoryRiskScore > 0 || (criticResult && !criticResult.compliant)) {
          finalResponse = fb.createTier1AdvisoryRefusal(mathData, query, traceId, preGuardrail);
        } else {
          finalResponse = rg.generate(fundId, query, preGuardrail, mathData, traceId);
        }
        if (candidateResponse && candidateResponse.llmTelemetry) {
          finalResponse.llmTelemetry = {
            ...candidateResponse.llmTelemetry,
            evalFallbackTriggered: true,
            rejectionReason: evalVerdict.rejectionReason || "Critic compliance rejection"
          };
        }
      }
    }

    // 5. Audit Logging
    if (al) {
      al.logInteraction({
        traceId,
        fundId,
        rawQuery: query,
        preGuardrail,
        retrievedChunkIds: finalResponse.retrievedChunkIds || [],
        frozenMath: mathData,
        evalMetrics: finalResponse.evaluationMetrics,
        finalStatus: finalResponse.status,
        servedHeadline: finalResponse.headline,
        disclaimerShown: finalResponse.complianceDisclaimer,
        llmTelemetry: finalResponse.llmTelemetry || null
      });
    }

    return finalResponse;
  }

  /**
   * Secure ingress endpoint enforcing cryptographically signed session tokens
   * @param {Object} rawRequest - Client API request payload
   * @returns {Object} SEBI-Compliant Response
   */
  function processSecureQuery(rawRequest = {}) {
    const sg = getSecurityGateway();
    if (!sg) {
      return processQuery(rawRequest.fundId, rawRequest.query, rawRequest.conversationHistory);
    }

    const authResult = sg.sanitizeAndAuthorizeRequest(rawRequest);
    if (!authResult.isAuthorized) {
      return authResult.denialResponse;
    }

    return processQuery(
      authResult.fundId,
      authResult.query,
      authResult.history,
      { sessionToken: authResult.sessionToken, traceId: authResult.traceId }
    );
  }

  return {
    processQuery,
    processQueryAsync,
    processSecureQuery,
    runBenchmarkSuite: () => getGoldenBenchmark().runSuite(processQuery),
    getAuditLogs: () => getAuditLogger()?.getLogs() || [],
    getKnowledgeBase: () => getKnowledgeStore().getAllChunks(),
    getGoldenSet: () => getGoldenBenchmark().getGoldenSet(),
    getSecurityGateway: () => getSecurityGateway(),
    getRetriever: () => getRetriever(),
    getCanaryRouter: () => getCanaryRouter(),
    getRetentionMetrics: () => getRetentionMetrics()
  };
})();

if (typeof window !== "undefined") {
  window.GROWW_RAG_PIPELINE = GROWW_RAG_PIPELINE;
}
if (typeof global !== "undefined") {
  global.GROWW_RAG_PIPELINE = GROWW_RAG_PIPELINE;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = GROWW_RAG_PIPELINE;
}

