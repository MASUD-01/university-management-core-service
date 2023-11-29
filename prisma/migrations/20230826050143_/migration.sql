/*
  Warnings:

  - You are about to drop the `academic_department` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `academicDepartmentId` on table `faculties` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "academic_department" DROP CONSTRAINT "academic_department_academicFacultyId_fkey";

-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicDepartmentId_fkey";

-- AlterTable
ALTER TABLE "faculties" ALTER COLUMN "academicDepartmentId" SET NOT NULL;

-- DropTable
DROP TABLE "academic_department";

-- CreateTable
CREATE TABLE "academic_departments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicFacultyId" TEXT NOT NULL,

    CONSTRAINT "academic_departments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "academic_departments" ADD CONSTRAINT "academic_departments_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
