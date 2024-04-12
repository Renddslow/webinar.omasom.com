import knex from "knex";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import type { Middleware } from "trough";

const DB_PATH = process.env.DB_PATH || "db.sqlite";

export const setupDatabase = async (): Promise<Middleware> => {
  console.log("Setting up database");
  const database = knex({
    client: "better-sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: path.join(process.cwd(), DB_PATH),
    },
  });

  // Standup migrations table
  try {
    await database("_migrations").select();
  } catch (e) {
    await database.schema.createTable("_migrations", (table) => {
      table.string("file_name").notNullable();
      table.string("sha").notNullable();
      table.timestamp("created_at").defaultTo(database.fn.now());
    });
  }

  const migrationFiles = await Promise.all(
    (
      await fs.readdir(path.join(process.cwd(), "migrations"))
    ).map(async (file) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "migrations", file)
      );
      const hex = crypto.createHash("sha256").update(content).digest("hex");
      return {
        path: path.join(process.cwd(), "migrations", file),
        name: file,
        content,
        sha: hex,
      };
    })
  );

  const migrations = await database("_migrations").select();
  const filteredMigrations = migrationFiles.filter((m) => {
    return !migrations.find(
      (m2) => m2.sha === m.sha && m2.file_name === m.name
    );
  });

  for (const migration of filteredMigrations) {
    await database.transaction(async (trx) => {
      for (const statement of migration.content
        .toString()
        .split(";")
        .filter((s) => s.trim())) {
        await trx.raw(statement);
      }
      await trx("_migrations").insert({
        file_name: migration.name,
        sha: migration.sha,
      });
    });
  }
  return (req, res, next) => {
    req.context.db = database;
    next();
  };
};
