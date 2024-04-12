import type { Registration, Webinar } from "~/api/types";
import { api } from "~/api/client";

export const getWebinar = async (id: string): Promise<Webinar | null> => {
  return api.getWebinar(id);
};

export const registerForWebinar = async (id: string, payload: Registration) => {
  return api.registerForWebinar(id, payload);
};
