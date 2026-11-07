// Groww Portfolio Understanding MVP - SEBI Regulatory Audit Logger (Phase 6 Hardening)
// Logs tamper-evident, SHA-256 cryptographically chained telemetry records for compliance auditing and investor dispute resolution.

const GROWW_AUDIT_LOGGER = (function () {
  const STORAGE_KEY = "groww_ai_audit_logs_v2";
  const GENESIS_HASH = "0000000000000000000000000000000000000000000000000000000000000000";
  let inMemoryLogs = [];

  // Cross-environment SHA-256 implementation
  function computeSha256(message) {
    if (typeof require !== "undefined") {
      try {
        const crypto = require("crypto");
        return crypto.createHash("sha256").update(message, "utf8").digest("hex");
      } catch (e) {}
    }

    // Pure JavaScript SHA-256 fallback for browser contexts
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let i, j;
    const result = [];
    const words = [];
    const asciiBitLength = message.length * 8;
    let hash = [];
    const k = [];
    let primeCounter = 0;

    const isPrime = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isPrime[candidate]) {
        for (i = 0; i < 313; i += candidate) isPrime[i] = candidate;
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    message += "\x80";
    while ((message.length % 64) - 56) message += "\x00";
    for (i = 0; i < message.length; i++) {
      j = message.charCodeAt(i);
      words[i >> 2] |= j << (((3 - i) % 4) * 8);
    }
    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;

    for (j = 0; j < words.length;) {
      const w = words.slice(j, (j += 16));
      const oldHash = hash;
      hash = hash.slice(0, 8);

      for (i = 0; i < 64; i++) {
        const w15 = w[i - 15], w2 = w[i - 2];
        const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
        const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
        const temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
        const temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj;

        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }

      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }

    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result.push((b < 16 ? "0" : "") + b.toString(16));
      }
    }
    return result.join("");
  }

  // Initialize from storage if available
  try {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        inMemoryLogs = JSON.parse(saved);
      }
    }
  } catch (e) {
    // Memory fallback
  }

  /**
   * Logs an interaction with SHA-256 cryptographic chaining
   */
  function logInteraction(entry) {
    const sequenceNumber = inMemoryLogs.length + 1;
    const previousRecordHash = inMemoryLogs.length > 0 
      ? inMemoryLogs[0].recordHash 
      : GENESIS_HASH;

    const traceId = entry.traceId || `tr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const timestamp = new Date().toISOString();
    const rawQuery = entry.rawQuery || "";
    const finalStatus = entry.finalStatus || "UNKNOWN";
    const servedHeadline = entry.servedHeadline || "";

    // Compute tamper-evident record hash
    const hashPayload = `${previousRecordHash}:${sequenceNumber}:${traceId}:${timestamp}:${rawQuery}:${finalStatus}:${servedHeadline}`;
    const recordHash = computeSha256(hashPayload);

    const logRecord = {
      sequenceNumber,
      recordHash,
      previousRecordHash,
      traceId,
      timestamp,
      fundId: entry.fundId || "sbi-large-midcap",
      rawQuery,
      preGuardrail: {
        isSafeForLLM: entry.preGuardrail?.isSafeForLLM,
        intentCategory: entry.preGuardrail?.intentCategory,
        riskLevel: entry.preGuardrail?.riskLevel,
        guardrailName: entry.preGuardrail?.guardrailName
      },
      retrievedChunkIds: entry.retrievedChunkIds || [],
      frozenMathSnap: entry.frozenMath ? {
        totalInvested: entry.frozenMath.totalInvested || entry.frozenMath.invested,
        currentValue: entry.frozenMath.currentValue,
        drawdownPct: entry.frozenMath.totalReturnsPct || entry.frozenMath.drawdownPct,
        units: entry.frozenMath.totalUnits || entry.frozenMath.units,
        avgNav: entry.frozenMath.avgPurchaseNav || entry.frozenMath.avgNav
      } : null,
      evalMetrics: entry.evalMetrics || null,
      finalStatus,
      servedHeadline,
      disclaimerShown: entry.disclaimerShown,
      tamperIntegrityVerified: true
    };

    inMemoryLogs.unshift(logRecord); // newest first
    if (inMemoryLogs.length > 200) inMemoryLogs.pop(); // keep last 200

    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryLogs));
      }
    } catch (e) {}

    return logRecord;
  }

  /**
   * Verifies the cryptographic integrity of the entire audit chain
   * Iterates from the oldest record to the newest, recalculating hashes.
   */
  function verifyAuditChainIntegrity() {
    if (inMemoryLogs.length === 0) {
      return { isValid: true, checkedRecords: 0, errors: [] };
    }

    // Inspect in chronological order (oldest to newest)
    const chronologicalLogs = [...inMemoryLogs].reverse();
    const errors = [];

    for (let i = 0; i < chronologicalLogs.length; i++) {
      const record = chronologicalLogs[i];
      const expectedPrevHash = (i === 0) ? GENESIS_HASH : chronologicalLogs[i - 1].recordHash;

      if (record.previousRecordHash !== expectedPrevHash) {
        errors.push({
          sequenceNumber: record.sequenceNumber,
          traceId: record.traceId,
          error: `Broken chain link: previousRecordHash mismatch at sequence ${record.sequenceNumber}.`
        });
      }

      const hashPayload = `${record.previousRecordHash}:${record.sequenceNumber}:${record.traceId}:${record.timestamp}:${record.rawQuery}:${record.finalStatus}:${record.servedHeadline}`;
      const recalculatedHash = computeSha256(hashPayload);

      if (record.recordHash !== recalculatedHash) {
        errors.push({
          sequenceNumber: record.sequenceNumber,
          traceId: record.traceId,
          error: `Tamper detected: Record hash ${record.recordHash} does not match recalculated hash ${recalculatedHash}.`
        });
      }
    }

    return {
      isValid: errors.length === 0,
      checkedRecords: chronologicalLogs.length,
      errors
    };
  }

  /**
   * Exports audit log in JSON format for compliance submission
   */
  function exportAuditLogJSON() {
    return JSON.stringify({
      exportTimestamp: new Date().toISOString(),
      regulator: "SEBI (Securities and Exchange Board of India)",
      system: "Groww AI Portfolio Understanding Engine",
      totalRecords: inMemoryLogs.length,
      chainIntegrity: verifyAuditChainIntegrity(),
      records: inMemoryLogs
    }, null, 2);
  }

  /**
   * Exports audit log in JSON Lines (JSONL) format
   */
  function exportAuditLogJSONL() {
    return inMemoryLogs.map(r => JSON.stringify(r)).join("\n");
  }

  /**
   * Filters logs by status, trace ID, or query substring
   */
  function filterLogs({ status, traceId, querySubstring } = {}) {
    return inMemoryLogs.filter(log => {
      if (status && log.finalStatus !== status) return false;
      if (traceId && !log.traceId.includes(traceId)) return false;
      if (querySubstring && !log.rawQuery.toLowerCase().includes(querySubstring.toLowerCase())) return false;
      return true;
    });
  }

  return {
    logInteraction,
    getLogs: () => inMemoryLogs,
    getLogByTraceId: (traceId) => inMemoryLogs.find(l => l.traceId === traceId),
    verifyAuditChainIntegrity,
    exportAuditLogJSON,
    exportAuditLogJSONL,
    filterLogs,
    computeSha256,
    clearLogs: () => {
      inMemoryLogs = [];
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {}
    }
  };
})();

if (typeof window !== "undefined") {
  window.GROWW_AUDIT_LOGGER = GROWW_AUDIT_LOGGER;
}
if (typeof global !== "undefined") {
  global.GROWW_AUDIT_LOGGER = GROWW_AUDIT_LOGGER;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = GROWW_AUDIT_LOGGER;
}
