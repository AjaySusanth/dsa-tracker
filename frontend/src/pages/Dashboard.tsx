
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, TrendingUp, Target, Calendar, Flame } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import ProblemModal from "@/components/ProblemModal"
import API from "@/lib/Axios"
import { CardLoader, ChartLoader } from "@/components/ui/loader"
import { useTopicSummary } from "@/hooks/useTopicSummary"

 const TOPIC_COLORS: Record<string, string> = {
  Array: "#8b5cf6",
  String: "#06b6d4",
  Tree: "#10b981",
  Graph: "#f59e0b",
  DP: "#ef4444",
  Default: "#64748b",
};




export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const [totalProblems,setTotalProblems] = useState(0)
  const [difficultyData,setDifficultyData] = useState([
    { name: "Easy", value: 0, color: "#10b981" },
    { name: "Medium", value: 0, color: "#f59e0b" },
    { name: "Hard", value: 0, color: "#ef4444" },
  ])
  

  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")

  const { topicData, loading:topicLoading, error:topicError} = useTopicSummary()

  const chartData = topicData.map(topic => ({
    ...topic, color: TOPIC_COLORS[topic.name] || TOPIC_COLORS.Default
  }))


  const fetchSummary = async() => {
    try {
      setError("")
      setLoading(true)
      const res = await API.get('/analytics/summary')
      setDifficultyData([
      { name: "Easy", value: res?.data?.summary.easy, color: "#10b981" },
      { name: "Medium", value:  res?.data?.summary.medium, color: "#f59e0b" },
      { name: "Hard", value:  res?.data?.summary.hard, color: "#ef4444" },
      ])
      setTotalProblems(res?.data?.summary.total)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch data")
      console.error("Dashboard fetch error",err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=> {
    fetchSummary()
  },[])


  return (
    <div className="space-y-8 px-12 py-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-slate-400 text-lg">Here's your DSA progress overview</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Problem
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Today's Problems</CardTitle>
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Target className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">7</div>
            <p className="text-sm text-slate-500">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Current Streak</CardTitle>
            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">12 days</div>
            <p className="text-sm text-slate-500">Keep it up! 🔥</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total Solved</CardTitle>
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">132</div>
            <p className="text-sm text-slate-500">Across all topics</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">This Week</CardTitle>
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">35</div>
            <p className="text-sm text-slate-500">5 problems/day avg</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic-wise Progress */}
        <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Topic-wise Progress</CardTitle>
            <CardDescription className="text-slate-400">Problems solved by topic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {
                topicLoading ? ( <ChartLoader/>) : 
                topicError ? (  <div className="text-center text-red-400">{topicError}</div>)
                : (
                                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
                )
              }
            </div>
             <div className="flex flex-wrap gap-2 mt-4">
              {chartData.map((topic) => (
                <Badge key={topic.name} variant="outline" className="border-slate-700 text-slate-300">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: topic.color }} />
                  {topic.name}: {topic.count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Distribution */}
         <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Difficulty Distribution</CardTitle>
            <CardDescription className="text-slate-400">Problems by difficulty level</CardDescription>
          </CardHeader>
          <CardContent>
            {
              loading ? <CardLoader/>
              : error ? (
                 <div className="text-center text-red-400">{error}</div>
              ) : (
                 <div className="space-y-4">
              {difficultyData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-300">{item.name}</span>
                    <span className="text-sm text-slate-400">{item.value} problems</span>
                  </div>
                  <Progress
                    value={(item.value / totalProblems) * 100}
                    className="h-2"
                    style={{
                      background: "rgba(30, 41, 59, 0.5)",
                    }}
                  />
                </div>
              ))}
            </div>
              )
            } 
            <div className="mt-6 p-4 bg-slate-900/30 backdrop-blur-sm rounded-lg border border-slate-800/20">
              <div className="text-sm text-slate-400 mb-2">Completion Rate</div>
              <div className="text-2xl font-bold text-white">
                {((difficultyData.reduce((acc, curr) => acc + curr.value, 0) / 200) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500">of your target (200 problems)</div>
            </div>
          </CardContent>
        </Card>
      </div>
            <ProblemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onProblemAdd={fetchSummary} />
      </div>


  )
}
