/*
  Warnings:

  - A unique constraint covering the columns `[igdb_id]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "InvolvedCompany" DROP CONSTRAINT "InvolvedCompany_companyId_fkey";

-- DropForeignKey
ALTER TABLE "InvolvedCompany" DROP CONSTRAINT "InvolvedCompany_gameId_fkey";

-- DropIndex
DROP INDEX "Game_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Company_igdb_id_key" ON "Company"("igdb_id");

-- AddForeignKey
ALTER TABLE "InvolvedCompany" ADD CONSTRAINT "InvolvedCompany_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("igdb_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvolvedCompany" ADD CONSTRAINT "InvolvedCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("igdb_id") ON DELETE SET NULL ON UPDATE CASCADE;
