import { Context, WebinarDatabaseResponse } from "../types";
import { webinarEditor } from "./webinar-editor";
import { utcToZonedTime, format } from "date-fns-tz";

export const updateWebinarView = async (id: number, ctx: Context) => {
  const webinar = await ctx
    .db<WebinarDatabaseResponse>("webinars")
    .where("shortcode", id)
    .first();

  if (!webinar) {
    return null;
  }

  const startsAt = format(
    utcToZonedTime(new Date(webinar.starts_at), "America/Chicago"),
    "yyyy-MM-dd'T'HH:mm",
    {
      timeZone: "America/Chicago",
    },
  );

  const data = {
    metaTitle: `Update "${webinar.title}" `,
    updateId: id,
    values: { ...webinar, starts_at: startsAt },
  };

  return webinarEditor(data);
};
