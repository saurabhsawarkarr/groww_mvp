// Groww Portfolio Understanding MVP - Phase 8 Canary Router & Rollout Configuration
// Manages progressive 5% canary cohort allocation for first-time mutual fund investors with negative returns.

const GROWW_CANARY_ROUTER = (function () {
  // Default Canary Deployment Configuration (Section 10 - Phase 8)
  const CANARY_CONFIG = {
    canaryPercentage: 5.0, // 5% canary cohort
    targetTenureMinMonths: 2,
    targetTenureMaxMonths: 4,
    negativeReturnThresholdPct: 0.0, // negative returns (< 0.0%)
    firstTimeInvestorOnly: true,
    killSwitchActive: false, // Emergency regulatory abort switch
    experimentId: "EXP_GROWW_RAG_PORTFOLIO_UNDERSTANDING_2026_Q4"
  };

  /**
   * Deterministic Murmur-style hash for cohort assignment
   * Ensures the same userId consistently maps to the same cohort bucket (0 to 9999).
   */
  function hashStringToBucket(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return Math.abs(hash) % 10000; // 0 to 9999 (0.01% resolution)
  }

  /**
   * Evaluates if an investor meets the target demographic criteria for the canary trial
   */
  function evaluateCanaryEligibility(userProfile = {}) {
    const tenureMonths = typeof userProfile.tenureMonths === "number" ? userProfile.tenureMonths : 3;
    const totalReturnsPct = typeof userProfile.totalReturnsPct === "number" ? userProfile.totalReturnsPct : -8.37;
    const isFirstTimeInvestor = userProfile.isFirstTimeInvestor !== false; // default true for MVP

    const tenureMatch = tenureMonths >= CANARY_CONFIG.targetTenureMinMonths &&
                        tenureMonths <= CANARY_CONFIG.targetTenureMaxMonths;
    const lossMatch = totalReturnsPct < CANARY_CONFIG.negativeReturnThresholdPct;
    const firstTimeMatch = !CANARY_CONFIG.firstTimeInvestorOnly || isFirstTimeInvestor;

    const isEligible = tenureMatch && lossMatch && firstTimeMatch;

    return {
      isEligible,
      criteriaChecks: {
        tenureMatch: { required: "2-4 months", actual: `${tenureMonths} months`, passed: tenureMatch },
        lossMatch: { required: "< 0.0%", actual: `${totalReturnsPct}%`, passed: lossMatch },
        firstTimeMatch: { required: true, actual: isFirstTimeInvestor, passed: firstTimeMatch }
      }
    };
  }

  /**
   * Resolves routing decision for a given user
   * @param {Object} userProfile - Investor profile { userId, tenureMonths, totalReturnsPct, isFirstTimeInvestor }
   * @returns {Object} Routing verdict: "CANARY_TREATMENT_5PCT" or "CONTROL_GROUP_95PCT"
   */
  function routeUser(userProfile = {}) {
    const userId = userProfile.userId || "usr_rahul_sharma";

    // 1. Check emergency kill switch
    if (CANARY_CONFIG.killSwitchActive) {
      return {
        userId,
        cohort: "CONTROL_GROUP_95PCT",
        isCanaryActive: false,
        reason: "Canary rollout paused via emergency regulatory kill switch."
      };
    }

    // 2. Check demographic eligibility
    const eligibility = evaluateCanaryEligibility(userProfile);
    if (!eligibility.isEligible) {
      return {
        userId,
        cohort: "CONTROL_GROUP_95PCT",
        isCanaryActive: false,
        reason: "User does not meet 5% canary demographic criteria (2-4 mo tenure with drawdown).",
        eligibility
      };
    }

    // 3. Deterministic cohort hashing
    const hashKey = `${CANARY_CONFIG.experimentId}:${userId}`;
    const bucket = hashStringToBucket(hashKey); // 0 to 9999
    const canaryThreshold = CANARY_CONFIG.canaryPercentage * 100; // e.g. 5.0 * 100 = 500

    const isCanaryTreatment = bucket < canaryThreshold;

    return {
      userId,
      experimentId: CANARY_CONFIG.experimentId,
      bucket,
      canaryThreshold,
      cohort: isCanaryTreatment ? "CANARY_TREATMENT_5PCT" : "CONTROL_GROUP_95PCT",
      isCanaryActive: isCanaryTreatment,
      featureFlags: {
        showPortfolioUnderstandingCard: isCanaryTreatment,
        enableGroundedRAGDrawer: isCanaryTreatment,
        showUnitAccumulationAnalysis: isCanaryTreatment,
        enableClarificationChips: isCanaryTreatment
      },
      eligibility
    };
  }

  /**
   * Updates canary rollout percentage (for gradual stage scaling: 1% -> 5% -> 25% -> 100%)
   */
  function setCanaryPercentage(pct) {
    if (typeof pct === "number" && pct >= 0 && pct <= 100) {
      CANARY_CONFIG.canaryPercentage = pct;
      return true;
    }
    return false;
  }

  /**
   * Toggles emergency kill switch
   */
  function setKillSwitch(active) {
    CANARY_CONFIG.killSwitchActive = Boolean(active);
  }

  return {
    routeUser,
    evaluateCanaryEligibility,
    setCanaryPercentage,
    setKillSwitch,
    getConfig: () => Object.freeze({ ...CANARY_CONFIG }),
    hashStringToBucket
  };
})();

if (typeof window !== "undefined") {
  window.GROWW_CANARY_ROUTER = GROWW_CANARY_ROUTER;
}
if (typeof global !== "undefined") {
  global.GROWW_CANARY_ROUTER = GROWW_CANARY_ROUTER;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = GROWW_CANARY_ROUTER;
}

