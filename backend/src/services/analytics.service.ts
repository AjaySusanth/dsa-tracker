import { eachDayOfInterval, endOfToday, format, startOfYear, subYears } from "date-fns";
import { PrismaClient } from "../generated/prisma";

interface DailyCountType {
    date: string;
    count: number;
}

const prisma = new PrismaClient()

export const getSummary = async(userId: number) => {
    const total = await prisma.problem.count({
        where:{userId}
    })

    const easy = await prisma.problem.count({
        where:{userId, difficulty: "Easy"}
    })

    const medium = await prisma.problem.count({
        where:{userId, difficulty: "Medium"}
    })

    const hard = await prisma.problem.count({
        where:{userId, difficulty: "Hard"}
    })

    const user = await prisma.user.findUnique({
        where:{id:userId},
        select:{
            currentStreak:true,
            bestStreak:true
        }
    })

    return {
        total,
        easy,
        medium,
        hard,
        currentStreak: user?.currentStreak,
        bestStreak: user?.bestStreak
    }

}

export const topicWiseCount = async(userId: number) => {
    const result = await prisma.problem.groupBy({
        by: ['topic'],
        where:{userId},
        _count : true
    })
   
    return result.map((item)=> (
        {
            name: item.topic,
            count: item._count
        }

    ))
}

export const getDailyStats = async(userId: number) => {
    const results = await prisma.problem.findMany({
        where:{userId},
        select:{createdAt:true}
    })
    const dailyCount: Record<string,number> = {}

    results.forEach((item)=> {
        const date = item.createdAt.toISOString().split("T")[0]
        dailyCount[date] = (dailyCount[date] || 0) + 1
    })
    return Object.entries(dailyCount).map(([date,count])=>({
        date,
        count
    }))
}

export const getContributions = async(userId: number) => {
    const endDate = endOfToday()
    const startDate = subYears(endDate,1)
    

    const problems = await prisma.problem.findMany({
        where:{
            userId,
            createdAt:{
                gte: startDate,
                lte: endDate
            }
        },
        select:{createdAt:true}
    })
    console.log(problems)
    const dailyCount: Record<string,number> ={}

    problems.forEach(problem => {
        const date = problem.createdAt.toISOString().split("T")[0]
        dailyCount[date] = (dailyCount[date] || 0) + 1
    })
    console.log(dailyCount)
    const allDatesInRange = eachDayOfInterval({start:startDate, end:endDate})

    const contributions = allDatesInRange.map(date => {
        const dateString = format(date,'yyyy-MM-dd')
        return {
            date: dateString,
            count:(dailyCount[dateString] || 0)
        }
    })

    return contributions
}