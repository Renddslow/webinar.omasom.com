import polka from "polka";
import sirv from "sirv";
import compression from "compression";
import bodyParser from "body-parser";

import { setupDatabase } from "./middleware/setup-database";
import { getWebinar } from "./controllers/get-webinar";
import { notFound } from "./middleware/not-found";
import { createWebinarView } from "./views/create-webinar";
import { createWebinar } from "./controllers/create-webinar";

const PORT = process.env.PORT || 3000;

const app = polka().use(
  (req, res, next) => {
    req.context = {};
    res.setHeader("Content-Type", "text/html");
    res.json = <T>(body: T | Record<string, unknown>, status = 200) => {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = status;
      return res.end(JSON.stringify(body));
    };
    next();
  },
  compression(),
  sirv("public", { dev: true }),
  await setupDatabase(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  notFound,
);

app.get("/admin", (req, res) => {});
app.get("/admin/webinars", (req, res) => {});
app.get("/admin/webinars/new", async (_, res) => {
  const view = await createWebinarView();
  res.end(view);
});
app.post("/admin/webinars/new", async (req, res) => {
  await createWebinar(req.body, req.context);
  res.json({ ok: true });
});
app.get("/admin/webinars/:id", (req, res) => {});

app.get("/w/:id", async (req, res) => {
  console.log(req.params);
  const page = await getWebinar(req.params.id, req.context);
  if (!page) {
    return res.notFound();
  }
  res.end(page);
});

app.get("/w/:id/meet", (req, res) => {
  res.end("meet");
});
// app.get("*", (req, res) => {
//   console.log("404");
//   return res.notFound();
// });

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
