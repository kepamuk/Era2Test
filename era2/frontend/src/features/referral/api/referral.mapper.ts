import type { ReferralProgramDto, ReferralStatsDto } from "./referral.dto";

export interface ReferralProgram {
  referralLink: string;
  signupRewardCredits: number;
  paidPlanRewardCredits: number;
}

export interface ReferralStats {
  totalReferrals: number;
  successfulSignups: number;
  paidConversions: number;
  earnedCredits: number;
}

export function mapReferralProgramDto(dto: ReferralProgramDto): ReferralProgram {
  return {
    referralLink: dto.referral_link,
    signupRewardCredits: dto.signup_reward_credits,
    paidPlanRewardCredits: dto.paid_plan_reward_credits,
  };
}

export function mapReferralStatsDto(dto: ReferralStatsDto): ReferralStats {
  return {
    totalReferrals: dto.total_referrals,
    successfulSignups: dto.successful_signups,
    paidConversions: dto.paid_conversions,
    earnedCredits: dto.earned_credits,
  };
}
