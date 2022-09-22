import * as dotenv from 'dotenv' 
dotenv.config()
import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
import userRouter from './routes/userRouter.js' 

mongoose.connect(process.env.MONGODB)
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log(error.message))

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:false}))


app.use('/',userRouter)

app.listen(process.env.PORT,()=>console.log('server connected'))