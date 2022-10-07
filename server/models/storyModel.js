import mongoose from "mongoose"

const storySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,

        ref:'Users'},
    desc:String,
    image:String,
   createdAt:{
    type:Date,
    expires : 30,
   }
},
{
    timestamps:true
}
)

export const StoryModel = mongoose.model("Story", storySchema)
