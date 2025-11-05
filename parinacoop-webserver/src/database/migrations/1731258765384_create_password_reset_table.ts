import { Migration, sql } from 'kysely';

export const up: Migration['up'] = async (db) => {
  await db.schema
    .createTable('password_reset')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('user_run', 'integer', (col) => col.notNull())
    .addColumn('token', 'varchar(100)', (col) => col.notNull())
    .addColumn('expires_at', 'timestamp', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addForeignKeyConstraint(
      'fk_user_password_reset',
      ['user_run'],
      'user',
      ['run'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();
};

export const down: Migration['down'] = async (db) => {
  await db.schema.dropTable('password_reset').execute();
};
