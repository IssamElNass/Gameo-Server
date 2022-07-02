/*
  Warnings:

  - You are about to drop the column `release` on the `GamePlatform` table. All the data in the column will be lost.
  - Added the required column `release_string` to the `GamePlatform` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GamePlatform" DROP COLUMN "release",
ADD COLUMN     "release_date" DATE,
ADD COLUMN     "release_string" VARCHAR NOT NULL;
