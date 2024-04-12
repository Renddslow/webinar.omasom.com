/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import "dotenv/config";

import path from "node:path";

import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";
import helmet from "helmet";

import { createRemixContext } from "./context";
import { env } from "~/utils/helpers";

import type { ServerBuild } from "@remix-run/node";

installGlobals();

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const PORT = Number(process.env.PORT || 3000);

const getRootPath = path.join.bind(path, process.env.BASE_PATH ?? "");

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: {
            middlewareMode: true,
            hmr: !env("HOST").includes("ngrok"),
          },
        })
      );

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () =>
        viteDevServer.ssrLoadModule(
          "virtual:remix/server-build"
        ) as Promise<ServerBuild>
    : // @ts-ignore
      ((await import("./build/server/index.js")) as unknown as ServerBuild),
  getLoadContext: createRemixContext,
});

const app = express();

// Secure the app with helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    getRootPath("/assets"),
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(getRootPath(), express.static("build/client", { maxAge: "1h" }));

// Handle SSR requests
app.all("*", remixHandler);

app.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`);
});
