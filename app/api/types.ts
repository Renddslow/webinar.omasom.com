export type Webinar = {
  id: string;
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

export type Registration = {
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  emailConsent: boolean;
};

export type Person = {
  name: string;
  image: string;
  title: string;
  org: string;
};

export type Handout = {
  title: string;
  description: string;
  thumbnail: string;
  file: string;
  order: number;
};
