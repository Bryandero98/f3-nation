"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "./button";

export interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  /**
   * Called once per distinct `error` instance, before render. This runs in
   * the browser, so wire it to a browser-safe reporter only - `console.error`,
   * or `Sentry.captureException` where the app has Sentry's client SDK
   * configured. Never the `@acme/logger` (pino) helpers: pino depends on
   * `node:module` and other Node builtins that don't exist in a client
   * bundle, and pulling it in here breaks the build (see #620).
   */
  onError?: (error: Error & { digest?: string }) => void;
}

/**
 * Shared body for every app's root `error.tsx`. Renders the same styled
 * boundary everywhere so a thrown error in a server component doesn't fall
 * through to Next's unstyled default screen.
 */
export function RouteError({ error, reset, onError }: RouteErrorProps) {
  useEffect(() => {
    onError?.(error);
  }, [error, onError]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <AlertTriangle className="size-10 text-destructive" aria-hidden="true" />
      <div className="space-y-1">
        <h1 className="text-lg font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          We hit an unexpected error loading this page. Trying again usually
          fixes it.
        </p>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
