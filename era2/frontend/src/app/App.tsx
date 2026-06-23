import { AppProviders } from "@/app/providers/AppProviders";
import { AppRoutes } from "@/app/router";
import { Layout } from "@/widgets/layout";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { OnboardingTour } from "@/features/onboarding";
import { CopyToastProvider } from "@/features/copy-toast";
import { DailyCheckIn } from "@/features/promo";
import { CornerPromo } from "@/features/promo";
import { QueueProvider, GenerationStatusBar } from "@/features/generation-queue";
import { Toaster } from "@/shared/ui/sonner";

export default function App() {
  return (
    <AppProviders>
      <QueueProvider>
        <Layout>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </Layout>
        <GenerationStatusBar />
        <OnboardingTour />
        <CopyToastProvider />
        <DailyCheckIn />
        <CornerPromo />
        <Toaster position="top-center" />
      </QueueProvider>
    </AppProviders>
  );
}
