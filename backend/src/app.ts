import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
dotenv.config()

import problemRoutes from './routes/problem.routes'
import authRoutes from './routes/auth.routes'
import analtyicRoutes from './routes/analytics.routes'
import { authenticate } from './middlewares/auth.middleware'
const app = express()

app.use(cors({
  origin: 'http://localhost:8080', // or your frontend domain
  credentials: true
}));

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())


app.use('/api/problems',authenticate,problemRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/analytics',authenticate,analtyicRoutes)

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get("/",(req,res)=>{
    res.send("DSA Tracker API running")
})


export default app
