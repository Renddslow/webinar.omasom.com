import { attendeeEditor } from "./attendee-editor";
import { Context } from "../types";

export type Attendee = {
  first_name: string;
  last_name: string;
};

export const updateAttendeeView = async (id: number, ctx: Context) => {
  const attendee: Attendee = await ctx
    .db("webinar_participants")
    .where("id", id)
    .first();

  console.log(attendee);

  const webinarsAttended = await ctx
    .db("webinar_participants_webinars")
    .where("webinar_participant_id", id)
    .leftJoin(
      "webinars",
      "webinars.id",
      "webinar_participants_webinars.webinar_id",
    )
    .select("webinars.*");

  const data = {
    metaTitle: `Update "${attendee.first_name} ${attendee.last_name}"`,
    updateId: id,
    values: {
      ...attendee,
      webinars: webinarsAttended,
    },
  };

  return attendeeEditor(data);
};
