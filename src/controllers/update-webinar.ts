import { Context } from "../types";

export type UpdateWebinarInput = {
  title: string;
  description: string;
  meeting_link: string;
  starts_at: string;
  image: string;
  handouts: { type: string; url: string }[];
};

export const updateWebinar = async (
  shortcode: string,
  body: UpdateWebinarInput,
  ctx: Context,
) => {
  const { title, description, meeting_link, starts_at, image, handouts } = body;

  await ctx
    .db("webinars")
    .update({
      title,
      description,
      meeting_link,
      starts_at,
      image,
      updated_at: ctx.db.fn.now(),
    })
    .where("shortcode", shortcode);
};
