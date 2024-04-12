/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import "dotenv/config";

import path from "node:path";

import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";

import { createRemixContext } from "./context";
import { env } from "~/utils/helpers";

import type { ServerBuild } from "@remix-run/node";
import { getWebinar } from "./controllers/getWebinar";
import { setupDatabase } from "./middleware/setup-database";
import type { RequestContext } from "./types";
import { registerForWebinar } from "./controllers/registerForWebinar";

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

const setUpContext = (req: Request, _: Response, next: NextFunction) => {
  req.context = {} as RequestContext;
  next();
};

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
  bodyParser.json(),
  setUpContext,
  await setupDatabase()
);

// Handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    getRootPath("/assets"),
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

app.use(getRootPath(), express.static("build/client", { maxAge: "1h" }));

app.get("/api/webinar/:id", async (req, res) => {
  res.json(await getWebinar(req.params.id, req.context));
});

app.post("/api/webinar/:id/register", async (req, res) => {
  await registerForWebinar(req.params.id, req.body, req.context);
  res.json({});
});

// Handle SSR requests
app.all("*", remixHandler);

app.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`);
});
