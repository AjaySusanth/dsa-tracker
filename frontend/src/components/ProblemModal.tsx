import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import API from "@/lib/Axios";
import { toast } from "sonner";
import { Loader } from "./ui/loader";

interface ProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProblemAdd?: () => void;
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
];

function ProblemModal({ isOpen, onClose, onProblemAdd }: ProblemModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    topic: "",
    difficulty: "",
    reference: "",
    notes: "",
    needRevision: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await API.post("/problems", formData);
      toast.success(res?.data?.message || "Problem added successfully",{
        //className: 'toast-success',
        duration: 4000
      })
      if (onProblemAdd) onProblemAdd()
      onClose();
      setFormData({
        title: "",
        link: "",
        topic: "",
        difficulty: "",
        reference: "",
        notes: "",
        needRevision: false,
    });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add problem");
      console.error("Problem add modal error: ",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        // Key changes here:
        // sm:max-w-[425px]: Keeps max width on larger screens.
        // w-[90vw]: Allows it to take up
        //  to 90% of viewport width, better for small screens.
        // h-[90vh] / max-h-[90vh]: Constrains height to 90% of viewport height.
        // overflow-y-auto: Adds scrollbar when content exceeds height.
        // p-6 sm:p-8: Adjusted padding for better fit.
        // Custom scrollbar classes (scrollbar-thin, scrollbar-thumb-slate-700, etc.)
        // might need to be defined in your global CSS or Tailwind config if you want custom scrollbars.
        // For a basic scrollbar, just `overflow-y-auto` is enough.
        className="
          sm:max-w-[425px] w-[90vw] h-[90vh] max-h-[90vh]
          bg-slate-950/95 border-slate-800/30 text-white backdrop-blur-sm
          flex flex-col // Use flexbox for layout
          overflow-hidden // Hide default overflow from DialogContent if child handles scrolling
          p-6 sm:p-8 // Adjust overall padding
        "
      >
       
        {/* This div will handle the scrolling for the form content */}
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {" "}
          <DialogHeader className="shrink-0 pb-4">
          {" "}
          {/* shrink-0 prevents header from shrinking */}
          <DialogTitle className="text-white">Add New Problem</DialogTitle>
          <DialogDescription className="text-slate-400">
            Add a new problem to track your progress. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
          {/* pr-2 adds space for scrollbar */}
          <form className="space-y-4 pb-4" onSubmit={handleSubmit}>
            {" "}
            {/* pb-4 adds padding at bottom of scrollable area */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">
                Problem Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Two Sum"
                className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white placeholder:text-slate-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="problemUrl" className="text-slate-300">
                Problem URL
              </Label>
              <div className="relative">
                <Input
                  id="problemUrl"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  placeholder="https://leetcode.com/problems/two-sum"
                  className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white placeholder:text-slate-400 pr-10"
                />
                <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-slate-300">
                Topic
              </Label>
              <Select
                value={formData.topic}
                onValueChange={(value) =>
                  setFormData({ ...formData, topic: value })
                }
                required
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent className="bg-slate-950/90 border-slate-700/50 backdrop-blur-sm">
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
            </div>
            <div className="space-y-3">
              <Label className="text-slate-300">Difficulty</Label>
              <RadioGroup
                className="flex space-x-6"
                value={formData.difficulty}
                onValueChange={(value) =>
                  setFormData({ ...formData, difficulty: value })
                }
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Easy"
                    id="easy"
                    className="border-green-500 text-green-500"
                  />
                  <Label htmlFor="easy" className="text-green-400">
                    Easy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Medium"
                    id="medium"
                    className="border-yellow-500 text-yellow-500"
                  />
                  <Label htmlFor="medium" className="text-yellow-400">
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Hard"
                    id="hard"
                    className="border-red-500 text-red-500"
                  />
                  <Label htmlFor="hard" className="text-red-400">
                    Hard
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">References (Optional)</Label>
                <span className="text-xs text-slate-500">
                  YouTube tutorials, articles, etc.
                </span>
              </div>
              <Input
                id="referenceUrl"
                placeholder="e.g., https://youtube.com/my-solution"
                value={formData.reference}
                onChange={(e) =>
                  setFormData({ ...formData, reference: e.target.value })
                }
                className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white placeholder:text-slate-400 pr-10"
                // Made not required here, as some problems might not have immediate references.
                // You can add it back if needed, but it helps reduce mandatory fields.
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-slate-300">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about your approach, time complexity, etc."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm text-white placeholder:text-slate-400 min-h-[80px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="revision"
                checked={formData.needRevision}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, needRevision: checked as boolean })
                }
                className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor="revision" className="text-slate-300">
                Mark for revision
              </Label>
            </div>
            {error && (
              <div
                className="text-red-400 text-sm mt-2 text-center"
                aria-live="polite"
              >
                {error}
              </div>
            )}
            <DialogFooter className="shrink-0 pt-4">
              {" "}
              {/* shrink-0 prevents footer from shrinking */}
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
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
              >
                {loading ? <Loader variant="dots" size="md" /> : "Add Problem"}
              </Button>
            </DialogFooter>
          </form>
        </div>
        {/* End of scrollable div */}
      </DialogContent>
    </Dialog>
  );
}

export default ProblemModal;
