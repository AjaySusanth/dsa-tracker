
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"


import API from "@/lib/Axios";

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ContributionsChartProps {
  userId?: number
}

const getLevelColor = (level: number): string => {
  switch (level) {
    case 0:
      return "bg-slate-900/50 border-slate-800/30"
    case 1:
      return "bg-green-900/40 border-green-800/50"
    case 2:
      return "bg-green-700/60 border-green-600/70"
    case 3:
      return "bg-green-500/80 border-green-400/90"
    case 4:
      return "bg-green-400 border-green-300"
    default:
      return "bg-slate-900/50 border-slate-800/30"
  }
}

const getMonthName = (monthIndex: number): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months[monthIndex]
}

const calculateLevel = (count: number): number => {
  if (count === 0) return 0
  if (count >= 1 && count <= 2) return 1
  if (count >= 3 && count <= 4) return 2
  if (count >= 5 && count <= 6) return 3
  return 4 // count >= 7
}



export function ContributionsChart({ userId = 1 }: ContributionsChartProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [contributionsData, setContributionsData] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true)
        setError("")
        
      
        const res = await API.get(`/analytics/contributions`)
        const data = res.data.contributions.map((item: { date: string; count: number }) => ({
           ...item,
          level: calculateLevel(item.count),
        }))

        setContributionsData(data);
        // --- End of mock data integration ---

      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch contributions data (Mock Error)")
        console.error("Contributions fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [userId]) 

  if (loading) {
    return (
      <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            Problem Solving Activity
          </CardTitle>
          <CardDescription className="text-slate-400">Loading contributions...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            Problem Solving Activity
          </CardTitle>
          <CardDescription className="text-red-400">{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Calculate stats
  const totalProblems = contributionsData.reduce((sum, day) => sum + day.count, 0)

  // Group data by weeks
  const weeks: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []

  // Determine the start day of the week for the very first data point
  // getDay() returns 0 for Sunday, 1 for Monday...
  const firstDataDayDate = contributionsData.length > 0 ? new Date(contributionsData[0].date) : new Date();
  const startDayOfWeek = firstDataDayDate.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Pad the beginning of the first week to align with Monday (assuming Mon is 1st column)
  // If first day is Mon (1), pad 0. If Tue (2), pad 1. If Sun (0), pad 6.
  const daysToPadAtStart = (startDayOfWeek === 0) ? 6 : (startDayOfWeek - 1); 
  
  for (let i = 0; i < daysToPadAtStart; i++) {
    currentWeek.push({ date: "", count: 0, level: 0 }); // Empty placeholder day
  }

  contributionsData.forEach((day, index) => {
    // getDay() will give us 0 for Sunday, 1 for Monday, etc.
    const dayOfWeek = new Date(day.date).getDay();

    currentWeek.push(day);

    // If it's Sunday (dayOfWeek === 0) or the last day of the entire dataset
    if (dayOfWeek === 0 || index === contributionsData.length - 1) {
      // If it's the very last day of data and it's not a Sunday,
      // fill the remaining days of the last week with empty placeholders
      if (index === contributionsData.length - 1 && dayOfWeek !== 0) {
        const daysToPadAtEnd = 6 - dayOfWeek; // Remaining days to reach Sunday
        for (let i = 0; i < daysToPadAtEnd; i++) {
          currentWeek.push({ date: "", count: 0, level: 0 });
        }
      }
      weeks.push(currentWeek); // Add the complete week to the weeks array
      currentWeek = []; // Reset for the next week
    }
  });

  // Get month labels (only show every ~4 weeks or at start of month to prevent crowding)
  const monthLabels: { month: string; weekIndex: number }[] = []
  weeks.forEach((week, weekIndex) => {
    // Find the first actual date in the current week (to handle padded empty days)
    const firstDayWithDate = week.find((day) => day.date !== "");
    if (firstDayWithDate) {
      const date = new Date(firstDayWithDate.date);
      // Logic to place month label at the start of a new month's week
      // Only show if the date is within the first 7 days of the month
      // And either it's the very first week, or it's a new month compared to the previous week's start
      const isFirstWeekOfMonth = date.getDate() <= 7;
      const isNewMonth = weekIndex === 0 || 
                         (new Date(weeks[weekIndex - 1][0].date).getMonth() !== date.getMonth());

      if (isFirstWeekOfMonth && isNewMonth) {
        monthLabels.push({
          month: getMonthName(date.getMonth()),
          weekIndex,
        });
      }
    }
  });


  return (
    <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Problem Solving Activity
            </CardTitle>
            <CardDescription className="text-slate-400 mt-2">
              {totalProblems} problems solved in the last year
            </CardDescription>
          </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-3 h-3 rounded-sm border ${getLevelColor(level)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <div className="space-y-4">

          {/* Chart */}
          <div className="relative w-full overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Month labels */}
              <div className="flex mb-5 relative">
                {monthLabels.map(({ month, weekIndex }) => (
                  <div
                    key={`${month}-${weekIndex}`}
                    className="text-xs text-slate-400 absolute"
                    // Position based on weekIndex and fixed box/gap size
                    style={{ left: `${weekIndex * 16 + 20}px` }} // 16px (w-3 + gap-1) * 4 for approx. positioning, 20px offset for day labels
                  >
                    {month}
                  </div>
                ))}
              </div>

              {/* Day labels and grid */}
              <div className="flex">
                <div className="flex flex-col gap-1 mr-2 text-xs text-slate-400 w-8">
                  <div className="h-3"></div> {/* Spacer for Sunday/first slot */}
                  <div>Mon</div>
                  <div className="h-3"></div> {/* Spacer for Tuesday */}
                  <div>Wed</div>
                  <div className="h-3"></div> {/* Spacer for Thursday */}
                  <div>Fri</div>
                  <div className="h-3"></div> {/* Spacer for Saturday */}
                </div>

                {/* Contribution grid */}
                <div className="flex gap-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`w-3 h-3 rounded-sm border cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-slate-400/50 ${
                            day.date ? getLevelColor(day.level) : "bg-transparent border-transparent"
                          }`}
                          onMouseEnter={() => day.date && setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          title={day.date ? `${day.count} problems on ${day.date}` : ""}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tooltip */}
              {hoveredDay && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-10 whitespace-nowrap">
                  <div className="text-sm text-white font-medium">
                    {hoveredDay.count} {hoveredDay.count === 1 ? "problem" : "problems"}
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
