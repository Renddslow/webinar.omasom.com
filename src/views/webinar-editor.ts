import fs from "fs/promises";
import path from "path";
import ejs from "ejs";

export const webinarEditor = async (data) => {
  const header = await fs.readFile(
    path.join(process.cwd(), "src/templates/partials/admin-header.ejs"),
    "utf-8",
  );

  const template = await fs.readFile(
    path.join(process.cwd(), "src/templates/admin-webinar.ejs"),
    "utf-8",
  );

  return ejs.render(template, {
    header: ejs.render(header, data),
    ...data,
  });
};
