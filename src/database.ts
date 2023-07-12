import { knex as knexSetup } from 'knex'

export const knex = knexSetup({
  client: 'sqlite',
  connection: {
    filename: './temp/app.db',
  },
})
