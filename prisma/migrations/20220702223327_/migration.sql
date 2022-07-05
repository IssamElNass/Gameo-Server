/*
  Warnings:

  - You are about to drop the `_CompanyToInvolvedCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompanyToInvolvedCompany" DROP CONSTRAINT "_CompanyToInvolvedCompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToInvolvedCompany" DROP CONSTRAINT "_CompanyToInvolvedCompany_B_fkey";

-- AlterTable
ALTER TABLE "InvolvedCompany" ADD COLUMN     "companyId" INTEGER;

-- DropTable
DROP TABLE "_CompanyToInvolvedCompany";

-- AddForeignKey
ALTER TABLE "InvolvedCompany" ADD CONSTRAINT "InvolvedCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
