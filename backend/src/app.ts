import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

import problemRoutes from './routes/problem.routes'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/problems',problemRoutes)
app.use('/api/auth',authRoutes)

app.get("/",(req,res)=>{
    res.send("DSA Tracker API running")
})


export default app
