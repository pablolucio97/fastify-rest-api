import { FastifyInstance } from "fastify"
import { knex } from '../database'

export async function transactionsRoutes(app : FastifyInstance){
    app.get('/test', async () => {
        const tables = await knex('transactions').select('*')
          .where('amount', 1000.99)
        return tables
      })
}
  