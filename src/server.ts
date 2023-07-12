import fastify from 'fastify'
import { knex } from './database'
const app = fastify()
const port = 3336

app.get('/test', async () => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

app.listen(
  {
    port,
  },
  () => {
    console.log(`Server running at ${port}`)
  },
)
