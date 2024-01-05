import { attendeeEditor } from "./attendee-editor";

export const createAttendeeView = async () => {
  const data = {
    metaTitle: "Create an",
    updateId: "new",
    values: {
      webinars: [],
    },
  };

  return attendeeEditor(data);
};
