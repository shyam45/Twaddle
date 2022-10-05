import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    authorId : {
        type : String,
        required : true
    },
    image : {
        type : String,
    },
    description : {
        type : String,
        max : 500
    },
    likes : {
        type : Array,
        default : []
    },
    reports : {
        type : Array,
        default : []
    },
    createdAt : {
        type : Number,
    }
})

export const Post = mongoose.model('Posts',PostSchema)