/*
  Warnings:

  - Made the column `igdb_id` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "igdb_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "InvolvedCompany" (
    "id" SERIAL NOT NULL,
    "developer" BOOLEAN NOT NULL,
    "publisher" BOOLEAN NOT NULL,
    "igdb_id" INTEGER,
    "gameId" INTEGER,
    "companyId" INTEGER,

    CONSTRAINT "InvolvedCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvolvedCompany" ADD CONSTRAINT "InvolvedCompany_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvolvedCompany" ADD CONSTRAINT "InvolvedCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
