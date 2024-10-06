import envSchema from 'env-schema'
import dotenv from 'dotenv'
import path from 'path'
import S from 'fluent-json-schema'

export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

export const loadConfig = () => {
    const result = dotenv.config({
        path: path.join(__dirname, '..', '..', '.env'),
    })

    if (result.error) {
        throw new Error(result.error)
    }

    envSchema({
        data: result.parsed,
        schema: S.object()
            .prop(
                'NODE_ENV',
                S.string().enum(['dev', 'production']).required(),
            )
            .prop('API_HOST', S.string().required())
            .prop('API_PORT', S.string().required())
            .prop('DB_URL', S.string().required())
            .prop('DB_USERNAME', S.string().required())
            .prop('DB_PASSWORD', S.string().required())
            .prop('DB_NAME', S.string().required()),
    })
}