import { httpClient } from "@/shared/api";
import type { DailyCheckInDto } from "./rewards.dto";
import { mapDailyCheckInDto, type DailyCheckInStatus } from "./rewards.mapper";

const REWARDS_ENDPOINTS = {
  dailyCheckIn: "/api/rewards/daily-check-in",
  claimDailyCheckIn: "/api/rewards/daily-check-in/claim",
} as const;

const FALLBACK_DAYS = [
  { day: 1, credits: 2 },
  { day: 2, credits: 2 },
  { day: 3, credits: 3 },
  { day: 4, credits: 3 },
  { day: 5, credits: 4 },
  { day: 6, credits: 4 },
  { day: 7, credits: 15, isBonus: true },
];

export async function getDailyCheckInStatus(): Promise<DailyCheckInStatus> {
  return httpClient
    .get<DailyCheckInDto>(REWARDS_ENDPOINTS.dailyCheckIn)
    .then(mapDailyCheckInDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/rewards/daily-check-in is available.
      return {
        currentStreak: 1,
        canClaim: true,
        todayRewardCredits: FALLBACK_DAYS[0].credits,
        days: FALLBACK_DAYS,
      };
    });
}

export async function claimDailyCheckIn(): Promise<DailyCheckInStatus> {
  return httpClient
    .post<DailyCheckInDto>(REWARDS_ENDPOINTS.claimDailyCheckIn)
    .then(mapDailyCheckInDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/rewards/daily-check-in/claim is available.
      return {
        currentStreak: 1,
        canClaim: false,
        todayRewardCredits: FALLBACK_DAYS[0].credits,
        lastCheckInAt: new Date(),
        days: FALLBACK_DAYS,
      };
    });
}
