import { Context } from "../types";
import { getShortcode } from "../utils/get-shortcode";

export type CreateWebinarInput = {
  title: string;
  description: string;
  meeting_link: string;
  starts_at: string;
  image: string;
};
export const createWebinar = async (body: CreateWebinarInput, ctx: Context) => {
  const { title, description, meeting_link, starts_at, image } = body;

  const shortcode = getShortcode();

  await ctx.db("webinars").insert(
    {
      title,
      description,
      meeting_link,
      starts_at,
      image,
      shortcode,
      created_at: ctx.db.fn.now(),
      updated_at: ctx.db.fn.now(),
    },
    ["id", "shortcode"],
  );

  return shortcode;
};
