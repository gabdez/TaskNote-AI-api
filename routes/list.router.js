import { getAllList } from '../controllers/list.controller.js'

async function listRouter(fastify) {
    fastify.route({
        method: 'GET',
        url: '/getAll',
        handler: getAllList
    })
}

export default listRouter