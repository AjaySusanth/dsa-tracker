import { eachDayOfInterval, endOfDay, endOfToday, endOfWeek, format, startOfDay, startOfToday, startOfWeek, subDays, subYears } from "date-fns";
import { PrismaClient } from "../generated/prisma";
import { getStreak } from "../utils/getStreak";

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

    const {currentStreak, bestStreak} = await getStreak(userId)

    const todayStart = startOfToday()
    const todayEnd = endOfToday()
    const problemsToday = await prisma.problem.count({
        where:{
            userId,
            createdAt:{
                gte: todayStart,
                lte: todayEnd
            }
        }
    })
    const now = new Date()
    const yesterdayStart = startOfDay(subDays(now,1))
    const yesterdayEnd = endOfDay(subDays(now,1))
    const problemsYesterday = await prisma.problem.count({
        where:{
            userId,
            createdAt:{
                gte: yesterdayStart,
                lte: yesterdayEnd
            }
        }
    })

    const weekStart = startOfWeek(now,{weekStartsOn: 1})
    const weekEnd = endOfWeek(now, {weekStartsOn: 1})
    const problemsThisWeek = await prisma.problem.count({
        where:{
            userId,
            createdAt:{
                gte: weekStart,
                lte: weekEnd
            }
        }
    })

     const daysSoFarThisWeek = Math.max(1, Math.ceil((now.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);
     const avgPerDayThisWeek = Math.round(problemsThisWeek / daysSoFarThisWeek) 


    const problems = await prisma.problem.findMany({
        where:{userId},
        select:{createdAt:true}
    })
    
    const activeDaysSet = new Set<string>()
    const activeDaysThisMonthSet = new Set<string>()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()


    problems.forEach(p => {
        const d = p.createdAt
        const dateStr = p.createdAt.toISOString().slice(0,10)
        activeDaysSet.add(dateStr)
        if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
            activeDaysThisMonthSet.add(dateStr)
        }
    })

    const activeDays = activeDaysSet.size
    const activeDaysThisMonth = activeDaysThisMonthSet.size
    const problemsThisMonth = problems.filter(p => {
        const d = p.createdAt
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth
    }).length

    return {
        total,
        easy,
        medium,
        hard,
        problemsToday,
        problemsYesterday,
        problemsThisWeek,
        problemsThisMonth,
        avgPerDayThisWeek,
        currentStreak,
        bestStreak,
        activeDays,
        activeDaysThisMonth
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



export const getActivityTimeDistribution =  async(userId: number) => {
    const problems = await prisma.problem.findMany({
        where:{userId},
        select:{createdAt:true}
    }) 
    
    const hourly = Array(24).fill(0)
    problems.forEach(problem => {
        const hour = problem.createdAt.getHours()
        hourly[hour]++;
    })

    let morning=0,afternoon=0, evening=0, night=0

    for(let h=0;h<24;h++) {
        if (h >=6 && h<= 11) morning +=hourly[h]
        else if (h >=12 && h <= 17) afternoon += hourly[h]
        else if (h >=18 && h <= 21) evening += hourly[h]
        else night += hourly[h]
    }

    const total = morning + afternoon + evening + night

    const peakCount = Math.max(...hourly) //List cannot be passed ot max
    const peakHour = hourly.indexOf(peakCount)
    const activeHours = hourly.filter(c => c > 0).length
    const avgPerActiveHour = total / (activeHours || 1)

    const periodCounts = [
        {key: "morning", value:morning},
        {key: "afternoon", value:afternoon},
        {key: "evening", value:evening},
        {key: "night", value:night},
    ]

    periodCounts.sort((a,b) => b.value - a.value)

    const mostActivePeriod = periodCounts[0].key

    return {
        hourly: hourly.map((count,hour) => ({hour,count})),
        summary:{
            morning: {count:morning, percent: Math.round((morning/total)*100)},
            afternoon: {count:afternoon, percent: Math.round((afternoon/total)*100)},
            evening: {count:evening, percent: Math.round((evening/total)*100)},
            night: {count:night, percent: Math.round((night/total)*100)},
            total,
            peakHour,
            mostActivePeriod,
            activeHours,
            avgPerActiveHour: Math.round(avgPerActiveHour * 10) / 10

        }
    }
}