import { Router } from "express";
import { createProblem, deleteProblem, getAllProblems, getProblemById, updateProblem } from "../controllers/problem.controller";


const router = Router()

router.post('/',createProblem)
router.get('/',getAllProblems)
router.get('/:id',getProblemById)
router.put('/:id',updateProblem)
router.delete('/:id',deleteProblem)

export default router