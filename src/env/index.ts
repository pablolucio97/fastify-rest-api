import { z as Zod } from 'zod'
import { config } from 'dotenv'

if (process.env.NODE_ENV === 'test') {
    //SEARCH FOR ENV VARS ON DEFAULT test.env FILE
    config({ path: '.env.test' })
} else {
    //SEARCH FOR ENV VARS ON DEFAULT .env FILE
    config()
}

const envSchema = Zod.object({
    DATABASE_URL: Zod.string(),
    DATABASE_CLIENT: Zod.enum(['sqlite', 'pg']),
    PORT: Zod.coerce.number().default(3333),
    NODE_ENV: Zod.enum(['production', 'development', 'test']).default('production')
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('❗ Invalid environment variable', _env.error.format)
    throw new Error('❗ Invalid environment variable')
}

export const env = _env.data