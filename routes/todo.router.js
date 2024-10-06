import { getAllTodos } from '../controllers/todo.controller.js'

async function todoRouter(fastify) {
    fastify.route({
        method: 'GET',
        url: '/:todoId',
        handler: getAllTodos
    })
}

export default todoRouter