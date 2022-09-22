import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: 'name is required',
        minlength:4
    },
    email:{
        type : String,
        required: 'Email is required',
        lowercase: true,
        unique: true
    },
    phone:{
        type : Number,
        required: 'Phone number is required',
        minlength:9
    },
    username:{
        type: String,
    },
    profile:{
        type: String,
    },
    password:{
        type : String,
        required: 'Password is required',
        minlength:8
    }
})

export const userModel = mongoose.model('User',userSchema)