-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "igdb_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_picture" SET DEFAULT E'https://wallpaperaccess.com/full/4595683.jpg';
