import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
const app = fastify()
const port = 3336

app.register(transactionsRoutes)

app.listen(
  {
    port,
  },
  () => {
    console.log(`Server running at ${port}`)
  },
)
