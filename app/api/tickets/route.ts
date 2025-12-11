// app/api/tickets/route.ts
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Ticket } from "@/lib/models/ticket";
import { z } from "zod";
import { verifyToken } from "@/lib/jwt";

const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(6),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  customerEmail: z.string().email(),
  assignedTo: z.string().optional().nullable(),
});

export async function GET(req: Request) {
  await connectMongo();
  const url = new URL(req.url);
  const status = url.searchParams.get("status") ?? undefined;
  const priority = url.searchParams.get("priority") ?? undefined;
  const search = url.searchParams.get("search") ?? undefined;

  const filter: any = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (search) filter.$or = [
    { title: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } },
  ];

  const tickets = await Ticket.find(filter).sort({ createdAt: -1 }).limit(200);
  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  // require auth
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
  const payload = token ? verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });

  await connectMongo();

  const ticket = await Ticket.create({
    title: parsed.data.title,
    description: parsed.data.description,
    customerEmail: parsed.data.customerEmail,
    priority: parsed.data.priority ?? "MEDIUM",
    assignedTo: parsed.data.assignedTo ?? null,
  });

  return NextResponse.json(ticket, { status: 201 });
}
