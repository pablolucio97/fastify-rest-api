import { it, expect, beforeAll, afterAll, describe } from 'vitest'
import supertest from 'supertest'
import { app } from '../app'


beforeAll(async () => {
    //await for fastify starts its plugins
    app.ready()
})

afterAll(async () => {
    await app.close()
})

describe('Transactions', () => {
    it('Allow user to create a new transaction', async () => {
        const response = await supertest(app.server)
            .post('/transactions')
            .send({
                title: "Freela",
                amount: 5000,
                type: "credit"
            })
        expect(response.statusCode).toBe(201)
    })

    it('should be able to list transactions', async () => {

        const createTransactionResponse = await supertest(app.server)
            .post('/transactions')
            .send({
                title: "Freela",
                amount: 5000,
                type: "credit"
            })

        //READ THE COOKIE FROM createTransactionResponse    
        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await supertest(app.server)
            .get('/transactions')
            //SET THE MANDATORY COOKIE FOR LIST TRANSACTIONS
            .set('Cookie', cookies)
        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: "Freela",
                amount: 5000
            })
        ])
    })
})