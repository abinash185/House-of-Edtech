"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Preloader from "@/components/animations/Preloader";
import StatCard from "@/ui/StatCard";
import TicketPreviewCard from "@/ui/TicketPreviewCard";
import SectionReveal from "@/components/animations/SectionReveal";

const mockTickets = [
  {
    title: "Refund request: order #83456789 delayed",
    customer: "ayushi.mishra@example.com",
    priority: "High" as const,
    status: "Open" as const,
  },
  {
    title: "Size exchange for denim jacket",
    customer: "rahul.verma@example.com",
    priority: "Medium" as const,
    status: "In progress" as const,
  },
  {
    title: "App shows wrong delivery address",
    customer: "fatima.khan@example.com",
    priority: "Low" as const,
    status: "Resolved" as const,
  },
];

export default function DashboardShell() {
  return (
    <>
      <Preloader />
      <div className="flex h-full w-full">
        <Sidebar />
        <main className="flex flex-1 flex-col">
          <Header />

          <div className="hide-scroll flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* Stats row */}
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                label="Open tickets"
                value="24"
                change="+8% today"
              />
              <StatCard
                label="Avg. first response"
                value="2m 13s"
                change="-32% vs yesterday"
              />
              <StatCard
                label="Customer satisfaction"
                value="4.8 ★"
                change="+0.2 this week"
              />
            </div>

            {/* Main content sections */}
            <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.3fr)]">
              {/* Left: activity + backlog */}
              <SectionReveal>
                <section className="glass-panel h-full rounded-2xl border border-slate-800/60 bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-slate-100">
                      Live queue
                    </h2>
                    <span className="rounded-full bg-slate-800/70 px-3 py-1 text-[11px] text-slate-300">
                      7 waiting • SLA 15m
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    This is just static data now. Later we&apos;ll hook it to
                    the real backend & database.
                  </p>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>🔔 3 new refund tickets</span>
                      <span className="text-sky-300">High impact</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>📦 Delivery delays in Mumbai</span>
                      <span className="text-amber-300">Monitor</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>🤖 AI replies enabled for 12 tickets</span>
                      <span className="text-emerald-300">Experiment</span>
                    </div>
                  </div>
                </section>
              </SectionReveal>

              {/* Right: recent tickets */}
              <section className="space-y-3">
                <SectionReveal>
                  <h2 className="text-sm font-semibold text-slate-100">
                    Recent tickets
                  </h2>
                </SectionReveal>
                <div className="space-y-3">
                  {mockTickets.map((t, i) => (
                    <TicketPreviewCard key={i} {...t} />
                  ))}
                </div>
              </section>
            </div>

            {/* Footer for your details */}
            <SectionReveal>
              <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/70 pt-3 text-[11px] text-slate-400">
                <span>Made by Abinash Kumar</span>
                <div className="space-x-3">
                  <a
                    href="https://github.com/YOUR_GITHUB_USERNAME"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/YOUR_LINKEDIN_ID"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2"
                  >
                    LinkedIn
                  </a>
                </div>
              </footer>
            </SectionReveal>
          </div>
        </main>
      </div>
    </>
  );
}
