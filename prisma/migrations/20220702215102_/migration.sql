-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR NOT NULL,
    "email" VARCHAR(155) NOT NULL,
    "bio" TEXT,
    "profile_picture" VARCHAR NOT NULL DEFAULT 'https://wallpaperaccess.com/full/4595683.jpg',
    "role" VARCHAR(20) NOT NULL DEFAULT 'FREE',
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "token" VARCHAR NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "statusId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(150),

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "description" VARCHAR,
    "igdb_id" INTEGER,
    "gamecover" VARCHAR NOT NULL,
    "website" VARCHAR,
    "patchNotes" VARCHAR,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameScreenshot" (
    "id" SERIAL NOT NULL,
    "caption" VARCHAR(50),
    "url" VARCHAR NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameScreenshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameVideo" (
    "id" SERIAL NOT NULL,
    "caption" VARCHAR,
    "url" VARCHAR NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePlatform" (
    "id" SERIAL NOT NULL,
    "release_date" DATE,
    "release_string" VARCHAR NOT NULL,
    "gameId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,

    CONSTRAINT "GamePlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platform" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "igdb_id" INTEGER,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "igdb_id" INTEGER,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvolvedCompany" (
    "id" SERIAL NOT NULL,
    "developer" BOOLEAN NOT NULL,
    "publisher" BOOLEAN NOT NULL,
    "igdb_id" INTEGER,
    "gameId" INTEGER,

    CONSTRAINT "InvolvedCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "igdb_id" INTEGER,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameToGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CompanyToInvolvedCompany" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Game_igdb_id_key" ON "Game"("igdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "GameScreenshot_caption_key" ON "GameScreenshot"("caption");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_slug_key" ON "Platform"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToGenre_AB_unique" ON "_GameToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToGenre_B_index" ON "_GameToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToInvolvedCompany_AB_unique" ON "_CompanyToInvolvedCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToInvolvedCompany_B_index" ON "_CompanyToInvolvedCompany"("B");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameScreenshot" ADD CONSTRAINT "GameScreenshot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameVideo" ADD CONSTRAINT "GameVideo_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlatform" ADD CONSTRAINT "GamePlatform_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlatform" ADD CONSTRAINT "GamePlatform_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvolvedCompany" ADD CONSTRAINT "InvolvedCompany_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGenre" ADD CONSTRAINT "_GameToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGenre" ADD CONSTRAINT "_GameToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToInvolvedCompany" ADD CONSTRAINT "_CompanyToInvolvedCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToInvolvedCompany" ADD CONSTRAINT "_CompanyToInvolvedCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "InvolvedCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
