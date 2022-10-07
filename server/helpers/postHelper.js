import { Post } from '../models/postModel.js'
import { userModel } from '../models/userModel.js'
import mongoose from 'mongoose'
const objectId = mongoose.Types.ObjectId
export const postHelper = {
    createPost : (data) => {
        data.createdAt = Date.now()
        const newPost = new Post(data)
        return new Promise( async (resolve, reject)=>{
            try {
                const post = await newPost.save()
                resolve(post)
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })
    },
    timeline :async (user_id) =>{
        try {
            const currentUser = await userModel.findById(user_id)
            const userPosts = await Post.find({authorId : user_id})
            const friendPosts = await Promise.all(
                currentUser.following.map((friendId)=>{
                    return Post.find({authorId : friendId})
                })
            )
            return userPosts.concat(...friendPosts)
        } catch (error) {
            throw error
        }
    },
    editPost : async(data) => {
        try {
            Post.updateOne(
                {
                    authorId : "633943c3a75a6ecb02c520c6"
                },
                {
                    $set : data
                }
            ).then((response)=>{
                return response
            }).catch ((error)=> {
                throw error
            })
        } catch (error) {
            console.log(error)
        }
    },
    deletePost : async(id) => {
        try {
            Post.findByIdAndDelete(id).then(()=>{
                return
            }).catch((error)=>{
                throw error
            })
        } catch (error) {
            throw error
        }
    },
    likeOrDislike : async (user_id,id)=>{
        const post = await Post.findById(id)

        if (!post.likes.includes(user_id)) {
            try {
                await Post.findByIdAndUpdate(id,{
                    $push : {
                        likes : user_id
                    }
                }).then(async()=>{
                    const res = await Post.find({_id:id},{_id:0,"authorId":1})
                    const username = await userModel.find({_id:user_id},{_id:0,"username":1})
                    
                        await userModel.findByIdAndUpdate(res[0].authorId,{
                            $push : {
                                notifications : {
                                    action : 'liked',
                                    user_id : user_id,
                                    likedBy : username[0].username,
                                    post_id : id,
                                    time : Date.now()
                                }
                            }
                        })
                }).then(()=>{
                    console.log('liked')
                    return {msg : 'liked'}
                })
            } catch (error) {
                throw error
            }
        } else {
            try {
                await Post.findByIdAndUpdate(id,{
                    $pull : {
                        likes : user_id
                    }
                }).then((response)=>{
                    console.log(response)
                })
                return {msg : 'disliked'}
            } catch (error) {
                throw error
            }
        }
    },
    addComment : async(data,id) =>{
        Post.findByIdAndUpdate(id,{
            $push : {
                comments : data
            }
        }).then(()=>{
            return {msg : 'added'}
        }).catch((error)=>{
            throw error
        })
    },
    replyComment : async(data,id) =>{
        console.log(data)

        Post.updateOne({_id:id,"comments.comId":data.repliedToCommentId},{
            $push : {
                "comments.$.replies" : data
            }
        }).then(()=>{
            return {msg : 'added'}
        }).catch((error)=>{
            throw error
        })
    },
    getComment : async(id) =>{
        try {
            const comments = await Post.find({_id : id},{_id:0,comments:1})
            return comments[0].comments
        } catch (error) {
            throw error
        }
    }
}