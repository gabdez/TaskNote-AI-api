const express = require('express')
const app = express()
const port = process.env.API_PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/notes', (req, res) => {
    res.send(`TaskNote.ai API listening on port ${port} - jambutt`);
})

console.log(`TaskNote.ai API listening on port ${port}`)
// Import the framework and instantiate it
import { DB_PASSWORD, DB_USERNAME, DB_NAME } from './config/index.js';
import fastify from 'fastify'
import mongodb from "@fastify/mongodb"
import pino from 'pino';
import todoRouter from './routes/todo.router.js'
import listRouter from './routes/list.router.js';
import { loadConfig } from './config/index.js'
loadConfig()

const db_config = {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    database: DB_NAME,
    url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/?retryWrites=true&w=majority&appName=Cluster0`
};


const startServer = async () => {
    try {
        const server = fastify({
            logger: pino({ level: 'info' }),
        })
        server.register(mongodb, db_config)
        server.register(todoRouter, { prefix: '/api/user' })
        server.register(listRouter, { prefix: '/api/post' })
        server.setErrorHandler((error, request, reply) => {
            server.log.error(error);
        })
        server.get('/', (request, reply) => {
            reply.send({ name: 'fastify-typescript' })
        })
        server.get('/health-check', async (request, reply) => {
            reply.status(200).send()
        })
        if (process.env.NODE_ENV === 'production') {
            for (const signal of ['SIGINT', 'SIGTERM']) {
                process.on(signal, () =>
                    server.close().then((err) => {
                        console.log(`close application on ${signal}`)
                        process.exit(err ? 1 : 0)
                    }),
                )
            }
        }
        await server.listen(port)
    } catch (e) {
        console.error(e)
    }
}

process.on('unhandledRejection', (e) => {
    console.error(e)
    process.exit(1)
})

app.listen(port, (message) => {
    console.log("app listen to port: " + port);
});

startServer()