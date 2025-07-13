import { getContributions } from "../services/analytics.service"
import { calculateStreak } from "./calculateStreak"

export const getStreak = async(userId : number) => {
    const contributions = await getContributions(userId)
    const {currentStreak, bestStreak } = calculateStreak(contributions)
    return {currentStreak, bestStreak}
} 