import { httpClient } from "@/shared/api";
import type { AccountProfileDto } from "./account.dto";
import { mapAccountProfileDto, type AccountProfile } from "./account.mapper";

const ACCOUNT_ENDPOINTS = {
  profile: "/api/account/profile",
} as const;

export async function getAccountProfile(): Promise<AccountProfile> {
  return httpClient
    .get<AccountProfileDto>(ACCOUNT_ENDPOINTS.profile)
    .then(mapAccountProfileDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/account/profile is available.
      return {
        id: "temporary-account",
        name: "Роман Г.",
        email: "roman2024gerts@gmail.com",
        planCode: "FREE",
        creditsUsed: 1000,
        creditsTotal: 5000,
        estimatedGenerationsLeft: 12,
      };
    });
}
