/*
  Warnings:

  - Added the required column `slug` to the `Platform` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Platform" ADD COLUMN     "igdb_id" INTEGER,
ADD COLUMN     "slug" VARCHAR NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR;
