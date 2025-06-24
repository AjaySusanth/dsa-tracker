"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Plus } from "lucide-react"
import ProblemModal from "@/components/ProblemModal"

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    date: "2024-01-15",
    notes: "Classic hash map approach",
    revision: true,
    status: "Solved",
  },
  {
    id: 2,
    title: "Binary Tree Inorder Traversal",
    topic: "Trees",
    difficulty: "Medium",
    date: "2024-01-14",
    notes: "Recursive and iterative solutions",
    revision: false,
    status: "Solved",
  },
  {
    id: 3,
    title: "Longest Palindromic Substring",
    topic: "Strings",
    difficulty: "Medium",
    date: "2024-01-13",
    notes: "Dynamic programming approach",
    revision: true,
    status: "Solved",
  },
  {
    id: 4,
    title: "Merge k Sorted Lists",
    topic: "Linked Lists",
    difficulty: "Hard",
    date: "2024-01-12",
    notes: "Priority queue solution",
    revision: false,
    status: "Attempted",
  },
  {
    id: 5,
    title: "Valid Parentheses",
    topic: "Stacks",
    difficulty: "Easy",
    date: "2024-01-11",
    notes: "Stack-based validation",
    revision: false,
    status: "Solved",
  },
]

const topics = ["All", "Arrays", "Strings", "Trees", "Linked Lists", "Stacks", "Graphs", "DP"]
const difficulties = ["All", "Easy", "Medium", "Hard"]

export default function Problems() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredProblems = mockProblems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic = selectedTopic === "All" || problem.topic === selectedTopic
    const matchesDifficulty = selectedDifficulty === "All" || problem.difficulty === selectedDifficulty
    return matchesSearch && matchesTopic && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Solved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Attempted":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-6 px-12 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Problem List
          </h1>
          <p className="text-slate-300 mt-1">Manage and track all your solved problems</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Problem
        </Button>
      </div>

      <Card className="bg-slate-950/60 border-slate-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">All Problems</CardTitle>
          <CardDescription className="text-slate-400">
            Search, filter, and manage your problem collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white placeholder:text-slate-400"
              />
            </div>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-full sm:w-[180px] bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic} className="text-white hover:bg-slate-700">
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full sm:w-[180px] bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty} className="text-white hover:bg-slate-700">
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Problems Table */}
          <div className="rounded-md border border-slate-800/30 overflow-hidden bg-slate-950/30 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">Problem</TableHead>
                  <TableHead className="text-slate-300">Topic</TableHead>
                  <TableHead className="text-slate-300">Difficulty</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Date</TableHead>
                  <TableHead className="text-slate-300">Revision</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProblems.map((problem) => (
                  <TableRow key={problem.id} className="border-slate-800 hover:bg-slate-800/30">
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{problem.title}</div>
                        {problem.notes && <div className="text-sm text-slate-400 mt-1">{problem.notes}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {problem.topic}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(problem.status)}>{problem.status}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-400">{problem.date}</TableCell>
                    <TableCell>
                      {problem.revision ? (
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Required</Badge>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400">No problems found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ProblemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
