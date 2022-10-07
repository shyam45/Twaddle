import express from 'express'
import { postHelper } from '../helpers/postHelper.js'
import { authenticateToken } from '../middleware/authenticateToken.js'
const router = express.Router()

// create a post

router.post('/',async (req,res) => {
    postHelper.createPost(req.body).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

// view posts

router.get('/timeline/:id',(req,res)=>{
    postHelper.timeline(req.params.id).then((response)=>{
        res.status(200).json(response)
    }).catch((error)=>{
        res.status(500).json(error)
    })
})

// view all posts



// update post

router.put('/',(req,res)=>{
    postHelper.editPost(req.body).then(()=>{
        res.status(200).json('post updated')
    }).catch((err)=>{
        res.status(500).json(err)
    })
})
export default router

// delete post

router.delete('/:id',(req,res)=>{
    postHelper.deletePost(req.params.id).then(()=>{
        res.status(200).json('post deleted')
    }).catch(()=>{
        res.status(500).json('something went wrong')
    })
})

// like or dislike post

router.put('/like/:id',(req,res)=>{
    postHelper.likeOrDislike(req.body.user_id,req.params.id).then((response)=>{
        res.status(200).json(response)
    }).catch(()=>{
        res.status(500).json('something went wrong')
    })
})

// add comment

router.put('/comment/:id',(req,res)=>{
    postHelper.addComment(req.body,req.params.id).then(()=>{
        res.status(200)
    }).catch((error)=>{
        res.status(500).json(error)
    })
})

// reply comment

router.put('/replycomment/:id',(req,res)=>{
    postHelper.replyComment(req.body,req.params.id).then(()=>{
        res.status(200)
    }).catch((error)=>{
        res.status(500).json(error)
    })
})

//

router.get('/comment/:id',(req,res)=>{
    postHelper.getComment(req.params.id).then((response)=>{
        res.status(200).json(response)
    }).catch((error)=>{
        res.status(500).json(error)
    })
})