import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import postRoutes from './routes/posts.routes.js'
import userRoutes from './routes/user.routes.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use(postRoutes)
app.use(userRoutes)
app.use(express.static('uploads'))

const start = async ()=>{
const connectDB = await mongoose.connect(process.env.MONGODB_URI)
app.listen(9090,()=>{
    console.log("server is running in the port 9090")
})
}
start();