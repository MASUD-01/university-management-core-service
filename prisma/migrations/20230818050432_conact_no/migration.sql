/*
  Warnings:

  - Changed the type of `year` on the `academic_semesters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contactNo` on the `faculties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contactNo` on the `students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "academic_semesters" DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "contactNo",
ADD COLUMN     "contactNo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "contactNo",
ADD COLUMN     "contactNo" INTEGER NOT NULL;
