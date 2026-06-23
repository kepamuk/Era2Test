import type { AccountProfileDto } from "./account.dto";

export interface AccountProfile {
  id: string;
  name: string;
  email: string;
  planCode: "FREE" | "PRO";
  creditsUsed: number;
  creditsTotal: number;
  estimatedGenerationsLeft?: number;
}

export function mapAccountProfileDto(dto: AccountProfileDto): AccountProfile {
  return {
    id: dto.id,
    name: dto.display_name,
    email: dto.email,
    planCode: dto.plan_code,
    creditsUsed: dto.credits_used,
    creditsTotal: dto.credits_total,
    estimatedGenerationsLeft: dto.estimated_generations_left,
  };
}
