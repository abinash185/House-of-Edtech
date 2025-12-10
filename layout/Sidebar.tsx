"use client";

import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { label: "Overview", badge: "New" },
  { label: "Tickets" },
  { label: "Analytics" },
  { label: "Settings" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <aside className="flex w-60 flex-col border-r border-slate-800/70 bg-slate-950/40 p-4">
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 text-sm font-bold">
          SF
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Support Flow
          </p>
          <p className="text-xs text-slate-300">Team workspace</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 text-sm">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={clsx(
              "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition",
              active === item.label
                ? "bg-slate-800/80 text-slate-50"
                : "text-slate-300 hover:bg-slate-800/50",
            )}
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] text-indigo-200">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-4 rounded-xl bg-slate-900/70 p-3 text-xs text-slate-300">
        <p className="font-medium text-slate-100">Upgrade workspace</p>
        <p className="mt-1 text-[11px] text-slate-400">
          Unlock AI replies, SLAs and automations.
        </p>
        <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-sky-400 px-3 py-1.5 text-[11px] font-medium text-slate-950">
          Go Pro
        </button>
      </div>
    </aside>
  );
}
