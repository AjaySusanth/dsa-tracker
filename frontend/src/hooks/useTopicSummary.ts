import API from "@/lib/Axios";
import { useCallback, useEffect, useState } from "react";

export interface TopicData {
    name: string;
    count: number;
}

export function useTopicSummary() {
    const [topicData,setTopicData] = useState<TopicData[]>([])
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)

    const fetchTopicSummary = useCallback(async()=>{
        setLoading(true)
            setError("")
            try {
                const res = await API.get('/analytics/topic')
                setTopicData(res?.data?.result || [])
                console.log(res?.data?.result)
            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to fetch topic summary")
            } finally {
                setLoading(false)
            }
    },[])

    useEffect(()=> {
        fetchTopicSummary()
    },[fetchTopicSummary])

    return {topicData, loading, error, refetch:fetchTopicSummary}
}