import { Migration, sql } from 'kysely';

export const up: Migration['up'] = async (db) => {
  await db.schema
    .createTable('user_session')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('user_run', 'integer', (col) => col.notNull())
    .addColumn('login_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('logout_at', 'timestamp')
    .addColumn('ip_address', 'varchar(20)', (col) => col.notNull())
    .addColumn('user_agent', 'varchar(30)', (col) => col.notNull())
    .addForeignKeyConstraint('fk_user', ['user_run'], 'user', ['run'], (cb) =>
      cb.onDelete('cascade'),
    )
    .execute();
};

export const down: Migration['down'] = async (db) => {
  await db.schema.dropTable('user_session').execute();
};
