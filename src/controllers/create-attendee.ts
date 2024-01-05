import { Context } from "../types";

export type CreateAttendeeInput = {
  first_name: string;
  last_name: string;
  email: string;
  grade:
    | "9th Grade"
    | "10th Grade"
    | "11th Grade"
    | "12th Grade"
    | "High School Graduate"
    | "Other";
};

export const createAttendee = async (
  body: CreateAttendeeInput,
  ctx: Context,
) => {
  return ctx.db("webinar_participants").insert(
    {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      grade: body.grade,
      created_at: ctx.db.fn.now(),
      updated_at: ctx.db.fn.now(),
    },
    ["id", "first_name", "last_name", "email", "grade"],
  );
};
