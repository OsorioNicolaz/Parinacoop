import { Migration } from 'kysely';

export const up: Migration['up'] = async (db) => {
  await db.schema
    .createTable('region')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar(50)', (col) => col.notNull())
    .addColumn('roman_number', 'varchar(10)', (col) => col.notNull())
    .addColumn('number', 'smallint', (col) => col.notNull())
    .addColumn('abbreviation', 'varchar(10)', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('commune')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar(50)', (col) => col.notNull())
    .addColumn('postal_code', 'integer', (col) => col.notNull())
    .addColumn('region_id', 'integer', (col) => col.notNull())
    .addForeignKeyConstraint(
      'fk_region_commune',
      ['region_id'],
      'region',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();
};

export const down: Migration['down'] = async (db) => {
  await db.schema.dropTable('region').execute();
  await db.schema.dropTable('commune').execute();
};
