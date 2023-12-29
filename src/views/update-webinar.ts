import { Context, WebinarDatabaseResponse } from "../types";
import { webinarEditor } from "./webinar-editor";

export const updateWebinarView = async (id: number, ctx: Context) => {
  const webinar = await ctx
    .db<WebinarDatabaseResponse>("webinars")
    .where({ id })
    .first();

  if (!webinar) {
    return null;
  }

  const data = {
    metaTitle: `Update "${webinar.title}" `,
    updateId: id,
    values: webinar,
  };

  return webinarEditor(data);
};
