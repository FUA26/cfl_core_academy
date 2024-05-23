/*
  Warnings:

  - You are about to drop the column `questionReplies` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "questionReplies",
ADD COLUMN     "parentQuestionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_parentQuestionId_fkey" FOREIGN KEY ("parentQuestionId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
