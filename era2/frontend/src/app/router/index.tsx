import { useLocation } from "@/shared/routing";
import Index from "@/pages/Index";
import TextPage from "@/pages/TextPage";
import DesignPage from "@/pages/DesignPage";
import VideoPage from "@/pages/VideoPage";
import AudioPage from "@/pages/AudioPage";
import AgentsPage from "@/pages/AgentsPage";
import AgentsLandingPage from "@/pages/AgentsLandingPage";
import ToolkitPage from "@/pages/ToolkitPage";
import HistoryPage from "@/pages/HistoryPage";
import PricingPage from "@/pages/PricingPage";
import AuthPage from "@/pages/AuthPage";
import QueuePage from "@/pages/QueuePage";
import StudiosPage from "@/pages/StudiosPage";
import TextGenerationPage from "@/pages/TextGenerationPage";
import ImageGenerationPage from "@/pages/ImageGenerationPage";
import VideoGenerationPage from "@/pages/VideoGenerationPage";
import AudioGenerationPage from "@/pages/AudioGenerationPage";
import NanoBananaPage from "@/pages/NanoBananaPage";
import ToolPage from "@/pages/ToolPage";
import NotFound from "@/pages/NotFound";

const routes: Record<string, React.ComponentType> = {
  "/": Index,
  "/text": TextPage,
  "/design": DesignPage,
  "/video": VideoPage,
  "/audio": AudioPage,
  "/agents": AgentsPage,
  "/studios": StudiosPage,
  "/toolkit": ToolkitPage,
  "/history": HistoryPage,
  "/queue": QueuePage,
  "/pricing": PricingPage,
  "/auth": AuthPage,
  "/tools/text-generation": TextGenerationPage,
  "/tools/image-generation": ImageGenerationPage,
  "/tools/video-generation": VideoGenerationPage,
  "/tools/audio-generation": AudioGenerationPage,
  "/tools/nano-banana": NanoBananaPage,
  "/tools/agents": AgentsLandingPage,
};

export function AppRoutes() {
  const { pathname } = useLocation();
  const Page = routes[pathname] ?? (pathname.startsWith("/tools/") ? ToolPage : NotFound);
  return <Page />;
}
