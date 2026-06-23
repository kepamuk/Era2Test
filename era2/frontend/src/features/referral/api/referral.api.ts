import { httpClient } from "@/shared/api";
import type { ReferralProgramDto, ReferralStatsDto } from "./referral.dto";
import {
  mapReferralProgramDto,
  mapReferralStatsDto,
  type ReferralProgram,
  type ReferralStats,
} from "./referral.mapper";

const REFERRAL_ENDPOINTS = {
  program: "/api/referral/program",
  stats: "/api/referral/stats",
} as const;

export async function getReferralProgram(): Promise<ReferralProgram> {
  return httpClient
    .get<ReferralProgramDto>(REFERRAL_ENDPOINTS.program)
    .then(mapReferralProgramDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/referral/program is available.
      return {
        referralLink: "https://era2.ai/ref/USER123",
        signupRewardCredits: 30,
        paidPlanRewardCredits: 50,
      };
    });
}

export async function getReferralStats(): Promise<ReferralStats> {
  return httpClient
    .get<ReferralStatsDto>(REFERRAL_ENDPOINTS.stats)
    .then(mapReferralStatsDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/referral/stats is available.
      return {
        totalReferrals: 0,
        successfulSignups: 0,
        paidConversions: 0,
        earnedCredits: 0,
      };
    });
}
