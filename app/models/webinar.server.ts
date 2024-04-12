import type { Webinar } from "~/api/types";

export const getWebinar = async (id: string): Promise<Webinar> => {
  return {
    title: "Hello",
    description: "",
    image: "",
    url: "/",
    presenters: [],
    startsAt: "2021-01-01T00:00:00.000Z",
  };
};
