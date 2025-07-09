

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Sun, Moon, Sunrise, Sunset } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import API from "@/lib/Axios"

interface TimeSlot {
  hour: number
  label: string
  problems: number
  percentage: number
}

interface ActivityTimeChartProps {
  userId?: number
}

const formatHour = (hour: number): string => {
  if (hour === 0) return "12 AM"
  if (hour === 12) return "12 PM"
  if (hour < 12) return `${hour} AM`
  return `${hour - 12} PM`
}

const getTimeOfDayInfo = (hour: number) => {
  if (hour >= 5 && hour < 12) {
    return { period: "Morning", icon: Sunrise, color: "text-yellow-400" }
  } else if (hour >= 12 && hour < 17) {
    return { period: "Afternoon", icon: Sun, color: "text-orange-400" }
  } else if (hour >= 17 && hour < 21) {
    return { period: "Evening", icon: Sunset, color: "text-purple-400" }
  } else {
    return { period: "Night", icon: Moon, color: "text-blue-400" }
  }
}

const getBarColor = (hour: number, problems: number): string => {
  if (problems === 0) return "#1e293b"

  if (hour >= 5 && hour < 12) {
    return "#fbbf24" // Morning - yellow
  } else if (hour >= 12 && hour < 17) {
    return "#f97316" // Afternoon - orange
  } else if (hour >= 17 && hour < 21) {
    return "#a855f7" // Evening - purple
  } else {
    return "#3b82f6" // Night - blue
  }
}

export function ActivityTimeChart({ userId = 1 }: ActivityTimeChartProps) {
  const [timeData, setTimeData] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTimeActivity = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await API.get(`/analytics/time-activity/${userId}`)
        const hourlyData = response.data // Assuming backend returns array of 24 hours with counts

        const totalProblems = hourlyData.reduce((sum: number, count: number) => sum + count, 0)

        const formattedData = hourlyData.map((problems: number, hour: number) => ({
          hour,
          label: formatHour(hour),
          problems,
          percentage: totalProblems > 0 ? Math.round((problems / totalProblems) * 100) : 0,
        }))

        setTimeData(formattedData)
      } catch (err: any) {
        // If API fails, generate mock data for demo
        console.warn("Time activity API failed, using mock data:", err)
        const mockHourlyActivity = [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          2,
          3,
          8,
          12,
          15, // 12 AM - 11 AM
          18,
          22,
          25,
          28,
          24,
          20,
          16,
          12,
          8,
          5,
          2,
          1, // 12 PM - 11 PM
        ]

        const totalProblems = mockHourlyActivity.reduce((sum, count) => sum + count, 0)

        const mockData = mockHourlyActivity.map((problems, hour) => ({
          hour,
          label: formatHour(hour),
          problems,
          percentage: totalProblems > 0 ? Math.round((problems / totalProblems) * 100) : 0,
        }))

        setTimeData(mockData)
        setError("Using demo data - API endpoint not available")
      } finally {
        setLoading(false)
      }
    }

    fetchTimeActivity()
  }, [userId])

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

  // Calculate peak hours and stats
  const peakHour = timeData.reduce((max, current) => (current.problems > max.problems ? current : max), timeData[0])
  const totalProblems = timeData.reduce((sum, slot) => sum + slot.problems, 0)
  const activeHours = timeData.filter((slot) => slot.problems > 0).length

  // Calculate time period stats
  const periodStats = {
    morning: timeData.filter((slot) => slot.hour >= 5 && slot.hour < 12).reduce((sum, slot) => sum + slot.problems, 0),
    afternoon: timeData
      .filter((slot) => slot.hour >= 12 && slot.hour < 17)
      .reduce((sum, slot) => sum + slot.problems, 0),
    evening: timeData.filter((slot) => slot.hour >= 17 && slot.hour < 21).reduce((sum, slot) => sum + slot.problems, 0),
    night: timeData.filter((slot) => slot.hour >= 21 || slot.hour < 5).reduce((sum, slot) => sum + slot.problems, 0),
  }

  const mostActivePeriod = Object.entries(periodStats).reduce(
    (max, [period, count]) => (count > max.count ? { period, count } : max),
    { period: "morning", count: 0 },
  )

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
            <div className="text-sm font-medium text-white">{peakHour?.label || "N/A"}</div>
            <div className="text-xs text-slate-400">peak hour</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <div className="space-y-6">
          {/* Time Period Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                period: "Morning",
                count: periodStats.morning,
                icon: Sunrise,
                color: "text-yellow-400",
                bg: "bg-yellow-500/10",
              },
              {
                period: "Afternoon",
                count: periodStats.afternoon,
                icon: Sun,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
              },
              {
                period: "Evening",
                count: periodStats.evening,
                icon: Sunset,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
              },
              { period: "Night", count: periodStats.night, icon: Moon, color: "text-blue-400", bg: "bg-blue-500/10" },
            ].map(({ period, count, icon: Icon, color, bg }) => (
              <div key={period} className={`p-3 rounded-lg border border-slate-800/30 ${bg}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${color}`} />
                  <span className="text-sm font-medium text-white">{period}</span>
                </div>
                <div className="text-lg font-bold text-white">{count}</div>
                <div className="text-xs text-slate-400">
                  {totalProblems > 0 ? Math.round((count / totalProblems) * 100) : 0}% of activity
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
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
                  formatter={(value: number, name: string) => [
                    `${value} problems (${timeData.find((d) => d.problems === value)?.percentage || 0}%)`,
                    "Problems Solved",
                  ]}
                  labelFormatter={(label: string) => `Time: ${label}`}
                />
                <Bar dataKey="problems" radius={[2, 2, 0, 0]}>
                  {timeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.hour, entry.problems)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm border-t border-slate-800/30 pt-4">
            <div className="flex items-center gap-4">
              <span className="text-slate-400">
                <span className="text-white font-medium">{activeHours}</span> active hours
              </span>
              <span className="text-slate-400">
                <span className="text-white font-medium">
                  {activeHours > 0 ? Math.round((totalProblems / activeHours) * 10) / 10 : 0}
                </span>{" "}
                avg/hour
              </span>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300 border-purple-500/30">
              Most active: {mostActivePeriod.period}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
