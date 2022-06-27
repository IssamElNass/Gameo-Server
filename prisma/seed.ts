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

interface GamePlatform {
  platformId: number;
  release: Date;
}

interface Media {
  caption: string | null;
  url: string;
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

  // Create games
  data.games.forEach(async (game) => {
    let screenshts: Media[] = [];
    let video: Media[] = [];
    let releases: GamePlatform[] = [];

    game.screenshots.forEach((sc) => {
      screenshts.push({
        caption: null,
        url: sc,
      });
    });

    game.videos.forEach((v) => {
      video.push({
        caption: null,
        url: v,
      });
    });

    game.platforms.forEach((v) => {
      releases.push({
        release: v.release,
        platformId: v.platform_id,
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
        videos: {
          create: video,
        },
        platforms: {
          create: releases,
        },
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
