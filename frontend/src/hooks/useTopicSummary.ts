import API from "@/lib/Axios";
import { useEffect, useState } from "react";

export interface TopicData {
    name: string;
    count: number;
}

export function useTopicSummary() {
    const [topicData,setTopicData] = useState<TopicData[]>([])
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)

    useEffect(()=> {
        let mounted = true
        
        async function fetchTopicSummary() {
            setLoading(true)
            setError("")
            try {
                const res = await API.get('/analytics/topic')

                if (mounted) setTopicData(res?.data?.result || [])
                console.log(res?.data?.result)
            } catch (err: any) {
                 if (mounted) setError(err?.response?.data?.message || "Failed to fetch topic summary")
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchTopicSummary()

        return () => { mounted = false}
    },[])

    return {topicData, loading,error}
}