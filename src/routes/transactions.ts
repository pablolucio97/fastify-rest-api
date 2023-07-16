import { FastifyInstance } from "fastify"
import { knex } from '../database'
import { z as Zod } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from "../middlewares/checkSessionIdExists"

export async function transactionsRoutes(app: FastifyInstance) {
    app.post('/', async (req, rep) => {

        //SCHEMA FOR ZOD REQUEST BODY VALIDATION
        const createTransactionBodySchema = Zod.object({
            title: Zod.string(),
            amount: Zod.number(),
            type: Zod.enum(['credit', 'debit'])
        })

        //VALIDATES IF THE RECEIVED BODY IS VALID, OTHERWISE THROWS AN ERROR
        const { title, amount, type } = createTransactionBodySchema.parse(req.body)

        //READ sessionID
        let sessionId = req.cookies.sessionId

        if (!sessionId) {
            // IF sessionId DOESN'T EXISTS ASSIGN A randomUUID() TO IT
            sessionId = randomUUID()
            // RETURNS ON RESPONSE A NEW COOKIE NAMED AS sessionId READABLE FOR ALL ROUTES
            rep.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 DAYS
            })
        }

        //INSERTS A NEW TRANSACTION INTO TRANSACTIONS
        await knex('transactions').insert({
            id: randomUUID(),
            title,
            //INSERT THE AMOUNT VALUE AS CREDIT OR DEBIT
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId
        })

        return rep.status(201).send()
    })

    app.get('/', {
        preHandler: [checkSessionIdExists]
    }, async (req, res) => {
        const { sessionId } = req.cookies
        //GET ALL TRANSACTIONS FROM TRANSACTIONS TABLE
        const transactions = await knex('transactions')
            .where('session_id', sessionId)
            .select('*')
        return { transactions }
    })

    app.get('/:id', {
        preHandler: [checkSessionIdExists]
    }, async (req) => {
        //SCHEMA FOR CHECK ID AS STRING AND UUID
        const getTransactionIdParam = Zod.object({
            id: Zod.string().uuid()
        })

        //VALIDATES THE ID FROM REQ.PARAM
        const { id } = getTransactionIdParam.parse(req.params)
        const { sessionId } = req.cookies

        //GET THE SINGLE TRANSACTION THAT MATCHES TO THE ID WHERE REQ.ID = ID
        const transaction = await knex('transactions')
            .where({
                'id': id,
                session_id: sessionId
            })
            .first()

        return {
            transaction
        }
    })

    app.get('/total', {
        preHandler: [checkSessionIdExists]
    }, async (req) => {
        const { sessionId } = req.cookies
        //GET THE SUM OF ALL TRANSACTIONS
        const totalTransactions = await knex('transactions')
            .where('session_id', sessionId)
            .sum('amount', { as: 'amount' }).first()
        return { totalTransactions }
    })


}
