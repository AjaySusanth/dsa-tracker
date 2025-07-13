
export const calculateStreak = (contributions: {date: string, count: number}[]) => {
    let currentStreak = 0
    let bestStreak = 0
    let tempStreak = 0

    // Calcuating best streak
    for(let i=0; i<contributions.length; i++) {
        if (contributions[i].count > 0){
            tempStreak +=1
            bestStreak = Math.max(tempStreak,bestStreak)
        }
        else tempStreak = 0
    }

    // Calculating current streak
    for(let i=contributions.length - 1 ; i>=0; i--) {
        if (contributions[i].count > 0) {
            currentStreak +=1
        }
        else {
            if (i === contributions.length - 1) {
                continue
            }
            break
        }
    }
    return {currentStreak, bestStreak}

}
