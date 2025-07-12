

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Sun, Moon, Sunrise, Sunset } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import API from "@/lib/Axios"

interface HourlyActivity {
  hour: number;
  count: number
}

interface PeriodSummary {
  count: number;
  percent: number
}

interface ActivitySummary {
  morning: PeriodSummary
  afternoon: PeriodSummary
  evening: PeriodSummary
  night: PeriodSummary
  total: number
  peakHour: number
  mostActivePeriod: string
  activeHours: number
  avgPerActiveHour: number
}

interface ActivityTimeData {
  hourly: HourlyActivity[]
  summary: ActivitySummary
}


const formatHour = (hour: number): string => {
  if (hour === 0) return "12 AM"
  if (hour === 12) return "12 PM"
  if (hour < 12) return `${hour} AM`
  return `${hour - 12} PM`
}

const getPeriodMeta = (period: string) => {
  switch (period) {
    case "morning":
      return  { label: "Morning", icon: Sunrise, color: "text-yellow-400", bg: "bg-yellow-500/10" }
    case "afternoon":
      return { label: "Afternoon", icon: Sun, color: "text-orange-400", bg: "bg-orange-500/10" }
    case "evening":
      return { label: "Evening", icon: Sunset, color: "text-purple-400", bg: "bg-purple-500/10" }
    case "night":
      return { label: "Night", icon: Moon, color: "text-blue-400", bg: "bg-blue-500/10" }
    default:
      return { label: period, icon: Clock, color: "", bg: "" }

  }
}

const getBarColor = (hour: number, count: number): string => {
  if (count === 0) return "#1e293b"
  if (hour >= 6 && hour <= 11) return "#fbbf24"
  if (hour >= 12 && hour <= 17) return "#f97316"
  if (hour >= 18 && hour <= 21) return "#a855f7"
  return "#3b82f6"
}

export function ActivityTimeChart() {
  const [data, setData] = useState< ActivityTimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTimeActivity = async () => {
      try {
        setLoading(true)
        setError("")
        const res = await API.get(`/analytics/activity`)
        setData(res.data.result)
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch activity time data."
        )
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTimeActivity()
  }, [])

  if (loading) {
    return (
      <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-500" />
            Activity Time Distribution
          </CardTitle>
          <CardDescription className="text-slate-400">Loading time activity...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
        </CardContent>
      </Card>
    )
  }
  if (error || !data) {
    return (
      <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm w-full">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-500" />
            Activity Time Distribution
          </CardTitle>
          <CardDescription className="text-slate-400">
            {error || "No activity data available."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <span className="text-slate-400">{error || "No data available for chart."}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

   const { hourly, summary } = data

  const periodData = [
    { key: "morning", ...getPeriodMeta("morning"), ...summary.morning },
    { key: "afternoon", ...getPeriodMeta("afternoon"), ...summary.afternoon },
    { key: "evening", ...getPeriodMeta("evening"), ...summary.evening },
    { key: "night", ...getPeriodMeta("night"), ...summary.night }
  ]
  return (
    <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-cyan-500" />
              Activity Time Distribution
            </CardTitle>
            <CardDescription className="text-slate-400">
              When you're most active solving problems
              {error && <span className="text-yellow-400 ml-2">({error})</span>}
            </CardDescription>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-sm font-medium text-white">{formatHour(summary.peakHour)}</div>
            <div className="text-xs text-slate-400">peak hour</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <div className="space-y-6">
          {/* Time Period Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {periodData.map(({ key, label, icon: Icon, color, bg,count,percent }) => (
              <div key={key} className={`p-3 rounded-lg border border-slate-800/30 ${bg}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${color}`} />
                  <span className="text-sm font-medium text-white">{label}</span>
                </div>
                <div className="text-lg font-bold text-white">{count}</div>
                <div className="text-xs text-slate-400">
                  {percent}% of activity
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourly.map(h => ({...h, label:formatHour(h.hour)}))} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="label"
                  stroke="#64748b"
                  fontSize={12}
                  interval={1}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(51, 65, 85, 0.3)",
                    borderRadius: "8px",
                    color: "#fff",
                    backdropFilter: "blur(8px)",
                  }}
                  formatter={(value: number) => [
                    `${value} problems`,
                    "Problems Solved",
                  ]}
                  labelFormatter={(label: string) => `Time: ${label}`}
                />
                <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                  {hourly.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.hour, entry.count)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm border-t border-slate-800/30 pt-4">
            <div className="flex items-center gap-4">
              <span className="text-slate-400">
                <span className="text-white font-medium">{summary.activeHours}</span> active hours
              </span>
              <span className="text-slate-400">
                <span className="text-white font-medium">
                  {summary.avgPerActiveHour}
                </span>{" "}
                avg/hour
              </span>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300 border-purple-500/30">
              Most active: {getPeriodMeta(summary.mostActivePeriod).label}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
