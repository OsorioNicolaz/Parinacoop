import { Migration } from 'kysely';
import { Database } from '../database';
import { regions_communes } from '../seed/regions';

export const up: Migration['up'] = async (db: Database) => {
  const communes: {
    name: string;
    postal_code: number;
    region_id: number;
  }[] = [];
  for (const region of regions_communes) {
    const { communes: communesInternal, ...regionData } = region;

    const { insertId } = await db
      .insertInto('region')
      .values(regionData)
      .executeTakeFirstOrThrow();

    console.log(`Inserted region ${region.name} with id ${insertId}`);

    const communesToInsert = communesInternal.map((commune) => ({
      name: commune.name,
      postal_code: commune.postal_code,
      region_id: Number(insertId),
    }));

    communes.push(...communesToInsert);
  }

  console.log('Inserting communes');
  await db.insertInto('commune').values(communes).execute();
};

export const down: Migration['down'] = async (db) => {
  await db.deleteFrom('commune').execute();
  await db.deleteFrom('region').execute();
};
