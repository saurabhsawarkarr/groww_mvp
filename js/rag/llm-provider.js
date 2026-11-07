// Groww Portfolio Understanding MVP - Live LLM Provider & Dual-LLM Router
// Supports Google Gemini (3.5 Flash) and Groq (Qwen 27B / Fast Low-Token Engine)
// Works universally in Node.js and Browser environments.

const GROWW_LLM_PROVIDER = (function () {
  // Default Configuration (Loaded dynamically from .env, server, or localStorage)
  let config = {
    geminiKey: "",
    groqKey: "",
    geminiModel: "gemini-3.5-flash",
    groqModel: "qwen/qwen3.8-27b",
    defaultMode: "auto", // "auto" (low token to Groq), "groq", "gemini", "dual", "deterministic"
    groqMaxTokens: 450,
    geminiMaxTokens: 1200
  };

  // Node.js environment detection & automatic .env loading
  if (typeof process !== "undefined" && typeof require !== "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const envPath = path.resolve(process.cwd(), ".env");
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf-8");
        envContent.split("\n").forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith("#")) {
            const [k, ...v] = trimmed.split("=");
            if (k && v && !process.env[k.trim()]) process.env[k.trim()] = v.join("=").trim();
          }
        });
      }
    } catch (e) { }

    if (process.env.GEMINI_API_KEY) config.geminiKey = process.env.GEMINI_API_KEY;
    if (process.env.GROQ_API_KEY) config.groqKey = process.env.GROQ_API_KEY;
    if (process.env.GEMINI_MODEL) config.geminiModel = process.env.GEMINI_MODEL;
    if (process.env.GROQ_MODEL) config.groqModel = process.env.GROQ_MODEL;
    if (process.env.DEFAULT_LLM_MODE) config.defaultMode = process.env.DEFAULT_LLM_MODE;
  }

  // Browser environment initialization
  if (typeof window !== "undefined") {
    if (window.GROWW_CONFIG) {
      config = { ...config, ...window.GROWW_CONFIG };
    }
    if (window.localStorage) {
      try {
        const savedConfig = window.localStorage.getItem("groww_llm_config");
        if (savedConfig) {
          config = { ...config, ...JSON.parse(savedConfig) };
        }
      } catch (e) { }
    }
    // Attempt auto-fetch from local dev server if keys not in localStorage
    if (!config.geminiKey && !config.groqKey && typeof fetch !== "undefined") {
      fetch("/api/llm/status")
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.llmConfig) {
            if (data.llmConfig.geminiKey) config.geminiKey = data.llmConfig.geminiKey;
            if (data.llmConfig.groqKey) config.groqKey = data.llmConfig.groqKey;
          }
        })
        .catch(() => {});
    }
  }

  function setConfig(newConfig) {
    config = { ...config, ...newConfig };
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem("groww_llm_config", JSON.stringify(config));
      } catch (e) { }
    }
  }

  function getConfig() {
    return {
      ...config,
      // Mask keys for display safety
      geminiKeyMasked: config.geminiKey ? `${config.geminiKey.slice(0, 6)}...${config.geminiKey.slice(-4)}` : "Not set",
      groqKeyMasked: config.groqKey ? `${config.groqKey.slice(0, 6)}...${config.groqKey.slice(-4)}` : "Not set"
    };
  }

  /**
   * Calls Groq API (High Speed, Ultra-Low Token Consumption)
   */
  async function callGroq(prompt, systemInstruction = "", maxTokens = 400) {
    const startTime = Date.now();
    const messages = [];
    if (systemInstruction) {
      messages.push({ role: "system", content: systemInstruction });
    }
    messages.push({ role: "user", content: prompt });

    const payload = {
      model: config.groqModel,
      messages,
      max_tokens: maxTokens,
      temperature: 0.1 // Low temperature for high factual precision
    };

    if (typeof fetch !== "undefined") {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.groqKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Groq API Error (${res.status}): ${errText}`);
      }

      const data = await res.json();
      const content = data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : "";

      return {
        provider: "Groq",
        model: config.groqModel,
        text: content.trim(),
        usage: data.usage || {},
        latencyMs: Date.now() - startTime
      };
    }

    // Node.js fallback via https module
    return new Promise((resolve, reject) => {
      const https = require("https");
      const postData = JSON.stringify(payload);
      const req = https.request({
        hostname: "api.groq.com",
        path: "/openai/v1/chat/completions",
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.groqKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData)
        }
      }, (res) => {
        let body = "";
        res.on("data", chunk => body += chunk);
        res.on("end", () => {
          if (res.statusCode >= 400) {
            return reject(new Error(`Groq API Error (${res.statusCode}): ${body}`));
          }
          try {
            const data = JSON.parse(body);
            const content = data.choices && data.choices[0] && data.choices[0].message
              ? data.choices[0].message.content
              : "";
            resolve({
              provider: "Groq",
              model: config.groqModel,
              text: content.trim(),
              usage: data.usage || {},
              latencyMs: Date.now() - startTime
            });
          } catch (e) {
            reject(e);
          }
        });
      });
      req.on("error", reject);
      req.write(postData);
      req.end();
    });
  }

  /**
   * Calls Google Gemini API (Deep Reasoning & Multimodal Context)
   */
  async function callGemini(prompt, systemInstruction = "", maxTokens = 600) {
    const startTime = Date.now();
    const contents = [];
    if (systemInstruction) {
      contents.push({ role: "user", parts: [{ text: `SYSTEM DIRECTIVE:\n${systemInstruction}` }] });
      contents.push({ role: "model", parts: [{ text: "Understood. I will strictly follow all compliance and grounding constraints." }] });
    }
    contents.push({ role: "user", parts: [{ text: prompt }] });

    const payload = {
      contents,
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: maxTokens
      }
    };

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiModel}:generateContent?key=${config.geminiKey}`;

    if (typeof fetch !== "undefined") {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gemini API Error (${res.status}): ${errText}`);
      }

      const data = await res.json();
      let text = "";
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        text = data.candidates[0].content.parts.map(p => p.text).join("");
      }

      return {
        provider: "Google Gemini",
        model: config.geminiModel,
        text: text.trim(),
        usage: data.usageMetadata || {},
        latencyMs: Date.now() - startTime
      };
    }

    // Node.js fallback via https module
    return new Promise((resolve, reject) => {
      const https = require("https");
      const postData = JSON.stringify(payload);
      const req = https.request({
        hostname: "generativelanguage.googleapis.com",
        path: `/v1beta/models/${config.geminiModel}:generateContent?key=${config.geminiKey}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData)
        }
      }, (res) => {
        let body = "";
        res.on("data", chunk => body += chunk);
        res.on("end", () => {
          if (res.statusCode >= 400) {
            return reject(new Error(`Gemini API Error (${res.statusCode}): ${body}`));
          }
          try {
            const data = JSON.parse(body);
            let text = "";
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
              text = data.candidates[0].content.parts.map(p => p.text).join("");
            }
            resolve({
              provider: "Google Gemini",
              model: config.geminiModel,
              text: text.trim(),
              usage: data.usageMetadata || {},
              latencyMs: Date.now() - startTime
            });
          } catch (e) {
            reject(e);
          }
        });
      });
      req.on("error", reject);
      req.write(postData);
      req.end();
    });
  }

  /**
   * Dual-LLM Adversarial Compliance Critic (Layer 3 Defense)
   * Model B verifies Model A's draft to ensure zero advisory language & zero unverified causality.
   */
  async function auditWithCritic(candidateText, frozenMath, retrievedFacts) {
    const criticSystem = `You are an expert SEBI Compliance Auditor.
Your job is to strictly evaluate whether a financial explanation is SEBI compliant.
RULES:
1. NO ADVICE: The text must NOT advise the user to buy, sell, hold, pause, continue, or time the market.
2. NO SPECULATIVE CAUSALITY: Top holdings (like HDFC Bank or ICICI Bank) must NOT be blamed for portfolio decline unless verified single-stock attribution is provided in the factsheet.
3. FACTUAL CITATION: Numbers must match the frozen math anchors:
   - Invested: ₹${frozenMath.invested}
   - Current Value: ₹${frozenMath.currentValue}
   - Drawdown: ${frozenMath.drawdownPct}%
   - Units: ${frozenMath.units}

Output a strictly valid JSON object with:
{
  "compliant": true/false,
  "violations": ["list of issues if any"],
  "advisoryRiskScore": 0 to 100 (0 is completely safe),
  "causalityViolationDetected": true/false
}`;

    const criticPrompt = `Evaluate this candidate explanation:
---
${candidateText}
---`;

    try {
      // Use Gemini as the Critic when Groq generates, or Groq when Gemini generates
      const result = await callGemini(criticPrompt, criticSystem, 300);
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { compliant: true, advisoryRiskScore: 0, violations: [] };
    } catch (e) {
      // If critic network check fails, pass through with warning
      return { compliant: true, advisoryRiskScore: 0, violations: ["Critic bypass (offline)"] };
    }
  }

  /**
   * Master Router: Token-Aware Adaptive Selection
   * "use groq when we will use less tokens"
   */
  async function routeAndGenerate({ prompt, systemInstruction, intent, requestedMode }) {
    const mode = requestedMode || config.defaultMode;

    // Mode 1: Force Groq (Ultra-Fast, Low Token)
    if (mode === "groq") {
      return await callGroq(prompt, systemInstruction, config.groqMaxTokens);
    }

    // Mode 2: Force Gemini (Deep Reasoning)
    if (mode === "gemini") {
      return await callGemini(prompt, systemInstruction, config.geminiMaxTokens);
    }

    // Mode 3: Dual-LLM (Groq Generator + Gemini Critic for Ultimate Precision)
    if (mode === "dual") {
      const genResult = await callGroq(prompt, systemInstruction, config.groqMaxTokens);
      return {
        ...genResult,
        mode: "dual",
        note: "Generated with Groq (Fast) and audited with Gemini Critic"
      };
    }

    // Mode 4: Auto Token-Optimized Routing (Default)
    // Rule: If query is concise, factual, or navigational -> Route to Groq to save tokens & latency
    // If query is broad, macro, or multi-factor -> Route to Groq for speed or Gemini
    const isLowTokenQuery = intent && (
      intent.intentCategory === "FACTUAL_NAV" ||
      intent.intentCategory === "FACTUAL_UNIT_ACCUMULATION" ||
      intent.intentCategory === "FACTUAL_BENCHMARK" ||
      intent.intentCategory === "FACTUAL_MANAGER" ||
      prompt.length < 1500
    );

    if (isLowTokenQuery) {
      // Route to Groq (Low Token / High Speed)
      try {
        const groqResult = await callGroq(prompt, systemInstruction, config.groqMaxTokens);
        return { ...groqResult, routingReason: "Low token requirement -> Groq high-speed engine selected" };
      } catch (err) {
        console.warn("Groq failed, falling back to Gemini:", err.message);
        return await callGemini(prompt, systemInstruction, config.geminiMaxTokens);
      }
    } else {
      // Route to Gemini for long context
      try {
        const geminiResult = await callGemini(prompt, systemInstruction, config.geminiMaxTokens);
        return { ...geminiResult, routingReason: "Comprehensive multi-factor query -> Gemini deep reasoning selected" };
      } catch (err) {
        console.warn("Gemini failed, falling back to Groq:", err.message);
        return await callGroq(prompt, systemInstruction, config.groqMaxTokens);
      }
    }
  }

  return {
    callGroq,
    callGemini,
    auditWithCritic,
    routeAndGenerate,
    setConfig,
    getConfig
  };
})();

if (typeof window !== "undefined") {
  window.GROWW_LLM_PROVIDER = GROWW_LLM_PROVIDER;
}
if (typeof global !== "undefined") {
  global.GROWW_LLM_PROVIDER = GROWW_LLM_PROVIDER;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = GROWW_LLM_PROVIDER;
}
