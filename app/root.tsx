import { Outlet } from "@remix-run/react";
import { env } from "~/utils/helpers";
import { json } from "@remix-run/node";

import type { LoaderFunctionArgs } from "@remix-run/node";

export interface RootLoaderData {
  /** Environment variables used at runtime */
  env: Partial<EnvironmentVariables>;
  /** The user's locale */
  locale: "en";
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json<RootLoaderData>({
    env: {
      HOST: env("HOST"),
      NODE_ENV: env("NODE_ENV"),
      PORT: env("PORT"),
    },
    locale: "en",
  });
}

export { Layout } from "./Layout";

export default function App() {
  return <Outlet />;
}
