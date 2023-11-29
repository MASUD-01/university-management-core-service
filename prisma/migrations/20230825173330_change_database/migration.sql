/*
  Warnings:

  - You are about to drop the column `academicDepartmentId` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `academicFacultyId` on the `faculties` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_academicFacultyId_fkey";

-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "academicDepartmentId",
DROP COLUMN "academicFacultyId";
