import { PrismaClient, Prisma } from "@prisma/client";

import axios from "axios";

const prisma = new PrismaClient();

type Genre = {
  id: number;
  name: string;
  slug: string;
};

type GetGenresResponse = {
  data: Genre[];
};

type Platform = {
  id: number;
  name: string;
  slug: string;
};

type GetPlatformsResponse = {
  data: Platform[];
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
    const { data } = await axios.post<GetGenresResponse>(
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

async function getPlatforms() {
  try {
    // 👇️ const data: GetUsersResponse
    const { data } = await axios.post<GetPlatformsResponse>(
      "https://api.igdb.com/v4/platforms",
      "f id,name,slug;\r\nl 500;",
      {
        headers: {
          "Client-ID": process.env.IGDB_CLIENTID as string,
          Authorization: "Bearer " + process.env.BEARER_TOKEN,
          "Content-Type": "text/plain",
        },
      }
    );
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

async function getCompanies(offset: number) {
  try {
    // 👇️ const data: GetUsersResponse
    const { data } = await axios.post<GetPlatformsResponse>(
      "https://api.igdb.com/v4/companies",
      `fields name, slug, description;limit 200;offset ${offset};`,
      {
        headers: {
          "Client-ID": process.env.IGDB_CLIENTID as string,
          Authorization: "Bearer " + process.env.BEARER_TOKEN,
          "Content-Type": "text/plain",
        },
      }
    );
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
  // const resultGenres: any = await getGenres();
  // console.log(resultGenres);

  // const exists = await prisma.genre.findFirst({
  //   where: {
  //     igdb_id: resultGenres[0].id,
  //   },
  // });
  // if (!exists) {
  //   resultGenres.forEach(async (genre: any) => {
  //     await prisma.genre.create({
  //       data: {
  //         name: genre.name,
  //         slug: genre.slug,
  //         igdb_id: genre.id,
  //       },
  //     });
  //   });
  // }

  // const resultPlatforms: any = await getPlatforms();
  // console.log(resultPlatforms);

  // const existsPlat = await prisma.platform.findFirst({
  //   where: {
  //     igdb_id: resultGenres[0].id,
  //   },
  // });
  // if (!existsPlat) {
  //   resultPlatforms.forEach(async (platform: any) => {
  //     await prisma.platform.create({
  //       data: {
  //         name: platform.name,
  //         slug: platform.slug,
  //         igdb_id: platform.id,
  //       },
  //     });
  //   });
  // }
  let companyCount = 0;
  const interval = setInterval(async () => {
    const resultCompanies: any = await getCompanies(companyCount);
    console.log(resultCompanies);

    if (resultCompanies.length >= 200000) clearInterval(interval);
    else {
      console.log(resultCompanies);

      resultCompanies.forEach(async (company: any) => {
        await prisma.company.create({
          data: {
            name: company.name,
            slug: company.slug,
            igdb_id: company.id,
            description: company.description ? company.description : "",
          },
        });
      });

      companyCount = companyCount + 200;
    }
  }, 2000);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
