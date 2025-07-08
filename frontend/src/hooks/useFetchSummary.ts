import API from "@/lib/Axios"
import { useEffect, useState } from "react"

export function useFetchSummary() {
    const [summary,setSummary] = useState({
        total: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        currentStreak:0,
        bestStreak: 0
    })
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)

    useEffect(()=> {
        let mounted = true
        async function fetchSummary() {
            setLoading(true)
            setError("")

            try {
                const res = await API.get('/analytics/summary')
                if (mounted) {
                    setSummary({
                        total: res?.data?.summary.total,
                        easy: res?.data?.summary.easy,
                        medium: res?.data?.summary.medium,
                        hard: res?.data?.summary.hard,
                        currentStreak: res?.data?.summary?.currentStreak,
                        bestStreak: res?.data?.summary?.bestStreak
                    })
                }
            } catch (err: any) {
                 if (mounted) setError(err?.response?.data?.message || "Failed to fetch summary data")
            } finally {
                if (mounted) setLoading(false)
            } 
        }

        fetchSummary()
        return () => {mounted = false}
    },[])

    return {summary, loading, error}
}