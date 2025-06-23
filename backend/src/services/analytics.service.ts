import { PrismaClient } from "../generated/prisma";

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

    return {
        total,
        easy,
        medium,
        hard
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
            topic: item.topic,
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