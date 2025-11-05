import { Migration, sql } from 'kysely';

export const up: Migration['up'] = async (db) => {
  await db.schema
    .createTable('dap')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('user_run', 'integer', (col) => col.notNull())
    .addColumn('type', 'varchar(20)', (col) => col.notNull())
    .addColumn('currency_type', 'varchar(10)', (col) => col.notNull())
    .addColumn('status', 'varchar(20)', (col) => col.notNull())
    .addColumn('days', 'smallint', (col) => col.notNull())
    .addColumn('initial_date', 'date', (col) => col.notNull())
    .addColumn('initial_amount', 'integer', (col) =>
      col.notNull().check(sql`initial_amount >= 50000`),
    )
    .addColumn('due_date', 'date', (col) => col.notNull())
    .addColumn('final_amount', 'integer', (col) => col.notNull())
    .addColumn('profit', 'integer', (col) => col.notNull())
    .addColumn('interest_rate_in_period', 'decimal(7, 4)', (col) =>
      col.notNull(),
    )
    .addColumn('interest_rate_in_month', 'decimal(7, 4)', (col) =>
      col.notNull(),
    )
    .addForeignKeyConstraint(
      'fk_user_dap',
      ['user_run'],
      'user',
      ['run'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();
};

export const down: Migration['down'] = async (db) => {
  await db.schema.dropTable('dap').execute();
};
