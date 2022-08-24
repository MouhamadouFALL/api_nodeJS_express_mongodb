const express = require('express')
const data = require('./posts')
const mongoose = require('mongoose')


const app = express()
const PORT = 5151

let name = 'mongodb://localhost:27017/posts'
mongoose.connect()


app.get('/api/posts', (req, res) => {
    res.send(data)
})

app.get('/api/posts/:id', (req, res) => {
    let identity = req.params.id
    const post = data.filter(p => p.id == identity)

    res.send(post[0])
})

app.listen(PORT, () => { console.log(`app API listening on port : ${PORT}`) })

