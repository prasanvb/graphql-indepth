import { connection } from '../utils/connection.js';
import { users } from '../mocks/users.js';
import { jobs } from '../mocks/jobs.js';
import { companies } from '../mocks/companies.js';

const initialSeed = async () => {
  const { schema } = connection;
  try {
    await schema.dropTableIfExists('user');
    await schema.dropTableIfExists('job');
    await schema.dropTableIfExists('company');

    await schema.createTable('company', (table) => {
      table.text('id').notNullable().primary();
      table.text('name').notNullable();
      table.text('description');
    });

    await schema.createTable('job', (table) => {
      table.text('id').notNullable().primary();
      table.text('companyId').notNullable().references('id').inTable('company');
      table.text('title').notNullable();
      table.text('description');
      table.text('createdAt').notNullable();
    });

    await schema.createTable('user', (table) => {
      table.text('id').notNullable().primary();
      table.text('companyId').notNullable().references('id').inTable('company');
      table.text('email').notNullable().unique();
      table.text('password').notNullable();
    });

    await connection.table('company').insert(companies);
    await connection.table('job').insert(jobs);
    await connection.table('user').insert(users);

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

initialSeed();
