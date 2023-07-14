import { z as Zod } from 'zod'

const envSchema = Zod.object({
    DATABASE_URL: Zod.string(),
    PORT: Zod.number().default(3333),
    NODE_ENV: Zod.enum(['production', 'development', 'test']).default('production')

})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('❗ Invalid environment variable', _env.error.format)
    throw new Error('❗ Invalid environment variable')
}

export const env = _env.data