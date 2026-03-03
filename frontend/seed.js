import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD, 12);
  const admin = await prisma.user.upsert({
    where: { username: process.env.ADMIN_SEED_USERNAME },
    update: {},
    create: { username: process.env.ADMIN_SEED_USERNAME, password, role: "admin" },
  });
  console.log("Admin seeded:", admin.username);
}

main().catch(console.error).finally(() => prisma.$disconnect());
