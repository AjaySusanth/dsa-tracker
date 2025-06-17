-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "needRevision" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reference" TEXT;
