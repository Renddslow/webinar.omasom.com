import type { Knex } from "knex";

export type RequestContext = {
  db: Knex;
};
