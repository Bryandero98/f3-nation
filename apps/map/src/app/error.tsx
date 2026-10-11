"use client";

import posthog from "posthog-js";

import { RouteError } from "@acme/ui/route-error";

import { env } from "~/env";

export default function Error(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteError
      {...props}
      onError={(error) => {
        // Same gate and failure handling as global-error.tsx: report only when
        // PostHog is configured, and never let a blocked ingest host throw out
        // of the error boundary itself.
        if (!env.NEXT_PUBLIC_POSTHOG_KEY) return;
        try {
          posthog.captureException(error);
        } catch (reportErr) {
          // @acme/logger is pino and does not run in the browser (see
          // global-error.tsx), so console.error is the documented fallback.
          console.error("posthog.capture_exception_failed", reportErr);
        }
      }}
    />
  );
}
