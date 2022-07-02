import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import axios from "axios";

const hashedPassword = bcrypt.hashSync("test", 14);
const prisma = new PrismaClient();

// Variables
const statusses: string[] = [
  "In Backlog",
  "Playing",
  "Paused",
  "Beaten",
  "Completed",
  "Quit",
];

const users: User[] = [
  { username: "bondi", email: "bondi@gameo.io", password: hashedPassword },
  { username: "loid", email: "loid@gameo.io", password: hashedPassword },
  { username: "yor", email: "yor@gameo.io", password: hashedPassword },
];

type User = {
  username: string;
  email: string;
  password: string;
};

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

type Platform = {
  id: number;
  name: string;
  slug: string;
};

type GetPlatformsResponse = {
  data: Platform[];
};

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
      `fields name, slug, description;limit 500;offset ${offset};`,
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

async function getGames(offset: number = 0) {
  try {
    // 👇️ const data: GetUsersResponse
    const { data } = await axios.post<any>(
      "https://api.igdb.com/v4/games",
      `fields id, involved_companies.*,release_dates.*, name, slug, genres.name, genres.slug, platforms.name, platforms.slug,storyline,summary, screenshots.image_id, videos.video_id,websites.url, websites.category, cover.image_id;limit 500;offset ${offset};`,
      {
        headers: {
          "Client-ID": process.env.IGDB_CLIENTID as string,
          Authorization: "Bearer " + process.env.BEARER_TOKEN,
          "Content-Type": "text/plain",
        },
      }
    );
    //console.log(data);

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

async function setPlayStatusses() {
  // Create play statusses
  statusses.forEach(async (name) => {
    await prisma.status.upsert({
      where: { name: name },
      update: {},
      create: {
        name: name,
        description: "",
      },
    });
  });
}

async function setUsers() {
  // Create users
  users.forEach(async (user) => {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        username: user.username,
        password: user.password,
      },
    });
  });
}

async function setGenres() {
  const resultGenres: any = await getGenres();
  console.log(resultGenres);

  const exists = await prisma.genre.findFirst({
    where: {
      igdb_id: resultGenres[0].id,
    },
  });
  if (!exists) {
    resultGenres.forEach(async (genre: any) => {
      await prisma.genre.create({
        data: {
          name: genre.name,
          slug: genre.slug,
          igdb_id: genre.id,
        },
      });
    });
  }
}

async function setPlatforms() {
  const resultPlatforms: any = await getPlatforms();
  console.log(resultPlatforms);

  const existsPlat = await prisma.platform.findFirst({
    where: {
      igdb_id: resultPlatforms[0].id,
    },
  });
  if (!existsPlat) {
    resultPlatforms.forEach(async (platform: any) => {
      await prisma.platform.create({
        data: {
          name: platform.name,
          slug: platform.slug,
          igdb_id: platform.id,
        },
      });
    });
  }
}

async function setCompanies() {
  let companyCount = 0;
  const interval = setInterval(async () => {
    const resultCompanies: any = await getCompanies(companyCount);
    console.log(resultCompanies);

    if (resultCompanies.length <= 0) clearInterval(interval);
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

      companyCount = companyCount + 500;
    }
  }, 2000);
}

async function setGames() {
  let gamesCount = 0;
  const interval = setInterval(async () => {
    const resultGames: any = await getGames(gamesCount);
    console.log(resultGames);

    if (resultGames.length <= 0) clearInterval(interval);
    else {
      //console.log(resultGames);

      resultGames.forEach(async (game: any) => {
        let screenshts: Media[] = [];
        let video: Media[] = [];
        let releases: GamePlatform[] = [];
        let involcedCompanies: any[] = [];
        if (game.screenshots) {
          game.screenshots.forEach((sc: any) => {
            screenshts.push({
              caption: null,
              url: generateImageUrl(sc.image_id),
            });
          });
        }

        if (game.videos) {
          game.videos.forEach((v: any) => {
            video.push({
              caption: null,
              url: v.video_id,
            });
          });
        }

        if (game.involved_companies) {
          game.involved_companies.forEach((ic: any) => {
            involcedCompanies.push({
              igdb_id: ic.id,
              developer: ic.developer,
              publisher: ic.publisher,
              companyId: ic.company ? ic.company : null,
            });
          });
        }

        try {
          await prisma.game.create({
            data: {
              name: game.name,
              slug: game.slug,
              igdb_id: game.id,
              description: game.summary ? game.summary : "",
              gamecover: game.cover
                ? generateImageUrl(game.cover.image_id)
                : "",
              screenshots: {
                create: screenshts,
              },
              videos: {
                create: video,
              },
              companies: {
                create: involcedCompanies,
              },
            },
          });
        } catch (error) {
          console.error(error);
          console.log(involcedCompanies);
          console.log(game);
          throw error;
        }
      });

      gamesCount = gamesCount + 500;
    }
  }, 2000);
}

function generateImageUrl(imageId: string): string {
  return `https://images.igdb.com/igdb/image/upload/t_original/${imageId}.png`;
}

async function main() {
  // await setUsers();
  // await setPlayStatusses();
  // await setGenres();
  // await setPlatforms();
  //await setCompanies();
  await setGames();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
