import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Tickets Dashboard",
  description: "Full-stack ticket management system with Next.js & GSAP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen app-gradient text-slate-50">
        <div className="flex min-h-screen items-center justify-center px-4 py-6">
          <div className="glass-panel relative flex h-[90vh] w-full max-w-6xl overflow-hidden shadow-2xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
