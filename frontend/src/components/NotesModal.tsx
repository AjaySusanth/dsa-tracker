
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, BookOpen} from "lucide-react"

interface Problem {
  id: number
  title: string
  topic: string
  difficulty: string
  link?: string
  notes: string
  needRevision: boolean
  reference?: string
  createdAt: string
}

interface NotesModalProps {
  isOpen: boolean
  onClose: () => void
  problem: Problem | null
}

export function NotesModal({ isOpen, onClose, problem }: NotesModalProps) {
  if (!problem) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-800 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-xl font-bold text-white pr-8">{problem.title}</DialogTitle>
          </div>

          {/* Problem metadata */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              {problem.topic}
            </Badge>
            <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
            {problem.needRevision && (
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Revision Required</Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {problem.link && (
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 bg-transparent"
                onClick={() => window.open(problem.link, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Problem
              </Button>
            )}
            {problem.reference && (
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 bg-transparent"
                onClick={() => window.open(problem.reference, "_blank")}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Reference
              </Button>
            )}
          </div>
        </DialogHeader>

        {/* Notes content */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-slate-200">Notes</h3>
          {problem.notes ? (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">{problem.notes}</div>
            </div>
          ) : (
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30 text-center">
              <p className="text-slate-500">No notes available for this problem</p>
            </div>
          )}
        </div>

        {/* Footer with date */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <p className="text-sm text-slate-400">Added on {new Date(problem.createdAt).toLocaleDateString()}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
