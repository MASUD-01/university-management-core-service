-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_academicDepartmentId_fkey";

-- AlterTable
ALTER TABLE "faculties" ALTER COLUMN "academicDepartmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
