import { Migration, sql } from 'kysely';

export const up: Migration['up'] = async (db) => {
  await db.schema
    .createTable('user')
    .addColumn('run', 'integer', (col) => col.primaryKey())
    .addColumn('role', 'varchar(10)', (col) => col.notNull())
    .addColumn('password', 'binary(60)', (col) => col.notNull())
    .addColumn('password_attempts', 'smallint', (col) =>
      col.notNull().defaultTo(3),
    )
    .addColumn('enabled', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
};

export const down: Migration['down'] = async (db) => {
  await db.schema.dropTable('user').execute();
};
