import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getDailyStats, getSummary, getTopicWiseCount } from "../controllers/analytics.controller";


const router = Router()

router.get('/summary',getSummary)
router.get('/topic',getTopicWiseCount)
router.get('/daily',getDailyStats)

export default router
