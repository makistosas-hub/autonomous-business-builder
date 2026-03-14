type TierLimits = {
  competitorLimit: number;
  memberLimit: number;
  moduleLimit: number;
  historyDays: number;
};

/**
 * Returns tier limits sourced from environment variables.
 * A value of -1 means unlimited.
 */
export function getTierLimits(tier: string): TierLimits {
  switch (tier) {
    case "starter":
      return {
        competitorLimit: parseInt(
          process.env.TIER_STARTER_COMPETITOR_LIMIT ?? "3"
        ),
        memberLimit: parseInt(process.env.TIER_STARTER_MEMBER_LIMIT ?? "1"),
        moduleLimit: parseInt(process.env.TIER_STARTER_MODULE_LIMIT ?? "3"),
        historyDays: parseInt(process.env.TIER_STARTER_HISTORY_DAYS ?? "30"),
      };
    case "pro":
      return {
        competitorLimit: parseInt(
          process.env.TIER_PRO_COMPETITOR_LIMIT ?? "10"
        ),
        memberLimit: parseInt(process.env.TIER_PRO_MEMBER_LIMIT ?? "5"),
        moduleLimit: parseInt(process.env.TIER_PRO_MODULE_LIMIT ?? "5"),
        historyDays: parseInt(process.env.TIER_PRO_HISTORY_DAYS ?? "365"),
      };
    case "enterprise":
      return {
        competitorLimit: parseInt(
          process.env.TIER_ENTERPRISE_COMPETITOR_LIMIT ?? "-1"
        ),
        memberLimit: parseInt(
          process.env.TIER_ENTERPRISE_MEMBER_LIMIT ?? "-1"
        ),
        moduleLimit: parseInt(
          process.env.TIER_ENTERPRISE_MODULE_LIMIT ?? "5"
        ),
        historyDays: parseInt(
          process.env.TIER_ENTERPRISE_HISTORY_DAYS ?? "-1"
        ),
      };
    case "free_trial":
      // Free trial gets Pro-level limits for the duration of the trial
      return {
        competitorLimit: parseInt(
          process.env.TIER_PRO_COMPETITOR_LIMIT ?? "10"
        ),
        memberLimit: parseInt(process.env.TIER_PRO_MEMBER_LIMIT ?? "5"),
        moduleLimit: parseInt(process.env.TIER_PRO_MODULE_LIMIT ?? "5"),
        historyDays: parseInt(process.env.TIER_PRO_HISTORY_DAYS ?? "365"),
      };
    case "cancelled":
    default:
      return {
        competitorLimit: 0,
        memberLimit: 0,
        moduleLimit: 0,
        historyDays: 0,
      };
  }
}

/**
 * Returns true if the given count is within the allowed limit.
 * A limit of -1 means unlimited.
 */
export function isWithinLimit(count: number, limit: number): boolean {
  if (limit === -1) return true;
  return count < limit;
}

/**
 * Returns the number of days for the free trial period.
 * Sourced from FREE_TRIAL_DAYS env var.
 */
export function getFreeTrialDays(): number {
  return parseInt(process.env.FREE_TRIAL_DAYS ?? "14");
}

/**
 * Computes the trial end timestamp (ms) from a given start time.
 */
export function computeTrialEndsAt(startedAt: number): number {
  const days = getFreeTrialDays();
  return startedAt + days * 24 * 60 * 60 * 1000;
}

/**
 * Returns true if an organization's trial is still active.
 */
export function isTrialActive(trialEndsAt: number | undefined): boolean {
  if (trialEndsAt === undefined) return false;
  return Date.now() < trialEndsAt;
}
