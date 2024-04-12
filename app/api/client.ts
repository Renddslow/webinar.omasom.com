import type { Registration, Webinar } from "~/api/types";
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

  async post<T>(path: string, payload: T) {
    await fetch(env("BASE_API_URL") + "/api/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },

  async getWebinar(id: string): Promise<Webinar | null> {
    return this.get<Webinar>(`webinar/${id}`);
  },

  async registerForWebinar(id: string, payload: Registration) {
    return this.post<Registration>(`webinar/${id}/register`, payload);
  },
};
