-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR NOT NULL,
    "email" VARCHAR(155) NOT NULL,
    "bio" TEXT,
    "profile_picture" VARCHAR NOT NULL,
    "role" VARCHAR(20) NOT NULL DEFAULT E'FREE',
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
