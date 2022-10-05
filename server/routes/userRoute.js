import express from 'express'
const router = express.Router()
import { userHelper } from '../helpers/userHelper.js'
// get a user 
    router.get('/:id',(req,res)=>{
        userHelper.getUser(req.params.id).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            res.status(403).json(err)
        })
    })
// edit user
    router.put('/:id',(req,res)=>{
        userHelper.editUser(req.body,req.params.id).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            res.status(403).json(err)
        })
    })
// delete user
    router.delete('/',(req,res)=>{
        userHelper.deleteUser(req.body.user_id).then(()=>{
            res.status(200).json('user account deleted')
        }).catch((err)=>{
            res.status(403).json(err)
        })
    })
// follow user
    router.put('/follow/:id',(req,res)=>{
        userHelper.followUser(req.body.user_id,req.params.id).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            res.status(403).json(err)
        })
    })
// unfollow user
    router.put('/unfollow/:id',(req,res)=>{
        userHelper.unfollowUser(req.body.user_id,req.params.id).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            res.status(403).json(err)
        })
    })
// bookmark
    router.put('/bookmark/:id',(req,res)=>{
        userHelper.bookmarks(req.body.user_id,req.params.id).then(()=>{
            res.status(200).json('updated')
        }).catch(()=>{
            res.status(500)
        })
    })
// get notifications
    router.get('/notifications/:id',(req,res)=>{
        userHelper.getNotifications(req.params.id).then((response)=>{
            console.log(response)
            res.status(200).json(response)
        }).catch((error)=>{
            res.status(500).json(error)
        })
    })
export default router