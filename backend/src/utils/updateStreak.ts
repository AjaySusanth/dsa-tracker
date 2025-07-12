    import { differenceInCalendarDays } from "date-fns"
    import { PrismaClient } from "../generated/prisma"


    const prisma = new PrismaClient()
    export const updateStreak = async(userId : number) => {
        const user = await prisma.user.findUnique({
            where :{id: userId}
        })

        if(!user) return

        const today = new Date()

        const lastSolved = user.lastSolvedAt ? new Date(user.lastSolvedAt) : null
        const diff = lastSolved ? differenceInCalendarDays(today,lastSolved) : null

        let currentStreak = user.currentStreak
        let bestStreak = user.bestStreak

        if (diff === 1) {
            currentStreak +=1
        }
        else if (diff !== 0) {
            currentStreak = 1
        }

        bestStreak = Math.max(bestStreak, currentStreak)

        await prisma.user.update({
            where: {id: userId},
            data:{
                currentStreak,
                bestStreak,
                lastSolvedAt: today
            }
        })
    }