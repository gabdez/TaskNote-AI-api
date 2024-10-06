const express = require('express')
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express()
const port = process.env.PORT || 4000;

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL;

const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

app.get('/', (req, res) => {
    run();
    res.send('Hello World!')
})

app.get('/notes', (req, res) => {
    res.send(`TaskNote.ai API listening on port ${port} - jambutt`);
})

app.listen(port, async () => {
    await run();
    console.log(`TaskNote.ai API listening on port ${port}`)
})