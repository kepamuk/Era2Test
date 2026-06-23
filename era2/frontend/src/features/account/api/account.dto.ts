export interface AccountProfileDto {
  id: string;
  display_name: string;
  email: string;
  plan_code: "FREE" | "PRO";
  credits_used: number;
  credits_total: number;
  estimated_generations_left?: number;
}
