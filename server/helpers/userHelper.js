import {userModel } from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const userHelper = {
    getUser : async (user_id) => {
        return new Promise((resolve,reject)=>{
            userModel.find({'_id' : user_id}).then((response)=>{
                resolve(response)
            }).catch((err)=>{
                reject(err)
            })
        })
    },

    editUser : (data,_id) => {
        return new Promise(async(resolve,reject)=>{
            if (data.user_id === _id) {
                if (data.password) {
                    try {
                        data.password = await bcrypt.hash(data.password,10)
                    } catch (error) {
                        console.log('hashing problem')
                        reject()
                    }
                }
                try {
                    userModel.findByIdAndUpdate(_id,{
                        $set : data
                    }).then(()=>{
                        resolve('successfully updated')
                    })
                } catch (error) {
                    console.log('not updated')
                    reject()
                }
            } else {
                console.log('user_id is not valid')
                reject()
            }
        })
    },

    deleteUser : (_id) => {
        userModel.findByIdAndDelete(_id).then(()=>{
            return 
        }).catch((err)=>{
            throw(err)
        })
    },

    followUser : async (user_id,id) => {
        try {
            await userModel.findByIdAndUpdate(user_id,{
                $push : {
                    following : id
                },
            }).then(async()=>{
                await userModel.findByIdAndUpdate(id,{
                    $push : {
                        followers : user_id
                    }
                })
            }).then(async()=>{
                await userModel.findByIdAndUpdate(id,{
                    $push : {
                        notifications : {
                            id : user_id,
                            action : 'following',
                            time : Date.now()
                        }
                    }
                })
            }).then(()=>{
                return {msg : 'successfully connected'}
            })
        } catch (error) {
            throw err
        }
    },

    unfollowUser : async (user_id,id) => {
        try {
            await userModel.findByIdAndUpdate(user_id,{
                $pull : {
                    following : id
                }
            })
            await userModel.findByIdAndUpdate(id,{
                $pull : {
                    followers : user_id
                }
            })
            return {msg : 'successfully connected'}
        } catch (error) {
            throw error
        }
    },

    bookmarks : async (user_id,id)=>{
        const user = await userModel.findById(user_id)
        if (!user.bookmarks.includes(id)) {
            try {
                await userModel.findByIdAndUpdate(user_id,{
                    $push : {
                        bookmarks : id
                    }
                }).then(()=>{
                    return {msg : 'bookmarked'}
                })
            } catch (error) {
                throw error
            }
        } else {
            try {
                await userModel.findByIdAndUpdate(user_id,{
                    $pull : {
                        bookmarks : id
                    }
                }).then(()=>{
                    return {msg : ''}
                })k
            } catch (error) {
                throw error
            }
        }
    },

    getNotifications : (id) =>{
        return new Promise((resolve,reject)=>{
            try {
                userModel.find({_id:id},{_id:0,notifications:1}).then((response)=>{
                    resolve(response[0].notifications)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}