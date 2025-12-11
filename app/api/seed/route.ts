// app/api/seed/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongo } from "@/lib/mongodb";
import { User } from "@/lib/models/user";

/**
 * DEV ONLY: seeds an admin user.
 * - Only works when NODE_ENV !== "production"
 * - Remove this file after successful seeding!
 */

export async function GET() {
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Not allowed in production" }, { status: 403 });
    }

    // ensure env required values exist
    if (!process.env.SEED_ADMIN_EMAIL || !process.env.SEED_ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Missing SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env.local" },
        { status: 400 },
      );
    }

    await connectMongo();

    const email = process.env.SEED_ADMIN_EMAIL;
    const pwd = process.env.SEED_ADMIN_PASSWORD;

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ ok: true, message: "Admin already exists", email });
    }

    const hash = await bcrypt.hash(pwd, 10);
    await User.create({
      name: "Admin",
      email,
      password: hash,
      role: "ADMIN",
    });

    return NextResponse.json({ ok: true, message: "Admin created", email });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}
