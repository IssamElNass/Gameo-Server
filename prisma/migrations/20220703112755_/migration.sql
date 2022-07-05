/*
  Warnings:

  - You are about to drop the column `release_string` on the `GamePlatform` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[igdb_id]` on the table `Platform` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `release_human` to the `GamePlatform` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GamePlatform" DROP CONSTRAINT "GamePlatform_platformId_fkey";

-- AlterTable
ALTER TABLE "GamePlatform" DROP COLUMN "release_string",
ADD COLUMN     "release_human" VARCHAR NOT NULL,
ALTER COLUMN "release_date" SET DATA TYPE VARCHAR;

-- CreateIndex
CREATE UNIQUE INDEX "Platform_igdb_id_key" ON "Platform"("igdb_id");

-- AddForeignKey
ALTER TABLE "GamePlatform" ADD CONSTRAINT "GamePlatform_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("igdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;
