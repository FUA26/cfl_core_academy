/*
  Warnings:

  - Added the required column `courseId` to the `CourseData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseData" DROP CONSTRAINT "CourseData_id_fkey";

-- AlterTable
ALTER TABLE "CourseData" ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseData" ADD CONSTRAINT "CourseData_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
