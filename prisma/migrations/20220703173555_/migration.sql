/*
  Warnings:

  - You are about to drop the column `website` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "website";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "GameWebsite" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "url" VARCHAR NOT NULL,
    "igdb_id" INTEGER,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameWebsite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameWebsite_igdb_id_key" ON "GameWebsite"("igdb_id");

-- AddForeignKey
ALTER TABLE "GameWebsite" ADD CONSTRAINT "GameWebsite_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
