export const getAllList = async (req, reply) => {
    const allList = await this.mongo.db.collection('list').aggregate().toArray();
    reply.status(200).send(allList)
};