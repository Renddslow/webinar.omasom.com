export type Webinar = {
  title: string;
  description: string;
  image: string;
  url: string;
  startsAt: string;
  presenters: Presenter[];
};

export type Presenter = {
  name: string;
  image: string;
};
