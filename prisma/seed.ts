import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import data from "./games";
const prisma = new PrismaClient();
const hashedPassword = bcrypt.hashSync("test", 14);

// Interfaces
interface User {
  username: string;
  email: string;
  password: string;
}

interface Game {
  name: string;
  slug: string;
  gamecover: string;
}

// Variables
const statusses: string[] = [
  "In Backlog",
  "Playing",
  "Paused",
  "Beaten",
  "Completed",
  "Quit",
];

const platforms: string[] = [
  "PS5",
  "PS4",
  "PS3",
  "PC",
  "Xbox One",
  "Nintendo Switch",
  "Xbox Series X|S",
];

const users: User[] = [
  { username: "bondi", email: "bondi@gameo.io", password: hashedPassword },
  { username: "loid", email: "loid@gameo.io", password: hashedPassword },
  { username: "yor", email: "yor@gameo.io", password: hashedPassword },
];

async function main() {
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

  // Create platforms
  platforms.forEach(async (name) => {
    await prisma.platform.create({
      data: {
        name: name,
      },
    });
  });

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

  data.games.forEach(async (game) => {
    const screenshts: Prisma.GameScreenshotCreateInput[];

    game.screenshots.forEach((sc) => {
      screenshts.push({
        caption: null,
        url: sc,
      });
    });

    await prisma.game.upsert({
      where: { slug: game.slug },
      update: {},
      create: {
        name: game.name,
        slug: game.slug,
        gamecover: game.gamecover,
        description: game.description,
        igdb_id: game.igdb_id,
        website: game.website,
        patchNotes: game.patchNotes,
        screenshots: {
          create: screenshts,
        },
      },
    });
  });

  // Create games

  // Create two Users
  //   collection: {
  //     create: [
  //       {
  //         game: {
  //           connect: { id: sifu.id },
  //         },
  //         status: {
  //           connect: { id: beaten.id },
  //         },
  //       },
  //       {
  //         game: {
  //           connect: { id: tlou.id },
  //         },
  //         status: {
  //           connect: { id: backlog.id },
  //         },
  //       },
  //     ],
  //   },
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
