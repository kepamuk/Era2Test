import type { DailyCheckInDto, DailyRewardDayDto } from "./rewards.dto";

export interface DailyRewardDay {
  day: number;
  credits: number;
  isBonus?: boolean;
}

export interface DailyCheckInStatus {
  currentStreak: number;
  canClaim: boolean;
  todayRewardCredits: number;
  lastCheckInAt?: Date;
  days: DailyRewardDay[];
}

export function mapDailyRewardDayDto(dto: DailyRewardDayDto): DailyRewardDay {
  return {
    day: dto.day,
    credits: dto.credits,
    isBonus: dto.is_bonus,
  };
}

export function mapDailyCheckInDto(dto: DailyCheckInDto): DailyCheckInStatus {
  return {
    currentStreak: dto.current_streak,
    canClaim: dto.can_claim,
    todayRewardCredits: dto.today_reward_credits,
    lastCheckInAt: dto.last_checkin_at ? new Date(dto.last_checkin_at) : undefined,
    days: dto.days.map(mapDailyRewardDayDto),
  };
}
