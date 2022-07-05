/*
  Warnings:

  - You are about to drop the `GamePlatform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GamePlatform" DROP CONSTRAINT "GamePlatform_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GamePlatform" DROP CONSTRAINT "GamePlatform_platformId_fkey";

-- DropTable
DROP TABLE "GamePlatform";

-- CreateTable
CREATE TABLE "Release" (
    "id" SERIAL NOT NULL,
    "release_date" VARCHAR,
    "release_human" VARCHAR NOT NULL,
    "region" VARCHAR NOT NULL,
    "gameId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameToPlatform" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToPlatform_AB_unique" ON "_GameToPlatform"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToPlatform_B_index" ON "_GameToPlatform"("B");

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("igdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPlatform" ADD CONSTRAINT "_GameToPlatform_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPlatform" ADD CONSTRAINT "_GameToPlatform_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;
