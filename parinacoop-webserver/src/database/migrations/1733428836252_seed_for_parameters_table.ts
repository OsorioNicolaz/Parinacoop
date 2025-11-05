import { Migration } from 'kysely';
import { Database } from '../database';
import { parameters } from '../seed/parameters';

export const up: Migration['up'] = async (db: Database) => {
  await db.insertInto('parameter').values(parameters).execute();
};

export const down: Migration['down'] = async (db) => {
  await db.deleteFrom('parameter').execute();
};
