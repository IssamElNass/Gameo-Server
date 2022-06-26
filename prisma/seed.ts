import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
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

const users: User[] = [
  { username: "bondi", email: "bondi@gameo.io", password: hashedPassword },
  { username: "loid", email: "loid@gameo.io", password: hashedPassword },
  { username: "yor", email: "yor@gameo.io", password: hashedPassword },
];

const games: Game[] = [
  {
    name: "Sifu",
    slug: "sifu",
    gamecover:
      "https://d2d2z3qzqjizpf.cloudfront.net/eyJidWNrZXQiOiJnZ2FwcCIsImtleSI6Im1lZGlhL2dhbWVzL2tSQ3NVUi8wZmJjNjM1YS1lMjNkLTQzMmEtYjE4Ni0yOTcwMDk1MTBkOTMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGciLCJqcGVnIjp7InF1YWxpdHkiOjgwLCJjaHJvbWFTdWJzYW1wbGluZyI6IjQ6NDo0In0sInJlc2l6ZSI6eyJ3aWR0aCI6MzA3fX19",
  },
  {
    name: "The Last Of Us Part 1",
    slug: "the-last-of-us-part-1",
    gamecover:
      "https://d2d2z3qzqjizpf.cloudfront.net/eyJidWNrZXQiOiJnZ2FwcCIsImtleSI6Im1lZGlhL2dhbWVzL1Y2S29uMi8yNzIxMzY1ZC1kZmYyLTRkYmYtYjhlMi1hNTFkZmIzNTcyYTcuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGciLCJqcGVnIjp7InF1YWxpdHkiOjgwLCJjaHJvbWFTdWJzYW1wbGluZyI6IjQ6NDo0In0sInJlc2l6ZSI6eyJ3aWR0aCI6MzA3fX19",
  },
  {
    name: "Flintlock: The Siege of Dawn",
    slug: "flintlock-the-siege-of-dawn",
    gamecover:
      "https://d2d2z3qzqjizpf.cloudfront.net/eyJidWNrZXQiOiJnZ2FwcCIsImtleSI6Im1lZGlhL2dhbWVzL210Y2VHcy8yYzkzOGQyZi00ZGNjLTQ1YjMtODQwYi04MDUxODM1YmMwMWQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGciLCJqcGVnIjp7InF1YWxpdHkiOjgwLCJjaHJvbWFTdWJzYW1wbGluZyI6IjQ6NDo0In0sInJlc2l6ZSI6eyJ3aWR0aCI6MzA3fX19",
  },
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
  games.forEach(async (game) => {
    await prisma.game.upsert({
      where: { slug: game.slug },
      update: {},
      create: {
        name: game.name,
        slug: game.slug,
        gamecover: game.gamecover,
      },
    });
  });

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
