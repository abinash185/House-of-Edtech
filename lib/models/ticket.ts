// lib/models/ticket.ts
import mongoose, { Schema, Document } from "mongoose";

export type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface ITicket extends Document {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  customerEmail: string;
  assignedTo?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"], default: "OPEN" },
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "MEDIUM" },
    customerEmail: { type: String, required: true, trim: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export const Ticket = (mongoose.models.Ticket as mongoose.Model<ITicket>) || mongoose.model<ITicket>("Ticket", TicketSchema);
