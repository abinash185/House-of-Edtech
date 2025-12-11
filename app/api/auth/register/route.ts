// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { User } from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signToken } from "@/lib/jwt";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  await connectMongo();

  const exists = await User.findOne({ email: parsed.data.email });
  if (exists) return NextResponse.json({ error: "Email already used" }, { status: 409 });

  const hash = await bcrypt.hash(parsed.data.password, 10);
  const user = await User.create({ name: parsed.data.name, email: parsed.data.email, password: hash });

  const token = signToken({ id: user._id.toString(), role: user.role });

  return NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
}
