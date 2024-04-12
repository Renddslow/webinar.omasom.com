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
        <style
          dangerouslySetInnerHTML={{
            __html: `
        * {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }

            html {
            height: 100%;
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
          }

            html:focus-within {
              scroll-behavior: smooth;
          }

            body {
            margin: 0;
            text-rendering: optimizeSpeed;
            height: 100%;
            color: #fff;
          }

            :is(a, button, input, textarea, select) {
            outline: transparent solid 0;
            transition: outline-color 200ms;
          }

            :is(a, button, input, textarea, select):focus-visible {
              outline-width: 3px;
            /* TODO: replace color */
            outline-color: #157fd7;
          }

            @media (prefers-reduced-motion: reduce) {
            html:focus-within {
            scroll-behavior: auto;
          }

            *,
            *::before,
            *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        `,
          }}
        />
      </head>
      <body>
        <Page>
          <When condition={true}></When>
          <Page.Body>{children}</Page.Body>
        </Page>
        <ScrollRestoration />
        <Scripts />
        <script
          src="https://unpkg.com/@phosphor-icons/web"
          type="text/javascript"
        />
      </body>
    </html>
  );
}
