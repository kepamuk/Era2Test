import { httpClient, type ApiListDto } from "@/shared/api";
import type { BillingPlanDto, BillingSummaryDto, CheckoutRequestDto, CheckoutSessionDto } from "./billing.dto";
import {
  mapBillingPlanDto,
  mapBillingSummaryDto,
  mapCheckoutSessionDto,
  type BillingPlan,
  type BillingSummary,
  type CheckoutSession,
} from "./billing.mapper";

const BILLING_ENDPOINTS = {
  summary: "/api/billing/summary",
  plans: "/api/billing/plans",
  checkout: "/api/billing/checkout",
} as const;

const TEMPORARY_BILLING_PLANS: BillingPlan[] = [
  { id: "starter", name: "Starter", credits: 1000, price: 990, currency: "RUB" },
  { id: "pro", name: "Pro", credits: 5000, price: 3990, currency: "RUB", isPopular: true },
];

function unwrapList<T>(response: T[] | ApiListDto<T>): T[] {
  return Array.isArray(response) ? response : response.data;
}

export async function getBillingSummary(): Promise<BillingSummary> {
  return httpClient
    .get<BillingSummaryDto>(BILLING_ENDPOINTS.summary)
    .then(mapBillingSummaryDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/billing/summary is available.
      return { creditsBalance: 1000 };
    });
}

export async function getBillingPlans(): Promise<BillingPlan[]> {
  return httpClient
    .get<BillingPlanDto[] | ApiListDto<BillingPlanDto>>(BILLING_ENDPOINTS.plans)
    .then((response) => unwrapList(response).map(mapBillingPlanDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/billing/plans is available.
      return TEMPORARY_BILLING_PLANS;
    });
}

export async function createCheckoutSession(input: CheckoutRequestDto): Promise<CheckoutSession> {
  return httpClient
    .post<CheckoutSessionDto, CheckoutRequestDto>(BILLING_ENDPOINTS.checkout, input)
    .then(mapCheckoutSessionDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/billing/checkout is available.
      return { checkoutUrl: "#" };
    });
}
