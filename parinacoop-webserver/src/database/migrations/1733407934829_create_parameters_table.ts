import { Migration } from 'kysely';

export const up: Migration['up'] = async (db) => {
  await db.schema
    .createTable('parameter')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('minimum_days', 'integer', (col) => col.notNull())
    .addColumn('maximum_days', 'integer', (col) => col.notNull())
    .addColumn('interest_rate_base', 'decimal(7, 4)', (col) => col.notNull())
    .execute();
};

export const down: Migration['down'] = async (db) => {
  await db.schema.dropTable('parameter').execute();
};
