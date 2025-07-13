import API from "@/lib/Axios"
import { useCallback, useEffect, useState } from "react"

export function useFetchSummary() {
    const [summary,setSummary] = useState({
        total: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        problemsToday: 0,
        problemsYesterday: 0,
        problemsThisWeek: 0,
        avgThisWeek: 0,
        currentStreak:0,
        bestStreak: 0
    })
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)

    const fetchSummary = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const res = await API.get('/analytics/summary')
            setSummary({
                total: res?.data?.summary.total,
                easy: res?.data?.summary.easy,
                medium: res?.data?.summary.medium,
                hard: res?.data?.summary.hard,
                problemsToday: res?.data?.summary.problemsToday,
                problemsYesterday: res?.data?.summary.problemsYesterday,
                problemsThisWeek: res?.data?.summary.problemsThisWeek,
                avgThisWeek: res?.data?.summary.avgPerDayThisWeek,
                currentStreak: res?.data?.summary?.currentStreak,
                bestStreak: res?.data?.summary?.bestStreak
            })
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to fetch summary data")
        } finally {
            setLoading(false)
        }
    },[])

    useEffect(()=> {
        fetchSummary()
    },[fetchSummary])

    return {summary, loading, error, refetch:fetchSummary}
}