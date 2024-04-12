import type { Webinar } from "~/api/types";

export const getWebinar = async (id: string): Promise<Webinar> => {
  return {
    title: "Hello",
    description: "",
    image: "",
    url: "/",
  };
};
