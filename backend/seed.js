import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import prisma from "./config/db.js";

dotenv.config();

const seedAdmin = async () => {
  const username = process.env.ADMIN_SEED_USERNAME;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!username || !password) {
    throw new Error("ADMIN_SEED_USERNAME and ADMIN_SEED_PASSWORD must be set in environment variables.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`Admin seeded: ${admin.username}`);
};

seedAdmin()
  .catch((error) => {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
