// Groww Portfolio Understanding MVP - Master CI/CD Test Runner (Phase 6)
// Executes all 6 test suites across Phases 1 through 6, validating zero-regression readiness.

const { execSync } = require("child_process");
const path = require("path");

console.log("\n================================================================================");
console.log("   GROWW AI PORTFOLIO UNDERSTANDING - MASTER REGRESSION TEST HARNESS");
console.log("   Validating Full SEBI-Compliant RAG Pipeline Across Phases 1 to 6");
console.log("================================================================================\n");

const testSuites = [
  { name: "Phase 1: Deterministic Float Math Engine", script: "test-math-engine.js" },
  { name: "Phase 2: Security Gateway & Pre-LLM Guardrails", script: "test-security-guardrails.js" },
  { name: "Phase 3: RAG Ingestion, Hybrid Search & XML Sandboxing", script: "test-retrieval-sandboxing.js" },
  { name: "Phase 4: Structured Attribution & Grounded Generation", script: "test-attribution-generation.js" },
  { name: "Phase 5: Multi-Layer Output Defense & Evaluation Engine", script: "test-output-defense.js" },
  { name: "Phase 8: Canary Router & Business Retention Metrics", script: "test-canary-retention.js" }
];

let totalSuites = testSuites.length + 1; // +1 for 26 Golden Set scenarios
let passedSuites = 0;
const startTime = Date.now();

for (const suite of testSuites) {
  const filePath = path.join(__dirname, suite.script);
  console.log(`>>> Running ${suite.name} (${suite.script})...`);
  try {
    const output = execSync(`node "${filePath}"`, { encoding: "utf8" });
    console.log(output);
    passedSuites++;
  } catch (err) {
    console.error(`!!! FAILED: ${suite.name}`);
    console.error(err.stdout || err.message);
    process.exit(1);
  }
}

// Phase 6: Run 26 Golden Set Scenarios
console.log(">>> Running Phase 6: 26-Question Golden Benchmark Set (eval-benchmark.js)...");
try {
  const pipeline = require("./index.js");
  const benchmarkResults = pipeline.runBenchmarkSuite();
  console.log(`====================================================`);
  console.log(`  GOLDEN SET BENCHMARK RESULTS: ${benchmarkResults.passedCount} / ${benchmarkResults.totalTests} PASSED (${benchmarkResults.overallScore})`);
  console.log(`  Advice Refusal Rate:   ${benchmarkResults.metrics.adviceRefusalRate}`);
  console.log(`  Factual Grounding:     ${benchmarkResults.metrics.factualGrounding}`);
  console.log(`  Hallucination Rate:    ${benchmarkResults.metrics.hallucinationRate}`);
  console.log(`  Fallback Trigger Rate: ${benchmarkResults.metrics.fallbackTriggerRate}`);
  console.log(`  Total Duration:        ${benchmarkResults.totalDurationMs} ms`);
  console.log(`====================================================\n`);

  if (benchmarkResults.passedCount === benchmarkResults.totalTests) {
    passedSuites++;
  } else {
    console.error(`!!! FAILED: Golden Set Benchmark Suite only passed ${benchmarkResults.passedCount} / ${benchmarkResults.totalTests}.`);
    process.exit(1);
  }
} catch (err) {
  console.error("!!! Error executing Golden Set Benchmark Suite:", err.message);
  process.exit(1);
}

const totalDurationMs = Date.now() - startTime;

console.log("================================================================================");
console.log(`  ALL ${passedSuites} / ${totalSuites} TEST SUITES PASSED CLEANLY (100% SUCCESS)`);
console.log(`  Total Regression Execution Time: ${totalDurationMs} ms`);
console.log("  SEBI Regulatory Compliance: READY FOR DEPLOYMENT");
console.log("================================================================================\n");
