export interface BillingPlanDto {
  id: string;
  display_name: string;
  credits: number;
  price: number;
  currency: string;
  is_popular?: boolean;
}

export interface BillingSummaryDto {
  credits_balance: number;
  plan_id?: string;
}

export interface CheckoutRequestDto {
  plan_id: string;
  success_url?: string;
  cancel_url?: string;
}

export interface CheckoutSessionDto {
  checkout_url: string;
}
