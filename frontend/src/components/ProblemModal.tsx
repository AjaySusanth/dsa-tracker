import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"


interface ProblemModalProps {
  isOpen: boolean
  onClose: () => void
}

const topics = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Stacks",
  "Queues",
  "Hash Tables",
  "Sorting",
  "Searching",
  "Recursion",
  "Backtracking",
]

function ProblemModal({ isOpen, onClose }: ProblemModalProps){
  return (
        <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-950/95 border-slate-800/30 text-white backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Problem</DialogTitle>
          <DialogDescription className="text-slate-400">
            Add a new problem to track your progress. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-300">
              Problem Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Two Sum"
              className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white placeholder:text-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic" className="text-slate-300">
              Topic
            </Label>
            <Select>
              <SelectTrigger className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent className="bg-slate-950/90 border-slate-700/50 backdrop-blur-sm">
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic} className="text-white hover:bg-slate-700">
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-300">Difficulty</Label>
            <RadioGroup
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Easy" id="easy" className="border-green-500 text-green-500" />
                <Label htmlFor="easy" className="text-green-400">
                  Easy
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium" id="medium" className="border-yellow-500 text-yellow-500" />
                <Label htmlFor="medium" className="text-yellow-400">
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Hard" id="hard" className="border-red-500 text-red-500" />
                <Label htmlFor="hard" className="text-red-400">
                  Hard
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-300">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about your approach, time complexity, etc."
              className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white placeholder:text-slate-400 min-h-[80px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="revision"
              className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            />
            <Label htmlFor="revision" className="text-slate-300">
              Mark for revision
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
            >
              Add Problem
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ProblemModal