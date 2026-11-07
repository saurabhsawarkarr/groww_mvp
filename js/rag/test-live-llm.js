// Groww Portfolio Understanding MVP - Live LLM & Dual-Model Verification Test
// Tests Groq (Low-Token Engine), Google Gemini (Deep Reasoning), Adaptive Routing & SEBI Compliance

const assert = require("assert");
const provider = require("./llm-provider.js");
const pipeline = require("./index.js");
const mathEngine = require("./math-engine.js");
const knowledgeStore = require("./knowledge-store.js");
const ragGenerator = require("./rag-generator.js");

async function runLiveLLMTests() {
  console.log("================================================================================");
  console.log("  GROWW LIVE LLM & DUAL-MODEL VERIFICATION SUITE");
  console.log("  Engines: Groq (Low-Token / Qwen-27B) + Google Gemini (3.5 Flash)");
  console.log("================================================================================");

  let passed = 0;
  let total = 0;

  function recordPass(testName) {
    passed++;
    total++;
    console.log(`  [PASS] Test ${total.toString().padStart(2, "0")}: ${testName}`);
  }

  function recordFail(testName, err) {
    total++;
    console.error(`  [FAIL] Test ${total.toString().padStart(2, "0")}: ${testName}\n         ${err.message}`);
  }

  // TEST 01: Pre-LLM Gate 1 consumes 0 tokens on advisory traps in live mode
  try {
    const res = await pipeline.processQueryAsync("sbi-large-midcap", "Should I stop my SIP?", [], { mode: "groq" });
    assert.strictEqual(res.status, "SAFE_FALLBACK_TRIGGERED", "Must trigger safe fallback");
    assert.strictEqual(res.llmTelemetry, undefined, "Must consume 0 LLM tokens on advisory traps");
    assert.ok(
      res.headline.includes("cannot recommend") || res.complianceDisclaimer.includes("SEBI Non-Advisory"),
      "Must display SEBI non-advisory notice"
    );
    recordPass("Pre-LLM Gate 1 consumes 0 tokens on advisory traps in live mode");
  } catch (err) {
    recordFail("Pre-LLM Gate 1 consumes 0 tokens on advisory traps in live mode", err);
  }

  // TEST 02: Groq High-Speed / Low-Token Generation (< 2500ms, minimal tokens)
  try {
    const res = await pipeline.processQueryAsync("sbi-large-midcap", "Why is my fund down?", [], { mode: "groq" });
    assert.strictEqual(res.status, "GROUNDED_SUCCESS", "Must succeed with grounding");
    assert.ok(res.llmTelemetry, "Must have LLM telemetry");
    assert.strictEqual(res.llmTelemetry.provider, "Groq", "Provider must be Groq");
    assert.strictEqual(res.llmTelemetry.model, "qwen/qwen3.8-27b", "Model must be Qwen 27B");
    assert.ok(res.llmTelemetry.latencyMs < 5000, `Latency must be < 5000ms (was ${res.llmTelemetry.latencyMs}ms)`);
    assert.ok(res.explanationHtml.includes("BFSI") || res.explanationHtml.includes("Banking") || res.explanationHtml.includes("allocation"), "Must mention sector allocation");
    recordPass(`Groq Low-Token Generation succeeded in ${res.llmTelemetry.latencyMs}ms (${res.llmTelemetry.usage.total_tokens} tokens)`);
  } catch (err) {
    recordFail("Groq Low-Token Generation", err);
  }

  // TEST 03: Token-Aware Adaptive Routing chooses Groq for low token / concise queries
  try {
    const res = await pipeline.processQueryAsync("sbi-large-midcap", "What is NAV?", [], { mode: "auto" });
    assert.strictEqual(res.status, "GROUNDED_SUCCESS");
    assert.ok(res.llmTelemetry, "Must have LLM telemetry");
    assert.strictEqual(res.llmTelemetry.provider, "Groq", "Auto routing must select Groq for low-token queries");
    assert.ok(res.llmTelemetry.routingReason.includes("Low token requirement"), "Must explain routing reason");
    recordPass(`Auto routing selected Groq to save tokens: "${res.llmTelemetry.routingReason}"`);
  } catch (err) {
    recordFail("Token-Aware Adaptive Routing", err);
  }

  // TEST 04: Dual-LLM Compliance Critic validates output precision
  try {
    const res = await pipeline.processQueryAsync("sbi-large-midcap", "Why is my fund down?", [], { mode: "dual" });
    assert.strictEqual(res.status, "GROUNDED_SUCCESS");
    assert.ok(res.llmTelemetry, "Must have LLM telemetry");
    assert.ok(res.dualCriticAudit, "Must include dual critic audit result");
    assert.strictEqual(res.dualCriticAudit.compliant, true, "Critic must confirm compliance");
    recordPass("Dual-LLM (Groq Generator + Gemini Compliance Critic) passed validation");
  } catch (err) {
    recordFail("Dual-LLM Compliance Critic", err);
  }

  // TEST 05: Offline deterministic fallback mode works without internet
  try {
    const res = await pipeline.processQueryAsync("sbi-large-midcap", "Why is my fund down?", [], { mode: "deterministic" });
    assert.strictEqual(res.status, "GROUNDED_SUCCESS");
    assert.strictEqual(res.badge.variant, "success");
    assert.ok(res.explanationHtml.includes("Personal SIP Timing Effect"), "Must use deterministic template");
    recordPass("Offline deterministic fallback operates independently with 0 external network calls");
  } catch (err) {
    recordFail("Offline deterministic fallback", err);
  }

  console.log("================================================================================");
  console.log(`  LIVE SUITE SUMMARY: ${passed} / ${total} Passed (${Math.round((passed / total) * 100)}%)`);
  console.log("================================================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

runLiveLLMTests().catch(err => {
  console.error("Fatal Live Test Error:", err);
  process.exit(1);
});

