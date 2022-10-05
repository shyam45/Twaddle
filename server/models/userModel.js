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
    password:{
        type : String,
        required: 'Password is required',
        minlength:8
    },
    profile:{
        type: String,
    },
    coverPicture:{
        type: String,
        default:''
    },
    about:{
        type:String
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    Posts:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:25
    },
    bookmarks:{
        type:Array,
        default:[]
    },
    notifications : {
        type:Array,
        default:[]
    }
},{timestamps:true})

export const userModel = mongoose.model('User',userSchema)