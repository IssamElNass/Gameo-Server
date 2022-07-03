-- DropForeignKey
ALTER TABLE "InvolvedCompany" DROP CONSTRAINT "InvolvedCompany_gameId_fkey";

-- AddForeignKey
ALTER TABLE "InvolvedCompany" ADD CONSTRAINT "InvolvedCompany_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
