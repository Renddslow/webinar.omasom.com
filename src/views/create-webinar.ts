import fs from "fs/promises";
import ejs from "ejs";
import path from "path";
import { webinarEditor } from "./webinar-editor";

export const createWebinarView = async () => {
  const data = {
    metaTitle: "Create a",
    updateId: "new",
    values: {},
  };

  return webinarEditor(data);
};
