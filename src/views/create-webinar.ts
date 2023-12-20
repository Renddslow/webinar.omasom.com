import fs from "fs/promises";
import ejs from "ejs";
import path from "path";

export const createWebinarView = async () => {
  const data = {
    metaTitle: "Create a",
    updateId: "new",
    values: {},
  };

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
