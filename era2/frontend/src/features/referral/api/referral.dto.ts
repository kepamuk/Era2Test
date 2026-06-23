export interface ReferralProgramDto {
  referral_link: string;
  signup_reward_credits: number;
  paid_plan_reward_credits: number;
}

export interface ReferralStatsDto {
  total_referrals: number;
  successful_signups: number;
  paid_conversions: number;
  earned_credits: number;
}
