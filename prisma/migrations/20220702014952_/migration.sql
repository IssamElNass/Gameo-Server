-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "igdb_id" INTEGER,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
