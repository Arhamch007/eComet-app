"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* Particle network background, adapted from the 21st.dev "particles-bg"
   (particles.js) look without its runtime CDN script or global #particles-js
   id: a small canvas that fills its parent, draws dots in the logo palette
   joined by faint lines, and links nearby dots to the cursor ("grab").
   - pauses when off-screen or when the tab is hidden
   - renders one still frame under prefers-reduced-motion
   - density scales with area, so phones draw fewer particles
   Decorative and hidden from assistive tech. */

const COLORS = ["#01e2f8", "#1590ec", "#0d5df5", "#681bf5"];

type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };

export function ParticlesBg({
  className,
  density = 1 / 9000,
  linkDistance = 140,
  grabDistance = 190,
}: {
  className?: string;
  /** particles per px² */
  density?: number;
  linkDistance?: number;
  grabDistance?: number;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    let frame = 0;
    let running = false;
    let visible = false;
    const pointer = { x: -9999, y: -9999, on: false };

    const seed = () => {
      const count = Math.max(24, Math.min(110, Math.round(w * h * density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1.2 + Math.random() * 1.8,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // links between particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            const o = 1 - Math.sqrt(d2) / linkDistance;
            ctx.strokeStyle = `rgba(21, 144, 236, ${0.22 * o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // grab: link to the cursor
        if (pointer.on) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < grabDistance) {
            ctx.strokeStyle = `rgba(13, 93, 245, ${0.5 * (1 - d / grabDistance)})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }
      // dots
      for (const p of particles) {
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(host);

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // listen on the nearest section: the canvas and its parent ignore pointer events
    const target: HTMLElement = canvas.closest("section") ?? host;
    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.on = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerleave", onLeave);
    }
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    resize();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density, linkDistance, grabDistance]);

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none absolute inset-0 block", className)} />;
}
