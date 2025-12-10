"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-slate-800/70 px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          Ticket cockpit
        </p>
        <h1 className="text-xl font-semibold text-slate-50">
          Support Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4 text-xs text-slate-300">
        <span className="rounded-full bg-slate-800/70 px-3 py-1">
          Today • {time}
        </span>
        <span className="hidden rounded-full bg-emerald-600/20 px-3 py-1 text-emerald-300 sm:inline">
          3 agents online
        </span>
      </div>
    </header>
  );
}
