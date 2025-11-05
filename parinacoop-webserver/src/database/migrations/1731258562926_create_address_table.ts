import { Migration, sql } from 'kysely';

export const up: Migration['up'] = async (db) => {
  await db.schema
    .createTable('address')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('user_run', 'integer', (col) => col.notNull())
    .addColumn('type_address', 'varchar(20)', (col) => col.notNull())
    .addColumn('street', 'varchar(50)', (col) => col.notNull())
    .addColumn('number', 'smallint', (col) => col.notNull())
    .addColumn('detail', 'varchar(50)')
    .addColumn('commune_id', 'integer')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addForeignKeyConstraint(
      'fk_commune_address',
      ['commune_id'],
      'commune',
      ['id'],
      (cb) => cb.onDelete('set null'),
    )
    .addForeignKeyConstraint(
      'fk_user_address',
      ['user_run'],
      'user',
      ['run'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();
};

export const down: Migration['down'] = async (db) => {
  await db.schema.dropTable('address').execute();
};
