import fs from "fs/promises";
import path from "path";
import ejs from "ejs";
import { Context } from "../types";
import { format, utcToZonedTime } from "date-fns-tz";

export const listWebinarsView = async (ctx: Context) => {
  const header = await fs.readFile(
    path.join(process.cwd(), "src/templates/partials/admin-header.ejs"),
    "utf-8",
  );

  const template = await fs.readFile(
    path.join(process.cwd(), "src/templates/admin-webinar-list.ejs"),
    "utf-8",
  );

  const allWebinars = await ctx.db("webinars").select("*").limit(1000);
  const data = {
    webinars: allWebinars
      .filter((d) => new Date(d.starts_at) > new Date())
      .map((d) => ({
        ...d,
        startTime: format(
          utcToZonedTime(new Date(d.starts_at), "America/Chicago"),
          "MMM d, yyyy h:mm a",
          {
            timeZone: "America/Chicago",
          },
        ),
      })),
    pastWebinars: allWebinars
      .filter((d) => new Date(d.starts_at) < new Date())
      .map((d) => ({
        ...d,
        startTime: format(
          utcToZonedTime(new Date(d.starts_at), "America/Chicago"),
          "MMM d, yyyy h:mm a",
          {
            timeZone: "America/Chicago",
          },
        ),
      })),
  };

  return ejs.render(template, {
    header: ejs.render(header, data),
    ...data,
  });
};
