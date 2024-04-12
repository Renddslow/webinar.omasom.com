import { useCallback, useMemo, useState } from "react";
import { useLoaderData, useMatches } from "@remix-run/react";

import type { loader } from "./route";

export function WebinarDetails() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();

  return <div>Hello</div>;
}
