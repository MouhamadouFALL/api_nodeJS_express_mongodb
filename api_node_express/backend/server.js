const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')



const app = express()
const PORT = 5151
app.listen(PORT, () => { console.log(`app API listening on port : ${PORT}`) })

// create application/json parser
app.use(bodyParser.json())

const Schema = mongoose.Schema

const postScheme = new Schema({
    title: {
        type : String,
        require: true
    },
    content: {
        type : String,
        require : true
    },
    author: String,
    category: String,
    createdAt: {
        type: String,
        index: true,
        unique: true
    }
})

const Post = mongoose.model('Post', postScheme)

let uri = "mongodb://localhost:27017/blog"
mongoose.connect(uri).then( () => { console.log("successfully to connected on DB!") })


app.get('/api/posts', (req, res) => {
    Post.find({}, (e, posts) => {
        if(e){
            res.status(400).error(e)
            return
        }
        res.status(200).send({
            response: posts
        })
    })
    
})

app.get('/api/posts/:id', (req, res) => {
    let identity = req.params.id
    Post.findById(identity, (e, post) => {

        if (e || !post) {
            res.status(400).send({
                e: true,
                msg : " post not found"
            })
        }
        else{
            res.status(200).send({
                response: post
            })
        }
    })
})



// save post
app.post('/api/posts', (req, res) => {
    
    const {body} = req
    const newPost = Post(body)
    newPost.save(e => {
        if (e) {
            res.status(400).send({
                error : true,
                message : `Post not save: ${e}` 
            })
            return
        }
        else{
            res.status(200).send({
                message : `Post save success!`
            })
        }
    })
})


app.put('/api/posts/:id', (req, res) => {

    const identity = req.params.id
    const upPost = req.body
    Post.updateOne( { _id : identity}, upPost, e => {
        if (e) {
            res.status(400).send({
                error : true,
                message : `Post not update: ${e}` 
            })
            return
        }
        else{
            res.status(200).send({
                message : `Post update success!`
            })
        }
    })

})



