import { Knex } from "knex";

export type Context = {
  db: Knex;
};

export type WebinarDatabaseResponse = {
  id: number;
  title: string;
};
