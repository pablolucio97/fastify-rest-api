import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'

const port = 3336
const app = fastify()

app.register(transactionsRoutes, {
  //DEFINES THE ROUTE PREFIX EX: 'users, transactions...'
  prefix: 'transactions'
})

app.listen(
  {
    port,
  },
  () => {
    console.log(`Server running at ${port}`)
  },
)
