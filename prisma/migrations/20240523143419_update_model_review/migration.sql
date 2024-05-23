/*
  Warnings:

  - You are about to drop the column `comment` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `commentReplies` on the `Review` table. All the data in the column will be lost.
  - Added the required column `review` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "comment",
DROP COLUMN "commentReplies",
ADD COLUMN     "review" TEXT NOT NULL;
