import type { Webinar } from "~/api/types";
import { env } from "~/utils/helpers";

export const api = {
  async get<T>(path: string): Promise<T | null> {
    const data = await fetch(env("BASE_API_URL") + "/api/" + path).then((d) =>
      d.json()
    );

    if (!data) {
      return null;
    }

    return data as T;
  },

  async getWebinar(id: string): Promise<Webinar | null> {
    return this.get<Webinar>(`webinar/${id}`);
  },
};
