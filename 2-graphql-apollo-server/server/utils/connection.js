import knex from 'knex';

export const connection = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './database/db.sqlite3',
  },
  useNullAsDefault: true,
});

connection.on('query', (data) => {
  const { sql, bindings } = data;
  const query = connection.raw(sql, bindings).toQuery();

  console.log('DB connection: ', query);
});
