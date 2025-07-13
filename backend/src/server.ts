import app from './app'
import { PrismaClient } from './generated/prisma'


const PORT = process.env.PORT || 4000
const prisma = new PrismaClient()

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)    
})
async function connectDB() {
    try {

        await prisma.$connect()
        console.log("Connected to Postgres")
    
    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
}

connectDB()