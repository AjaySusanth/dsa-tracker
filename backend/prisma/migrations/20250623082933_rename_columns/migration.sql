/*
  Warnings:

  - You are about to drop the column `difficult` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" RENAME COLUMN "difficult" TO "difficulty";
ALTER TABLE "Problem" RENAME COLUMN "tag" TO "topic";

