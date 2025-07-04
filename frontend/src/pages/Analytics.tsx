import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Calendar, Award } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const dailyStatsData = [
  { date: "Jan 1", problems: 2, streak: 1 },
  { date: "Jan 2", problems: 3, streak: 2 },
  { date: "Jan 3", problems: 1, streak: 3 },
  { date: "Jan 4", problems: 4, streak: 4 },
  { date: "Jan 5", problems: 2, streak: 5 },
  { date: "Jan 6", problems: 5, streak: 6 },
  { date: "Jan 7", problems: 3, streak: 7 },
  { date: "Jan 8", problems: 6, streak: 8 },
  { date: "Jan 9", problems: 2, streak: 9 },
  { date: "Jan 10", problems: 4, streak: 10 },
  { date: "Jan 11", problems: 3, streak: 11 },
  { date: "Jan 12", problems: 7, streak: 12 },
]

const monthlyData = [
  { month: "Aug", problems: 45 },
  { month: "Sep", problems: 52 },
  { month: "Oct", problems: 38 },
  { month: "Nov", problems: 61 },
  { month: "Dec", problems: 73 },
  { month: "Jan", problems: 89 },
]

const topicPerformance = [
  { topic: "Arrays", solved: 45, total: 60, accuracy: 85 },
  { topic: "Strings", solved: 32, total: 40, accuracy: 92 },
  { topic: "Trees", solved: 28, total: 35, accuracy: 78 },
  { topic: "Graphs", solved: 15, total: 25, accuracy: 71 },
  { topic: "DP", solved: 12, total: 30, accuracy: 65 },
]

const difficultyTrend = [
  { name: "Easy", current: 68, target: 80, color: "#10b981" },
  { name: "Medium", current: 45, target: 60, color: "#f59e0b" },
  { name: "Hard", current: 19, target: 30, color: "#ef4444" },
]

export default function Analytics() {
  return (
    <div className="space-y-6 px-12 py-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-slate-300 mt-1">Deep insights into your DSA journey</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Problems</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">132</div>
            <p className="text-xs text-green-400 mt-1">+23 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Average Daily</CardTitle>
            <Calendar className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3.2</div>
            <p className="text-xs text-slate-500 mt-1">problems per day</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Success Rate</CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">87%</div>
            <p className="text-xs text-green-400 mt-1">+5% improvement</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Best Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">18 days</div>
            <p className="text-xs text-slate-500 mt-1">personal record</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity Chart */}
        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Daily Activity Trend</CardTitle>
            <CardDescription className="text-slate-400">Problems solved and streak over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyStatsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(51, 65, 85, 0.3)",
                      borderRadius: "8px",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="problems"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="streak"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Monthly Progress</CardTitle>
            <CardDescription className="text-slate-400">Total problems solved each month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(51, 65, 85, 0.3)",
                      borderRadius: "8px",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="problems"
                    stroke="#10b981"
                    fill="url(#colorGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Topic Performance */}
      <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Topic Performance Analysis</CardTitle>
          <CardDescription className="text-slate-400">
            Detailed breakdown of your performance across different topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topicPerformance.map((topic) => (
              <div key={topic.topic} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-white">{topic.topic}</span>
                    <Badge className="bg-slate-800 text-slate-300 border-slate-700">
                      {topic.solved}/{topic.total}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{topic.accuracy}%</div>
                    <div className="text-xs text-slate-400">accuracy</div>
                  </div>
                </div>
                <div className="w-full bg-slate-900/30 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(topic.solved / topic.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Difficulty Progress */}
      <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Difficulty Level Progress</CardTitle>
          <CardDescription className="text-slate-400">
            Track your progress across different difficulty levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {difficultyTrend.map((level) => (
              <div key={level.name} className="text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#334155"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={level.color}
                      strokeWidth="2"
                      strokeDasharray={`${(level.current / level.target) * 100}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {Math.round((level.current / level.target) * 100)}%
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-white">{level.name}</div>
                  <div className="text-sm text-slate-400">
                    {level.current} / {level.target} problems
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
