import * as dotenv from 'dotenv' 
dotenv.config()
import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js' 
import postRoute from './routes/postRoute.js'

mongoose.connect(process.env.MONGODB)
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log(error.message))

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:false}))

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)

app.listen(process.env.PORT,()=>console.log('server connected'))