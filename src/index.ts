import polka from "polka";
import sirv from "sirv";
import compression from "compression";
import bodyParser from "body-parser";
import crypto from "crypto";

import { setupDatabase } from "./middleware/setup-database";
import { getWebinar } from "./controllers/get-webinar";
import { notFound } from "./middleware/not-found";
import { createWebinarView } from "./views/create-webinar";
import { createWebinar } from "./controllers/create-webinar";
import { updateWebinarView } from "./views/update-webinar";
import { listWebinarsView } from "./views/list-webinars";
import { listPresentersView } from "./views/list-presenters";
import { listAttendeesView } from "./views/list-attendees";
import { createAttendeeView } from "./views/create-attendee";
import { createAttendee } from "./controllers/create-attendee";
import { updateAttendeeView } from "./views/update-attendee";

const PORT = process.env.PORT || 3000;
const IMAGE_KIT_KEY = process.env.IMAGE_KIT_KEY || "";

const app = polka().use(
  (req, res, next) => {
    req.context = {};
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

// Admin
app
  .get("/admin", (req, res) => {})
  /**
   * Webinars
   */
  .get("/admin/webinars", async (req, res) => {
    const view = await listWebinarsView(req.context);
    res.end(view);
  })
  .get("/admin/webinars/new", async (_, res) => {
    const view = await createWebinarView();
    res.end(view);
  })
  .post("/admin/webinars/new", async (req, res) => {
    const shortcode = await createWebinar(req.body, req.context);
    res.json({ ok: true, shortcode });
  })
  .get("/admin/webinars/:id", async (req, res) => {
    const view = await updateWebinarView(req.params.id, req.context);
    res.end(view);
  })
  /**
   * Presenters
   */
  .get("/admin/presenters", async (req, res) => {
    const view = await listPresentersView(req.context);
    res.end(view);
  })
  .get("/admin/presenters/new", async (req, res) => {})
  .get("/admin/presenters/:id", async (req, res) => {})
  /**
   * Attendees
   */
  .get("/admin/attendees", async (req, res) => {
    const view = await listAttendeesView(req.context);
    res.end(view);
  })
  .get("/admin/attendees/new", async (_, res) => {
    const view = await createAttendeeView();
    res.end(view);
  })
  .post("/admin/attendees/new", async (req, res) => {
    const attendee = await createAttendee(req.body, req.context);
    res.json({ ok: true, ...attendee[0] });
  })
  .get("/admin/attendees/:id", async (req, res) => {
    const view = await updateAttendeeView(req.params.id, req.context);
    res.end(view);
  })
  .post("/admin/attendees/:id", async (req, res) => {})
  /**
   * Utils
   */
  .get("/admin/utils/upload-key", (_, res) => {
    const token = crypto.randomUUID();
    const expire = Date.now() / 1000 + 60 * 5;
    const signature = crypto
      .createHmac("sha1", IMAGE_KIT_KEY)
      .update(token + expire)
      .digest("hex");
    res.json({
      token,
      expire,
      signature,
    });
  });

// Public
app
  .get("/w/:id", async (req, res) => {
    const page = await getWebinar(req.params.id, "signup", req.context);
    if (!page) {
      return res.notFound();
    }
    res.end(page);
  })
  .get("/w/:id/meet", async (req, res) => {
    const page = await getWebinar(req.params.id, "meet", req.context);
    if (!page) {
      return res.notFound();
    }
    res.end(page);
  });

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
