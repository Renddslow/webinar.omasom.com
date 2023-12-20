import fs from "fs/promises";
import ejs from "ejs";
import path from "path";

import { Context } from "../types";

export const getWebinar = async (id: string, ctx: Context) => {
  const webinar = await ctx.db("webinars").where({ id }).first();
  if (!webinar) {
    return null;
  }

  const data = {};

  const header = await fs.readFile(
    path.join(process.cwd(), "src/templates/partials/header.ejs"),
    "utf-8",
  );

  const template = await fs.readFile(
    path.join(process.cwd(), "src/templates/webinar-signup.ejs"),
    "utf-8",
  );

  return ejs.render(template, {
    header: ejs.render(header, data),
    data,
  });
};
