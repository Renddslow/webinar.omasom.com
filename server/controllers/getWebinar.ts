import { format, toZonedTime } from "date-fns-tz";
import type { RequestContext } from "../types";
import type { Webinar } from "~/api/types";

export const getWebinar = async (
  id: string,
  ctx: RequestContext
): Promise<Webinar | null> => {
  const webinar = await ctx.db("webinars").where("shortcode", id).first();

  if (!webinar) {
    return null;
  }

  const startTime = format(
    toZonedTime(new Date(webinar.starts_at), "America/Chicago"),
    "MMMM d, yyyy h:mm a z",
    {
      timeZone: "America/Chicago",
    }
  );

  const people = await ctx
    .db("webinar_people")
    .leftJoin("people", "webinar_people.person_id", "people.id")
    .where("webinar_people.webinar_id", webinar.id);

  const handouts =
    (await ctx
      .db("webinar_handouts")
      .where("webinar_id", webinar.id)
      .orderBy("order", "asc")) || [];

  const participants = await ctx
    .db("webinar_participants")
    .where("webinar_participants.webinar_id", webinar.shortcode);

  return {
    id: webinar.shortcode,
    title: webinar.title,
    description: webinar.description,
    startsAt: webinar.starts_at,
    presenters: people.filter((p) => p.role === 1),
    hosts: people.filter((p) => p.role === 2),
    handouts,
    signups: participants.length,
    image: `https://ik.imagekit.io/omasom/tr:h-400,w-550,q-100${webinar.image}`,
    startTime,
    url: `https://webinar.omasom.com/w/${webinar.shortcode}`,
  };
};
