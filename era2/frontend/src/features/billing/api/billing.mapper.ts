import type { BillingPlanDto, BillingSummaryDto, CheckoutSessionDto } from "./billing.dto";

export interface BillingPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  isPopular?: boolean;
}

export interface BillingSummary {
  creditsBalance: number;
  planId?: string;
}

export interface CheckoutSession {
  checkoutUrl: string;
}

export function mapBillingPlanDto(dto: BillingPlanDto): BillingPlan {
  return {
    id: dto.id,
    name: dto.display_name,
    credits: dto.credits,
    price: dto.price,
    currency: dto.currency,
    isPopular: dto.is_popular,
  };
}

export function mapBillingSummaryDto(dto: BillingSummaryDto): BillingSummary {
  return {
    creditsBalance: dto.credits_balance,
    planId: dto.plan_id,
  };
}

export function mapCheckoutSessionDto(dto: CheckoutSessionDto): CheckoutSession {
  return {
    checkoutUrl: dto.checkout_url,
  };
}
