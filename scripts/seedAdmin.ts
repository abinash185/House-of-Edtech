// scripts/seedAdmin.ts
import "dotenv/config";
import bcrypt from "bcryptjs";

async function seed() {
  // dynamic import to avoid ESM/CJS cycle problems
  const { connectMongo } = await import("../lib/mongodb");
  const { User } = await import("../lib/models/user");

  await connectMongo();

  const email = process.env.SEED_ADMIN_EMAIL || "admin@supportflow.test";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }

  const pwd = process.env.SEED_ADMIN_PASSWORD || "password123";
  const hash = await bcrypt.hash(pwd, 10);

  await User.create({
    name: "Admin",
    email,
    password: hash,
    role: "ADMIN",
  });

  console.log("Admin created:", email);
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
