import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  ExternalLink,
  BookOpen,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { NotesModal } from "@/components/NotesModal";
import ProblemModal from "@/components/ProblemModal";
import API from "@/lib/Axios";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader";


const topics = [
  "All",
  "Arrays",
  "Strings",
  "Trees",
  "Linked Lists",
  "Stacks",
  "Graphs",
  "DP",
];
const difficulties = ["All", "Easy", "Medium", "Hard"];

type filterParams = {
  search?: string
  topic?: string
  difficulty?: string
  revision?: boolean

}

interface Problem {
  id: number;
  title: string;
  topic: string;
  difficulty: string;
  link: string;
  notes: string;
  needRevision: boolean;
  reference?: string;
  createdAt: string;
}

export default function ProblemsPage() {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)

  const [allProblems,setAllProblems] = useState<Problem[]>([])

  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [revision,setRevision] = useState(false)

  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")
  const [selectedProblem,setSelectedProblem] = useState< Problem | null>(null)

  const fetchAllProblems = async() => {
    const params: filterParams ={}
    if (search) params["search"] = search
    if (selectedTopic !== 'All') params["topic"] = selectedTopic
    if (selectedDifficulty !== 'All') params["difficulty"] = selectedDifficulty
    if (revision === true) params["revision"] = true
    try {
      setLoading(true)
      const res = await API.get('/problems',{params})
      setAllProblems(res?.data?.problems)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch data")
      console.error("Problems fetch error",err);
    } finally {
      setLoading(false)
    }
  }

  const handleViewNote = (problem: Problem) => {
    setSelectedProblem(problem)
    setIsNotesModalOpen(true)
  }

  const handleDeleteProblem = async (problem: Problem) => {
    setSelectedProblem(problem)
    try {
      const res = await API.delete(`problems/${problem.id}`)
      toast.success(res?.data?.message || "Problem added successfully",{
        //className: 'toast-success',
        duration: 4000
      })  
      fetchAllProblems()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete problem")
      console.error("Problems fetch error",err);
    }
  }

  const handleUpdateProblem = (problem: Problem) => {
    setSelectedProblem(problem)
    setIsAddModalOpen(true)
  }

  useEffect(()=> {
    fetchAllProblems()
  },[search,selectedTopic,selectedDifficulty,revision])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": 
        return "bg-green-500/20 text-green-800 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-6 px-12 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl text-white font-bold">
            Problem List
          </h1>
          <p className="text-slate-300 mt-1">
            Manage and track all your solved problems
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
        >
          <Plus className="w-4 h-4" />
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
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white placeholder:text-slate-400"
              />
            </div>
            <Select 
            value={selectedTopic}
            onValueChange={(value)=> setSelectedTopic(value)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {topics.map((topic) => (
                  <SelectItem
                    key={topic}
                    value={topic}
                    className="text-white hover:bg-slate-700"
                  >
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
            value={selectedDifficulty}
            onValueChange={(value)=> setSelectedDifficulty(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px] bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {difficulties.map((difficulty) => (
                  <SelectItem
                    key={difficulty}
                    value={difficulty}
                    className="text-white hover:bg-slate-700"
                  >
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2 bg-slate-900/50 border border-slate-700/50 rounded-md px-4 py-2 sm:px-3 sm:py-0.5 justify-center sm:justify-start">
              <Checkbox
                checked={revision}
                onCheckedChange={(value) => setRevision(value as boolean)}
                id="showRevisionOnly"
                className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor="showRevisionOnly"
                className="text-sm font-medium leading-none text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Revision Required
              </label>
            </div>

            
          </div>

          {/* Problems Table */}
          <div className="overflow-x-auto">
            <div className="rounded-md border border-slate-800/30 bg-slate-950/30 backdrop-blur-sm min-w-full">
              <Table className="problems-table">
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300 min-w-[200px]">
                      Problem
                    </TableHead>
                    <TableHead className="text-slate-300 min-w-[100px]">
                      Topic
                    </TableHead>
                    <TableHead className="text-slate-300 min-w-[100px]">
                      Difficulty
                    </TableHead>
                    <TableHead className="text-slate-300 min-w-[120px]">
                      Links
                    </TableHead>
                    <TableHead className="text-slate-300 min-w-[100px]">
                      Revision
                    </TableHead>
                    <TableHead className="text-slate-300 min-w-[120px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div className="flex justify-center items-center py-10">
                          <Loader />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div className="text-center py-10 text-red-400">
                          <AlertTriangle className="mx-auto w-8 h-8 mb-2" />
                          <p className="font-semibold">
                            An error occurred while fetching problems.
                          </p>
                          <p className="text-sm text-slate-400">{error}</p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={fetchAllProblems}
                          >
                            Try again
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : allProblems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div className="text-center py-10">
                          <p className="text-slate-400">
                            No problems found. Try adjusting your filters or
                            add a new problem.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    allProblems.map((problem) => (
                      <TableRow
                        key={problem.id}
                        className="border-slate-800 hover:bg-slate-800/30"
                      >
                        <TableCell className="min-w-[200px]">
                          <div className="space-y-1">
                            <div className="font-medium text-white">
                              {problem.title}
                            </div>
                            <div className="text-sm text-slate-400">
                              {problem.notes ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-slate-400 hover:text-slate-300 h-auto font-normal p-1"
                                  onClick={() => handleViewNote(problem)}
                                >
                                  <FileText className="w-3 h-3" />
                                  View notes
                                </Button>
                              ) : (
                                <span className="text-slate-500 text-xs italic">
                                  No notes
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <Badge
                            variant="outline"
                            className="border-slate-600 text-slate-300"
                          >
                            {problem.topic}
                          </Badge>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <Badge
                            className={getDifficultyColor(problem.difficulty)}
                          >
                            {problem.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="flex items-center gap-2">
                            {problem.link && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-1 h-auto"
                                onClick={() =>
                                  window.open(problem.link, "_blank")
                                }
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span className="sr-only">Open problem</span>
                              </Button>
                            )}
                            {problem.reference && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-1 h-auto"
                                onClick={() =>
                                  window.open(problem.reference, "_blank")
                                }
                              >
                                <BookOpen className="w-4 h-4" />
                                <span className="sr-only">
                                  Open reference
                                </span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          {problem.needRevision ? (
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              Required
                            </Badge>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-slate-400 hover:text-white hover:bg-slate-800"
                               onClick={() => handleUpdateProblem(problem)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDeleteProblem(problem)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

        </CardContent>
      </Card>

      <ProblemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProblemAdd={fetchAllProblems}
        problem={selectedProblem}
      />
      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        problem={selectedProblem}
      />
    </div>
  );
}