"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blobsRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setDone(true),
      });

      // Floating blobs (parallax-style)
      if (blobsRef.current) {
        const blobs = blobsRef.current.querySelectorAll(".blob");
        gsap.to(blobs, {
          yPercent: 20,
          xPercent: -10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          stagger: 0.3,
          ease: "sine.inOut",
        });
      }

      // Intro text
      if (textRef.current) {
        tl.fromTo(
          textRef.current.querySelector(".logo"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
        )
          .fromTo(
            textRef.current.querySelector(".subtitle"),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            "-=0.3",
          )
          .fromTo(
            textRef.current.querySelector(".loading-bar-fill"),
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left", duration: 1.2 },
          );
      }

      // Slide preloader up & fade
      tl.to(containerRef.current, {
        yPercent: -120,
        opacity: 0,
        duration: 1,
        ease: "power4.in",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute inset-0 z-40 overflow-hidden bg-slate-950"
    >
      {/* Parallax layers */}
      <div
        ref={blobsRef}
        className="pointer-events-none absolute inset-0 opacity-60"
      >
        <div className="blob absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/70 blur-3xl" />
        <div className="blob absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/60 blur-3xl" />
        <div className="blob absolute -right-24 top-10 h-56 w-56 rounded-full bg-cyan-400/60 blur-3xl" />
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative flex h-full flex-col items-center justify-center gap-6 text-center"
      >
        <div className="logo text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-pink-300 bg-clip-text text-transparent">
            Support Flow
          </span>
        </div>
        <p className="subtitle max-w-md text-sm text-slate-300 sm:text-base">
          Initializing your ticket cockpit — crafting a smooth experience for
          support teams.
        </p>

        <div className="mt-4 w-56">
          <div className="loading-bar h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div className="loading-bar-fill h-full bg-gradient-to-r from-indigo-400 via-sky-400 to-pink-400" />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
            Loading dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
