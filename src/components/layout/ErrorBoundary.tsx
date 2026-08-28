import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error?: Error };

/**
 * Top-level error boundary. Prevents a single component error from blanking
 * the entire page; shows a minimal recovery UI with reload/home actions.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production, forward to your error tracker (Sentry, etc.).
    // Using a namespaced prefix so it's easy to filter out if you add
    // monitoring later.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("[Zenvio Labs] UI error:", error, info.componentStack);
    }
  }

  reset = () => this.setState({ hasError: false, error: undefined });

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div role="alert" className="flex min-h-[60vh] items-center justify-center px-6 pt-28">
        <div className="max-w-md text-center">
          <p className="eyebrow justify-center">Something broke</p>
          <h1 className="mt-5 font-serif-display text-4xl">A piece of the page failed to load.</h1>
          <p className="mt-4 text-sm text-foreground/65">
            Try reloading, or head back home and try again. We didn&apos;t send anything twice.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="ember" className="rounded-full" onClick={() => window.location.reload()}>
              Reload page
            </Button>
            <a
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold hover:bg-secondary"
              onClick={this.reset}
            >
              Back home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
