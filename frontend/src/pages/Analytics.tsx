import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Calendar, Award } from "lucide-react";
import { useTopicSummary } from "@/hooks/useTopicSummary";
import { useFetchSummary } from "@/hooks/useFetchSummary";
import { ChartLoader } from "@/components/ui/loader";
import { ContributionsChart } from "@/components/ContributionsChart";
import { ActivityTimeChart } from "@/components/ActivityTimeChart";


export default function Analytics() {
  const {
    topicData,
    loading: topicLoading,
    error: topicError,
  } = useTopicSummary();
  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
  } = useFetchSummary();

  const difficultyData = [
    { name: "Easy", count: summary.easy, color: "#10b981" },
    { name: "Medium", count: summary.medium, color: "#f59e0b" },
    { name: "Hard", count: summary.hard, color: "#ef4444" },
  ];

  const TOTAL_PROBLEMS = summary.total || 0;

  return (
    <div className="space-y-6 px-12 py-6">
      <div>
        <h1 className="text-3xl text-white font-bold">Analytics Dashboard</h1>
        <p className="text-slate-300 mt-1">
          Deep insights into your DSA journey
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Total Problems
            </CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {TOTAL_PROBLEMS}
            </div>
            <p className="text-xs text-green-400 mt-1">+23 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Average Daily
            </CardTitle>
            <Calendar className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3.2</div>
            <p className="text-xs text-slate-500 mt-1">problems per day</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Active Days
            </CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">53</div>
            <p className="text-xs text-green-400 mt-1">22 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Best Streak
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.bestStreak} days</div>
            <p className="text-xs text-slate-500 mt-1">personal record</p>
          </CardContent>
        </Card>
      </div>

 <div className="space-y-6 w-full">
        {/* GitHub-style Contributions Chart */}
        <div className="w-full">
          <ContributionsChart userId={1} />
        </div>

        {/* Activity Time Distribution Chart */}
        <div className="w-full">
          <ActivityTimeChart />
        </div>
      </div>
      
      {/* Topic Performance */}
      <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">
            Topic Performance Analysis
          </CardTitle>
          <CardDescription className="text-slate-400">
            Detailed breakdown of your performance across different topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {topicLoading ? (
            <ChartLoader />
          ) : topicError ? (
            <div className="text-center text-red-400">{topicError}</div>
          ) : TOTAL_PROBLEMS === 0 ? (
            <div className="text-slate-400 text-center py-8">
              No problems solved yet.
            </div>
          ) : (
            topicData.map((topic) => {
              const percent = TOTAL_PROBLEMS
                ? (topic.count / TOTAL_PROBLEMS) * 100
                : 0;
              return (
                <div key={topic.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-white">
                        {topic.name}
                      </span>
                      <Badge className="bg-slate-800 text-slate-300 border-slate-700">
                        {topic.count}/{TOTAL_PROBLEMS}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">
                        {percent.toFixed(1)}%
                      </div>
                      <div className="text-xs text-slate-400">
                        of all solved
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-900/30 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Difficulty Progress */}
      <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">
            Difficulty Level Progress
          </CardTitle>
          <CardDescription className="text-slate-400">
            Track your progress across different difficulty levels
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaryLoading ? (
            <div className="flex items-center justify-center min-h-[120px] w-full col-span-3">
              <ChartLoader />
            </div>
          ) : summaryError ? (
            <div className="text-center text-red-400">{summaryError}</div>
          ) : (
            difficultyData.map((level) => {
              const percent = TOTAL_PROBLEMS
                ? (level.count / TOTAL_PROBLEMS) * 100
                : 0;
              return (
               
                  <div key={level.name} className="text-center space-y-4">
                    <div className="relative w-24 h-24 mx-auto">
                      <svg
                        className="w-24 h-24 transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
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
                          strokeDasharray={`${percent}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {Math.round(percent)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-white">{level.name}</div>
                      <div className="text-sm text-slate-400">
                        {level.count} / {TOTAL_PROBLEMS} problems
                      </div>
                    </div>
                  </div>
                
              );
            })
          )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
