import {
  Meta,
  Outlet,
  Links,
  ScrollRestoration,
  Scripts,
  useRouteLoaderData,
} from "@remix-run/react";

import type { loader } from "./root";
import { Page } from "~/components/page/Page";
import { When } from "~/components/when/When";

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang={data?.locale}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Page>
          <When condition={true}></When>
          <Page.Body>{children}</Page.Body>
        </Page>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
