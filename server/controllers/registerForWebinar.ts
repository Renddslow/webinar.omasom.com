import type { Registration } from "~/api/types";
import type { RequestContext } from "../types";

export const registerForWebinar = async (
  id: string,
  payload: Registration,
  ctx: RequestContext
) => {
  await ctx.db("webinar_participants").insert({
    first_name: payload.firstName,
    last_name: payload.lastName,
    grade: payload.grade,
    email: payload.email,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    email_consent: payload.emailConsent,
    webinar_id: id,
  });
};
