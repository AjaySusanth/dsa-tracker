-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bestStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastSolvedAt" TIMESTAMP(3);
