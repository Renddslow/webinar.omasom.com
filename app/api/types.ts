export type Webinar = {
  title: string;
  description: string;
  image: string;
  url: string;
  startsAt: string;
  presenters: Person[];
  hosts: Person[];
  handouts: Handout[];
  signups: number;
  startTime: string;
};

export type Person = {
  name: string;
  image: string;
};

export type Handout = {
  title: string;
  description: string;
  thumbnail: string;
  file: string;
  order: number;
};
