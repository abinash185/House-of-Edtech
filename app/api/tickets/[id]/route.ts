// app/api/tickets/[id]/route.ts
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Ticket } from "@/lib/models/ticket";
import { z } from "zod";
import { verifyToken } from "@/lib/jwt";

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(6).optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  assignedTo: z.string().optional().nullable(),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectMongo();
  const ticket = await Ticket.findById(params.id);
  if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(ticket);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
  const payload = token ? verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });

  await connectMongo();

  const updated = await Ticket.findByIdAndUpdate(params.id, parsed.data, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  // only allow admin to delete
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
  const payload = token ? verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // check role
  if (payload.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectMongo();

  await Ticket.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}
