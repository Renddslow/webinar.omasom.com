import fs from "fs/promises";
import path from "path";
import ejs from "ejs";
import { Context } from "../types";

export const listPresentersView = async (ctx: Context) => {
  const header = await fs.readFile(
    path.join(process.cwd(), "src/templates/partials/admin-header.ejs"),
    "utf-8",
  );

  const template = await fs.readFile(
    path.join(process.cwd(), "src/templates/admin-presenters.ejs"),
    "utf-8",
  );

  const presenters = await ctx.db("people").select("*").limit(1000);

  return ejs.render(template, {
    header: ejs.render(header, {
      metaTitle: "List",
    }),
    presenters,
  });
};
