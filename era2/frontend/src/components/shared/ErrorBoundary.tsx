import { Component, type ReactNode, type ErrorInfo } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // В production — отправка в Sentry/LogRocket
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(232,84,32,0.12)" }}>
            <AlertTriangle className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Что-то пошло не так</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-accent shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            Перезагрузить
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
