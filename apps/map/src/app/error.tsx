"use client";

import { RouteError } from "@acme/ui/route-error";

import { logError } from "~/lib/logging";

export default function Error(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteError
      {...props}
      onError={(error) =>
        logError("map.route.error", { digest: error.digest }, error)
      }
    />
  );
}
