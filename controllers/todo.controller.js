export const getAllTodos = async (req, reply) => {
    // Or this.mongo.client.db('mydb').collection('users')
    const todos = await this.mongo.db.collection('todos').aggregate().toArray();
    console.log(todos);

    return "ok";
};