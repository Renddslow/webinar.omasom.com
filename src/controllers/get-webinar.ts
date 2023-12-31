import fs from "fs/promises";
import ejs from "ejs";
import path from "path";

import { Context } from "../types";
import { format, utcToZonedTime } from "date-fns-tz";

export const getWebinar = async (
  id: string,
  template: "signup" | "meet",
  ctx: Context,
) => {
  const webinar = await ctx.db("webinars").where("shortcode", id).first();

  if (!webinar) {
    return null;
  }

  const startTime = format(
    utcToZonedTime(new Date(webinar.starts_at), "America/Chicago"),
    "MMMM d, yyyy h:mm a z",
    {
      timeZone: "America/Chicago",
    },
  );

  const people = await ctx
    .db("webinar_people")
    .leftJoin("people", "webinar_people.person_id", "people.id")
    .where("webinar_people.webinar_id", webinar.id);

  const data = {
    ...webinar,
    presenters: people.filter((p) => p.role === 1),
    hosts: people.filter((p) => p.role === 2),
    signups: 12,
    image: `https://ik.imagekit.io/omasom/tr:h-400,w-550,q-100${webinar.image}`,
    startTime,
    url: `https://webinar.omasom.com/w/${webinar.shortcode}`,
  };

  console.log(data);

  const header = await fs.readFile(
    path.join(process.cwd(), "src/templates/partials/header.ejs"),
    "utf-8",
  );

  const htmlTemplate = await fs.readFile(
    path.join(
      process.cwd(),
      template === "signup"
        ? "src/templates/webinar-signup.ejs"
        : "src/templates/webinar-meet.ejs",
    ),
    "utf-8",
  );

  return ejs.render(htmlTemplate, {
    header: ejs.render(header, data),
    ...data,
  });
};
