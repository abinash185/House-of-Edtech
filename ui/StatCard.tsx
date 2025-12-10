import SectionReveal from "@/components/animations/SectionReveal";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
}

export default function StatCard({ label, value, change }: StatCardProps) {
  return (
    <SectionReveal>
      <div className="glass-panel flex flex-col justify-between rounded-2xl border border-slate-800/60 bg-slate-900/70 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          {label}
        </p>
        <div className="mt-3 flex items-end justify-between">
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-xs text-emerald-400">{change}</p>
        </div>
      </div>
    </SectionReveal>
  );
}
