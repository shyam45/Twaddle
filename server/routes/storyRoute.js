import express from 'express'
import {createStory,getStory} from "../helpers/storyHelper.js"

const router = express.Router();

router.post('/',createStory)
router.get('/:id',getStory)


export default router