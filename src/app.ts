import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)

//GLOBAL HOOK TO LOG THE CURRENT METHOD AND ROUTE CALLED
app.addHook('preHandler', async (req, res) => {
  console.log(`[${req.method}] ${req.url}`)
})

app.register(transactionsRoutes, {
  //DEFINES THE ROUTE PREFIX EX: 'users, transactions...'
  prefix: 'transactions'
})