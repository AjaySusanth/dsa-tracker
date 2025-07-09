import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getDailyStats, getSummary, getTopicWiseCount,getContributions } from "../controllers/analytics.controller";


const router = Router()

router.get('/summary',getSummary)
router.get('/topic',getTopicWiseCount)
router.get('/daily',getDailyStats)
router.get('/contributions',getContributions)
export default router
