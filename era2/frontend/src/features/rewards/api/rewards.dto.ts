import type { IsoDateString } from "@/shared/api";

export interface DailyRewardDayDto {
  day: number;
  credits: number;
  is_bonus?: boolean;
}

export interface DailyCheckInDto {
  current_streak: number;
  can_claim: boolean;
  today_reward_credits: number;
  last_checkin_at?: IsoDateString;
  days: DailyRewardDayDto[];
}
