import { Migration, sql } from 'kysely';

export const up: Migration['up'] = async (db) => {
  await db.schema
    .createTable('client_profile')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('user_run', 'integer', (col) => col.unique().notNull())
    .addColumn('document_number', 'integer', (col) => col.notNull().unique())
    .addColumn('email', 'varchar(50)', (col) => col.notNull().unique())
    .addColumn('cellphone', 'varchar(20)', (col) => col.notNull())
    .addColumn('names', 'varchar(50)')
    .addColumn('first_last_name', 'varchar(20)')
    .addColumn('second_last_name', 'varchar(20)')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addForeignKeyConstraint(
      'fk_user_client',
      ['user_run'],
      'user',
      ['run'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();
};

export const down: Migration['down'] = async (db) => {
  await db.schema.dropTable('client_profile').execute();
};
