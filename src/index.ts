import polka from "polka";
import sirv from "sirv";
import compression from "compression";

import { setupDatabase } from "./middleware/setup-database";
import { getWebinar } from "./controllers/get-webinar";
import { notFound } from "./middleware/not-found";
import { createWebinarView } from "./views/create-webinar";

const PORT = process.env.PORT || 3000;

const app = polka().use(
  (req, res, next) => {
    req.context = {};
    res.setHeader("Content-Type", "text/html");
    next();
  },
  compression(),
  sirv("public", { dev: true }),
  await setupDatabase(),
  notFound,
);

app.get("/admin", (req, res) => {});
app.get("/admin/webinars", (req, res) => {});
app.get("/admin/webinars/new", async (req, res) => {
  const view = await createWebinarView();
  res.end(view);
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
