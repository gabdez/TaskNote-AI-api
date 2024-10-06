const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/notes', (req, res) => {
    res.send(`TaskNote.ai API listening on port ${port} - jambutt`);
})

app.listen(port, () => {
    console.log(`TaskNote.ai API listening on port ${port}`)
})