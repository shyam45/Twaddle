import { StoryModel } from '../models/storyModel.js';

const createStory = async(req,res)=>{
    const newStory = new StoryModel(req.body)
    const story = await StoryModel.findById(newStory.userId)
    try {
        if(story == undefined){
        await newStory.save()
        res.status(200).json(newStory)
        }
        else{
            res.status(403).json("Sorry!!..Only one story can uploaded")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//Get story

const getStory = async(req,res)=>{
    const id = req.params.id
    try {
        const story = await StoryModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

export {createStory,getStory}