import { FastifyInstance } from "fastify"
import { knex } from '../database'
import { z as Zod } from 'zod'
import { randomUUID } from 'node:crypto'

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

        //INSERTS A NEW TRANSACTION INTO TRANSACTIONS
        await knex('transactions').insert({
            id: randomUUID(),
            title,
            //INSERT THE AMOUNT VALUE AS CREDIT OR DEBIT
            amount: type === 'credit' ? amount : amount * -1
        })

        return rep.status(201).send()
    })

    app.get('/', async () => {
        //GET ALL TRANSACTIONS FROM TRANSACTIONS TABLE
        const transactions = await knex('transactions').select('*')
        return { transactions }
    })

    app.get('/:id', async (req) => {
        //SCHEMA FOR CHECK ID AS STRING AND UUID
        const getTransactionIdParam = Zod.object({
            id: Zod.string().uuid()
        })

        //VALIDATES THE ID FROM REQ.PARAM
        const { id } = getTransactionIdParam.parse(req.params)

        //GET THE SINGLE TRANSACTION THAT MATCHES TO THE ID WHERE REQ.ID = ID
        const transaction = await knex('transactions').where('id', id).first()

        return{
            transaction
        }
    })


}
