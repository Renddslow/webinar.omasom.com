import fs from "fs/promises";
import path from "path";
import ejs from "ejs";
import { Context } from "../types";

export const listAttendeesView = async (ctx: Context) => {
  const header = await fs.readFile(
    path.join(process.cwd(), "src/templates/partials/admin-header.ejs"),
    "utf-8",
  );

  const template = await fs.readFile(
    path.join(process.cwd(), "src/templates/admin-attendees.ejs"),
    "utf-8",
  );

  const attendees = await ctx
    .db("webinar_participants")
    .select("*")
    .limit(1000);

  return ejs.render(template, {
    header: ejs.render(header),
    attendees,
  });
};
