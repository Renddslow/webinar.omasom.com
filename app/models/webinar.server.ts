import type { Webinar } from "~/api/types";
import { api } from "~/api/client";

export const getWebinar = async (id: string): Promise<Webinar | null> => {
  return api.getWebinar(id);
};
