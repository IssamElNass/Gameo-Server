import { PrismaClient, Prisma } from "@prisma/client";

import axios from "axios";

const prisma = new PrismaClient();

// Interfaces
interface User {
  username: string;
  email: string;
  password: string;
}

interface GamePlatform {
  platformId: number;
  release: Date;
}

interface Media {
  caption: string | null;
  url: string;
}

type Genre = {
  id: number;
  name: string;
  slug: string;
};

type GetGenresResponse = {
  data: Genre[];
};

// Variables
const statusses: string[] = [
  "In Backlog",
  "Playing",
  "Paused",
  "Beaten",
  "Completed",
  "Quit",
];

async function getGenres() {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.post<GetGenresResponse>(
      "https://api.igdb.com/v4/genres",
      "f id,name,slug;\r\nl 80;",
      {
        headers: {
          "Client-ID": process.env.IGDB_CLIENTID as string,
          Authorization: "Bearer " + process.env.BEARER_TOKEN,
          "Content-Type": "text/plain",
        },
      }
    );
    console.log(data);

    // console.log(JSON.stringify(data, null, 4));
    console.log();

    // 👇️ "response status is: 200"
    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw error;
    } else {
      console.log("unexpected error: ", error);
      throw error;
    }
  }
}

async function main() {
  const result: any = await getGenres();
  console.log(result);

  result.forEach(async (genre: any) => {
    await prisma.genre.create({
      data: {
        name: genre.name,
        slug: genre.slug,
        igdb_id: genre.id,
      },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
