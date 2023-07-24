import { test, expect, beforeAll, afterAll } from 'vitest'
import supertest from 'supertest'
import { app } from '../app'


beforeAll(async () => {
    //await for fastify starts its plugins
    app.ready()
})

afterAll(async () => {
    await app.close()
})

test('Allow user to create a new transaction', async () => {
    const response = await supertest(app.server)
        .post('/transactions')
        .send({
            title: "Freela",
            amount: 5000,
            type: "credit"
        })
    expect(response.statusCode).toBe(201)
})