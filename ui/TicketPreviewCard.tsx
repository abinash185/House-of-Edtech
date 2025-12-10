import SectionReveal from "@/components/animations/SectionReveal";

interface TicketPreviewCardProps {
  title: string;
  customer: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In progress" | "Resolved";
}

export default function TicketPreviewCard({
  title,
  customer,
  priority,
  status,
}: TicketPreviewCardProps) {
  const priorityColor =
    priority === "High"
      ? "bg-pink-500/20 text-pink-300"
      : priority === "Medium"
      ? "bg-amber-500/20 text-amber-300"
      : "bg-emerald-500/20 text-emerald-300";

  const statusColor =
    status === "Open"
      ? "text-sky-300"
      : status === "In progress"
      ? "text-amber-300"
      : "text-emerald-300";

  return (
    <SectionReveal>
      <div className="glass-panel flex flex-col rounded-2xl border border-slate-800/60 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-slate-50 line-clamp-1">
            {title}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] ${priorityColor}`}
          >
            {priority}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400">Customer: {customer}</p>
        <p className={`mt-3 text-xs font-medium ${statusColor}`}>{status}</p>
      </div>
    </SectionReveal>
  );
}
