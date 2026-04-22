"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   STASHIFY LOGO SVG
───────────────────────────────────────── */
const StashifyLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="icongrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2563eb" }} />
        <stop offset="100%" style={{ stopColor: "#7c3aed" }} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#icongrad)" />
    <rect x="35" y="122" width="130" height="58" rx="9" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
    <rect x="35" y="148" width="130" height="8" fill="rgba(255,255,255,0.10)" />
    <rect x="30" y="92" width="140" height="38" rx="9" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    <rect x="38" y="95" width="124" height="5" rx="3" fill="rgba(255,255,255,0.30)" />
    <text x="100" y="120" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontWeight="700" fill="rgba(255,255,255,0.95)">S</text>
    <rect x="88" y="126" width="24" height="14" rx="4" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
    <circle cx="100" cy="133" r="4" fill="rgba(255,255,255,0.9)" />
    <circle cx="100" cy="133" r="2" fill="#2563eb" />
    <rect x="94" y="93" width="12" height="4" rx="2" fill="rgba(99,102,241,0.55)" />
    <circle cx="100" cy="79" r="11" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="100" y="84" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#92400e">$</text>
    <line x1="100" y1="52" x2="100" y2="66" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M93 60 L100 68 L107 60" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="45" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)" />
    <rect x="137" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)" />
  </svg>
);

/* ─────────────────────────────────────────
   LUCIDE-STYLE INLINE SVG ICONS
───────────────────────────────────────── */
const Icon = {
  zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  globe: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  dollarSign: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  smartphone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  lock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  globe20: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  messageCircle: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  zap22: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  target: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  arrowRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  send: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  check: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  base: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="#0052FF" />
      <path d="M12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5c2.8 0 5.12-2.1 5.46-4.82H12v-1.36h6.99c.01.22.01.45.01.68 0 3.87-3.13 7-7 7s-7-3.13-7-7 3.13-7 7-7c1.93 0 3.68.78 4.95 2.05l-.96.96A5.46 5.46 0 0 0 12 6.5z" fill="white" />
    </svg>
  ),
};

/* ─────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.classList.add("revealed");
            }, parseInt(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1800;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(target);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────
   3D TILT CARD
───────────────────────────────────────── */
function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)", transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   FLOATING ORB BACKGROUND
───────────────────────────────────────── */
function OrbField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary orb */}
      <div className="orb orb-1" />
      {/* Secondary orb */}
      <div className="orb orb-2" />
      {/* Tertiary orb */}
      <div className="orb orb-3" />
      {/* Grid overlay */}
      <div className="grid-overlay" />
    </div>
  );
}

/* ─────────────────────────────────────────
   NOISE TEXTURE OVERLAY
───────────────────────────────────────── */
function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px",
      }}
    />
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Home() {
  const router = useRouter();
  const [navScrolled, setNavScrolled] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --bg: #04080f;
          --surface: rgba(255,255,255,0.03);
          --border: rgba(255,255,255,0.06);
          --border-hover: rgba(99,102,241,0.35);
          --text-primary: #f0f4ff;
          --text-secondary: #64748b;
          --text-tertiary: #334155;
          --blue: #2563eb;
          --indigo: #6366f1;
          --violet: #7c3aed;
          --grad: linear-gradient(135deg, #2563eb, #6366f1);
          --grad-text: linear-gradient(100deg, #60a5fa 0%, #818cf8 45%, #c084fc 100%);
          --font-display: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        body { background: var(--bg); color: var(--text-primary); font-family: var(--font-body); }

        /* ── ORB ANIMATIONS ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0;
          animation: orbFadeIn 2s ease forwards;
        }
        .orb-1 {
          width: 700px; height: 700px;
          top: -15%; left: 10%;
          background: radial-gradient(circle, rgba(37,99,235,0.18), transparent 65%);
          animation: orbFadeIn 2s ease forwards, orbFloat1 22s ease-in-out infinite;
          animation-delay: 0s, 2s;
        }
        .orb-2 {
          width: 500px; height: 500px;
          top: 35%; right: -5%;
          background: radial-gradient(circle, rgba(124,58,237,0.14), transparent 65%);
          animation: orbFadeIn 2.5s ease forwards, orbFloat2 28s ease-in-out infinite;
          animation-delay: 0.3s, 2.5s;
        }
        .orb-3 {
          width: 350px; height: 350px;
          bottom: 5%; left: 25%;
          background: radial-gradient(circle, rgba(99,102,241,0.10), transparent 65%);
          animation: orbFadeIn 3s ease forwards, orbFloat3 18s ease-in-out infinite;
          animation-delay: 0.6s, 3s;
        }

        @keyframes orbFadeIn {
          to { opacity: 1; }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, 30px) scale(1.05); }
          66% { transform: translate(-20px, 50px) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -40px) scale(1.08); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0); }
          40% { transform: translate(30px, -25px); }
        }

        /* ── GRID OVERLAY ── */
        .grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── SCROLL REVEAL ── */
        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.23, 1, 0.32, 1), transform 0.75s cubic-bezier(0.23, 1, 0.32, 1);
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── HERO TEXT ANIMATIONS ── */
        .hero-badge {
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) 0.2s forwards;
        }
        .hero-h1 {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s cubic-bezier(0.23,1,0.32,1) 0.45s forwards;
        }
        .hero-sub {
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.8s cubic-bezier(0.23,1,0.32,1) 0.65s forwards;
        }
        .hero-ctas {
          opacity: 0;
          transform: translateY(14px);
          animation: fadeUp 0.8s cubic-bezier(0.23,1,0.32,1) 0.82s forwards;
        }
        .hero-card {
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          animation: heroCard 1.1s cubic-bezier(0.23,1,0.32,1) 1s forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroCard {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── GRADIENT TEXT ── */
        .grad-text {
          background: var(--grad-text);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── SECTION LABEL ── */
        .section-label {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ── STEP NUMBER LARGE ── */
        .step-number-bg {
          font-family: var(--font-display);
          font-size: 120px;
          font-weight: 800;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(99,102,241,0.10);
          position: absolute;
          top: -20px;
          right: -10px;
          pointer-events: none;
          user-select: none;
          transition: -webkit-text-stroke-color 0.3s ease;
        }
        .step-card:hover .step-number-bg {
          -webkit-text-stroke-color: rgba(99,102,241,0.22);
        }

        /* ── BUTTON STYLES ── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--grad);
          color: white; font-family: var(--font-body);
          font-weight: 600; font-size: 15px;
          padding: 14px 32px; border-radius: 14px;
          border: none; cursor: pointer;
          box-shadow: 0 0 32px rgba(99,102,241,0.32), 0 1px 0 rgba(255,255,255,0.1) inset;
          transition: transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s ease;
          position: relative; overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 48px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.1) inset;
        }
        .btn-primary:hover::after { opacity: 1; }
        .btn-primary:active { transform: translateY(0) scale(0.99); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          color: var(--text-secondary); font-family: var(--font-body);
          font-weight: 500; font-size: 15px;
          padding: 14px 28px; border-radius: 14px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-ghost:hover {
          color: var(--text-primary);
          border-color: rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
        }

        /* ── CARD STYLES ── */
        .glass-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 0 32px rgba(99,102,241,0.06);
        }

        /* ── TRUST BAR ITEMS ── */
        .trust-item {
          display: flex; align-items: center; gap: 8px;
          color: var(--text-secondary);
          font-size: 12px; font-weight: 500;
          padding: 8px 16px; border-radius: 100px;
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }
        .trust-item:hover {
          color: var(--text-primary);
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
        }
        .trust-item-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: currentColor;
          opacity: 0.6;
        }

        /* ── BENTO GRID ── */
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 16px;
        }
        .bento-large { grid-column: 1 / 3; grid-row: 1; }
        .bento-tall  { grid-column: 3; grid-row: 1 / 3; }
        .bento-small { grid-column: 1; grid-row: 2; }
        .bento-small2 { grid-column: 2; grid-row: 2; }

        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr 1fr; }
          .bento-large { grid-column: 1 / 3; }
          .bento-tall  { grid-column: 1 / 3; grid-row: auto; }
          .bento-small { grid-column: 1; }
          .bento-small2 { grid-column: 2; }
        }

        /* ── TESTIMONIAL QUOTE BORDER ── */
        .testimonial-card {
          position: relative;
          overflow: hidden;
        }
        .testimonial-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--grad);
          border-radius: 2px;
        }

        /* ── PROGRESS ARC ANIMATION ── */
        @keyframes arcDraw {
          from { stroke-dashoffset: 283; }
          to   { stroke-dashoffset: var(--arc-offset); }
        }
        .arc-path {
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          animation: arcDraw 1.5s cubic-bezier(0.23, 1, 0.32, 1) 0.3s forwards;
        }

        /* ── CHAT MOCK TYPING ── */
        .typing-cursor {
          display: inline-block;
          width: 2px; height: 13px;
          background: #60a5fa;
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ── PULSE DOT ── */
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .pulse-dot::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-ring 2s ease-out infinite;
        }

        /* ── NAV SCROLL STATE ── */
        .nav-scrolled {
          background: rgba(4,8,15,0.92) !important;
          border-bottom-color: rgba(255,255,255,0.08) !important;
          box-shadow: 0 1px 40px rgba(0,0,0,0.5);
        }

        /* ── FOOTER LINK ── */
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 12px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--text-primary); }

        /* ── GLOW LINE ── */
        .glow-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5) 50%, transparent);
          margin: 0 auto;
        }

        /* ── CHAT MOCKUP MESSAGE ANIMATION ── */
        .msg-1 { opacity: 0; animation: msgIn 0.5s ease 1.4s forwards; }
        .msg-2 { opacity: 0; animation: msgIn 0.5s ease 2.1s forwards; }
        .msg-3 { opacity: 0; animation: msgIn 0.5s ease 2.8s forwards; }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── FAQ ITEM ── */
        .faq-item {
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .faq-item:hover { background: rgba(255,255,255,0.025) !important; }
      `}</style>

      <OrbField />
      <NoiseOverlay />

      <main
        className="relative z-[2] min-h-screen overflow-x-hidden"
        style={{ fontFamily: "var(--font-body)" }}
      >

        {/* ══════════════════════════════════════
            NAV
        ══════════════════════════════════════ */}
        <nav
          className={`sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b transition-all duration-300 ${navScrolled ? "nav-scrolled" : ""}`}
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(4,8,15,0.7)",
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-3">
            <StashifyLogo size={32} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", letterSpacing: "-0.01em" }}>
              Stashify
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "How it works", href: "#how" },
              { label: "Why Stashify", href: "#why" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "8px 16px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "14px" }} onClick={() => router.push("/chat")}>
            Open app
            <span style={{ opacity: 0.7 }}>{Icon.arrowRight}</span>
          </button>
        </nav>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative flex flex-col items-center text-center px-6 pt-24 pb-0" style={{ minHeight: "90vh" }}>

          {/* Live badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full"
            style={{ border: "1px solid rgba(37,99,235,0.25)", background: "rgba(37,99,235,0.07)", fontSize: "12px", fontWeight: 500, color: "#93c5fd" }}>
            <span className="relative w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-green-400" />
              <span className="pulse-dot absolute inset-0 rounded-full bg-green-400" />
            </span>
            Live on Base · Powered by AI · Zero fees
          </div>

          {/* Headline */}
          <h1 className="hero-h1" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 8vw, 96px)",
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            maxWidth: "860px",
            marginBottom: "28px",
          }}>
            Save smarter.<br />
            <span className="grad-text">Onchain.</span>
          </h1>

          {/* Sub */}
          <p className="hero-sub" style={{
            color: "var(--text-secondary)",
            fontSize: "clamp(16px, 2vw, 20px)",
            maxWidth: "460px",
            lineHeight: 1.65,
            marginBottom: "40px",
            fontWeight: 300,
          }}>
            Tell Stashify your goal. It moves real USDC onchain — no bank, no forms, no friction.
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row items-center gap-3 mb-4">
            <button className="btn-primary" onClick={() => router.push("/chat")}>
              Start saving now
              {Icon.arrowRight}
            </button>
            <a href="#how" className="btn-ghost">
              See how it works
              <span style={{ opacity: 0.5, fontSize: "16px" }}>↓</span>
            </a>
          </div>
          <p className="hero-ctas" style={{ color: "var(--text-tertiary)", fontSize: "12px", marginTop: "4px" }}>
            No wallet setup needed · Works on any device · Free forever
          </p>

          {/* ── CHAT MOCKUP ── */}
          <div className="hero-card relative mt-20 w-full" style={{ maxWidth: "400px", margin: "80px auto 0" }}>
            {/* Glow beneath */}
            <div style={{
              position: "absolute", inset: "-2px",
              borderRadius: "28px",
              background: "linear-gradient(135deg, rgba(37,99,235,0.4), rgba(124,58,237,0.3))",
              filter: "blur(32px)",
              opacity: 0.4,
              zIndex: -1,
            }} />

            {/* Card */}
            <div style={{
              background: "rgba(8,14,26,0.85)",
              backdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset",
            }}>
              {/* Card header */}
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}>
                <StashifyLogo size={26} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px" }}>Stashify</div>
                  <div style={{ fontSize: "11px", color: "#4ade80", marginTop: "1px" }}>● Online · Base Sepolia</div>
                </div>
                <div style={{
                  display: "flex", gap: "6px",
                  padding: "5px 10px", borderRadius: "100px",
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  fontSize: "10px", color: "#818cf8", fontWeight: 600,
                  letterSpacing: "0.04em",
                }}>
                  LIVE
                </div>
              </div>

              {/* Messages */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div className="msg-1" style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{
                    fontSize: "13px", padding: "12px 16px",
                    borderRadius: "18px 18px 4px 18px",
                    background: "linear-gradient(135deg, #2563eb, #6366f1)",
                    maxWidth: "82%", lineHeight: 1.5,
                    boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                  }}>
                    I want to save $50 for new Jordans
                  </div>
                </div>

                <div className="msg-2" style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    fontSize: "13px", padding: "12px 16px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    maxWidth: "82%", lineHeight: 1.5,
                    color: "#cbd5e1",
                  }}>
                    Love that goal. Saving $50 for your Jordans now...
                  </div>
                </div>

                <div className="msg-3" style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    fontSize: "13px", padding: "12px 16px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "rgba(34,197,94,0.07)",
                    border: "1px solid rgba(34,197,94,0.18)",
                    maxWidth: "90%", lineHeight: 1.6,
                  }}>
                    <span style={{ color: "#4ade80", fontWeight: 600 }}>Done.</span> $50 USDC locked in your Jordans vault.
                    <div style={{ marginTop: "6px", fontSize: "11px", color: "#475569", fontFamily: "var(--font-mono, monospace)" }}>
                      Tx: 0x89f4...3acd · Base Sepolia
                    </div>
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 16px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.01)",
              }}>
                <div style={{
                  flex: 1, fontSize: "13px",
                  color: "#334155", padding: "10px 14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center",
                }}>
                  Tell me your savings goal<span className="typing-cursor" />
                </div>
                <button style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: "var(--grad)",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
                }}>
                  {Icon.send}
                </button>
              </div>
            </div>
          </div>

          {/* Fade bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
            background: "linear-gradient(to bottom, transparent, var(--bg))",
            pointerEvents: "none",
          }} />
        </section>

        {/* ══════════════════════════════════════
            TRUST BAR
        ══════════════════════════════════════ */}
        <section style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "20px 32px",
          background: "rgba(255,255,255,0.015)",
          marginTop: "60px",
        }}>
          <div style={{
            display: "flex", flexWrap: "wrap",
            alignItems: "center", justifyContent: "center",
            gap: "10px",
          }}>
            {[
              { icon: Icon.base, label: "Built on Base", color: "#60a5fa" },
              { icon: Icon.shield, label: "Smart contract secured", color: "#a78bfa" },
              { icon: Icon.zap, label: "Instant transactions", color: "#fbbf24" },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, label: "USDC powered", color: "#4ade80" },
              { icon: Icon.globe, label: "Available worldwide", color: "#fb923c" },
            ].map((item) => (
              <div key={item.label} className="trust-item" style={{ color: item.color }}>
                {item.icon}
                <span style={{ color: "#64748b" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════ */}
        <section id="how" style={{ maxWidth: "1100px", margin: "0 auto", padding: "128px 24px" }}>
          <div className="text-center" style={{ marginBottom: "80px" }} data-reveal>
            <p className="section-label" style={{ color: "#818cf8", marginBottom: "16px" }}>How it works</p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800, letterSpacing: "-0.03em",
              lineHeight: 1.06, marginBottom: "20px",
            }}>
              Saving has never been<br />this effortless
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "17px", maxWidth: "380px", margin: "0 auto" }}>
              Three steps between you and your goal.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {[
              {
                number: "01",
                icon: Icon.messageCircle,
                title: "Just tell Stashify",
                desc: "Type your goal in plain English. No forms, no dropdowns, no confusing menus. Just talk.",
                highlight: "As easy as texting a friend",
                color: "#60a5fa",
              },
              {
                number: "02",
                icon: Icon.zap22,
                title: "AI acts instantly",
                desc: "Stashify understands your intent and moves the exact amount of USDC into your goal vault onchain.",
                highlight: "Real money. Real blockchain.",
                color: "#a78bfa",
              },
              {
                number: "03",
                icon: Icon.target,
                title: "Watch it grow",
                desc: "Track every goal visually. Withdraw whenever you want. Your money never leaves your control.",
                highlight: "You always stay in charge",
                color: "#34d399",
              },
            ].map((step, i) => (
              <TiltCard
                key={step.number}
                className="glass-card step-card"
                style={{ padding: "32px", position: "relative", overflow: "hidden" }}
                data-reveal
              >
                <div data-reveal data-delay={String(i * 120)}>
                  <span className="step-number-bg">{step.number}</span>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: `${step.color}14`,
                    border: `1px solid ${step.color}28`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: step.color, marginBottom: "24px",
                  }}>
                    {step.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700, fontSize: "18px",
                    marginBottom: "12px", letterSpacing: "-0.01em",
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
                    {step.desc}
                  </p>
                  <span style={{
                    fontSize: "11px", fontWeight: 600,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: step.color, opacity: 0.75,
                  }}>
                    {step.highlight}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            GLOW DIVIDER
        ══════════════════════════════════════ */}
        <div className="glow-line" style={{ maxWidth: "600px", marginBottom: "0" }} />

        {/* ══════════════════════════════════════
            WHY STASHIFY — BENTO
        ══════════════════════════════════════ */}
        <section id="why" style={{
          padding: "128px 24px",
          background: "rgba(255,255,255,0.012)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="text-center" data-reveal style={{ marginBottom: "64px" }}>
              <p className="section-label" style={{ color: "#c084fc", marginBottom: "16px" }}>Why Stashify</p>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.06,
              }}>
                Built for students.<br />By a student.
              </h2>
            </div>

            {/* Bento grid */}
            <div className="bento-grid" data-reveal>

              {/* Large card — No minimum */}
              <TiltCard className="bento-large glass-card" style={{ padding: "40px 44px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fbbf24", marginBottom: "24px",
                }}>
                  {Icon.dollarSign}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", letterSpacing: "-0.02em", marginBottom: "10px" }}>
                    No minimum deposit
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.7, maxWidth: "380px" }}>
                    Save $1 or $1,000. There is no barrier to entry. Every dollar counts, every goal matters.
                  </p>
                </div>
                {/* Decorative coins */}
                <div style={{ position: "absolute", right: "32px", top: "50%", transform: "translateY(-50%)", opacity: 0.06 }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H9m0 3h6" />
                  </svg>
                </div>
              </TiltCard>

              {/* Tall card — Smart contract */}
              <TiltCard className="bento-tall glass-card" style={{
                padding: "36px",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                background: "linear-gradient(160deg, rgba(99,102,241,0.06), rgba(124,58,237,0.04))",
                borderColor: "rgba(99,102,241,0.14)",
              }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#818cf8",
                }}>
                  {Icon.lock}
                </div>
                <div style={{ marginTop: "auto" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                    Your money is always yours
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
                    Funds sit in a smart contract vault on Base — not on our servers. Not our keys. Not our coins.
                  </p>
                  {/* Mini contract visual */}
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: "monospace",
                    fontSize: "11px",
                    color: "#475569",
                    lineHeight: 1.8,
                  }}>
                    <span style={{ color: "#818cf8" }}>contract</span>{" "}
                    <span style={{ color: "#60a5fa" }}>SavingsVault</span>{" "}{"{"}
                    <br />
                    {"  "}<span style={{ color: "#4ade80" }}>mapping</span>(address {"=>"} Goal) vaults;
                    <br />
                    {"  "}<span style={{ color: "#fbbf24" }}>// Only you can withdraw</span>
                    <br />
                    {"}"}
                  </div>
                </div>
              </TiltCard>

              {/* Small card 1 */}
              <TiltCard className="bento-small glass-card" style={{ padding: "32px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: "rgba(74,222,128,0.08)",
                  border: "1px solid rgba(74,222,128,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#4ade80", marginBottom: "20px",
                }}>
                  {Icon.smartphone}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", letterSpacing: "-0.01em", marginBottom: "8px" }}>
                  No bank needed
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.7 }}>
                  Just a phone. Stashify handles wallets, keys, and blockchain invisibly.
                </p>
              </TiltCard>

              {/* Small card 2 */}
              <TiltCard className="bento-small2 glass-card" style={{ padding: "32px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: "rgba(251,146,60,0.08)",
                  border: "1px solid rgba(251,146,60,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fb923c", marginBottom: "20px",
                }}>
                  {Icon.globe20}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", letterSpacing: "-0.01em", marginBottom: "8px" }}>
                  Works worldwide
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.7 }}>
                  Singapore, Nigeria, Brazil, India — any student, anywhere, instantly.
                </p>
              </TiltCard>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS ROW
        ══════════════════════════════════════ */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2px" }} data-reveal>
            {[
              { value: 2400, suffix: "+", label: "Students saving", color: "#60a5fa" },
              { value: 147, prefix: "$", suffix: "K", label: "Total saved onchain", color: "#a78bfa" },
              { value: 0.001, suffix: "¢", label: "Average gas fee", color: "#4ade80", isSmall: true },
              { value: 100, suffix: "%", label: "Non-custodial", color: "#fbbf24" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                data-reveal
                data-delay={String(i * 100)}
                style={{
                  padding: "40px 32px",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  textAlign: "center",
                }}
              >
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "8px",
                }}>
                  {stat.isSmall ? `<${stat.suffix}` : <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />}
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════ */}
        <section style={{
          padding: "80px 24px 128px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="text-center" data-reveal style={{ marginBottom: "64px" }}>
              <p className="section-label" style={{ color: "#4ade80", marginBottom: "16px" }}>Early users</p>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 800, letterSpacing: "-0.03em",
              }}>
                Students already saving smarter
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
              {[
                { quote: "I saved up for my new laptop in 6 weeks without even thinking about it. I just told Stashify my goal and it handled everything.", name: "Aisha M.", school: "NUS, Singapore", saved: "$800" },
                { quote: "I have tried every savings app. None of them actually move money for me. Stashify is the first one that actually does what it says.", name: "James K.", school: "UCT, South Africa", saved: "$240" },
                { quote: "The fact that it is on blockchain means I trust it more than my actual bank. My money is mine and I can see it on-chain anytime.", name: "Priya R.", school: "IIT Delhi, India", saved: "$1,200" },
              ].map((t, i) => (
                <div
                  key={t.name}
                  className="glass-card testimonial-card"
                  data-reveal
                  data-delay={String(i * 120)}
                  style={{ padding: "28px 28px 28px 32px" }}
                >
                  <p style={{
                    color: "#94a3b8", fontSize: "14px", lineHeight: 1.8,
                    marginBottom: "24px", fontWeight: 300, fontStyle: "italic",
                  }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: "2px" }}>{t.name}</p>
                      <p style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{t.school}</p>
                    </div>
                    <div style={{
                      fontSize: "12px", fontWeight: 700,
                      color: "#4ade80",
                      background: "rgba(74,222,128,0.08)",
                      border: "1px solid rgba(74,222,128,0.18)",
                      padding: "5px 12px", borderRadius: "100px",
                    }}>
                      Saved {t.saved}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <section id="faq" style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px 128px" }}>
          <div className="text-center" data-reveal style={{ marginBottom: "56px" }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800, letterSpacing: "-0.03em",
            }}>
              Questions? Answered.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { q: "Do I need to know anything about crypto?", a: "Not at all. Stashify handles everything behind the scenes. You just type what you want to save for." },
              { q: "Is my money safe?", a: "Your funds are held in a smart contract on Base blockchain — not on our servers. You have full control and can withdraw at any time." },
              { q: "What currency does Stashify use?", a: "Stashify uses USDC — a dollar-pegged stablecoin. $1 USDC = $1 USD. No volatility, no surprises." },
              { q: "Are there any fees?", a: "Stashify charges zero fees. The only cost is a tiny blockchain gas fee — usually less than a cent." },
            ].map((item, i) => (
              <div
                key={item.q}
                className="glass-card faq-item"
                data-reveal
                data-delay={String(i * 80)}
                style={{ padding: "24px 28px" }}
              >
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "16px", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                  {item.q}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.75 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════ */}
        <section style={{ padding: "0 24px 128px" }}>
          <div
            data-reveal
            style={{
              maxWidth: "860px", margin: "0 auto",
              borderRadius: "28px",
              padding: "80px 48px",
              textAlign: "center",
              position: "relative", overflow: "hidden",
              background: "linear-gradient(160deg, rgba(37,99,235,0.1), rgba(124,58,237,0.08))",
              border: "1px solid rgba(99,102,241,0.18)",
            }}
          >
            {/* Inner glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(99,102,241,0.12), transparent)",
              pointerEvents: "none",
            }} />
            {/* Corner accents */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6) 50%, transparent)",
            }} />

            <div style={{ position: "relative" }}>
              <StashifyLogo size={52} />
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 800, letterSpacing: "-0.035em",
                lineHeight: 1.1, marginTop: "28px", marginBottom: "16px",
              }}>
                Your first goal is<br />one message away.
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "17px", marginBottom: "36px", fontWeight: 300 }}>
                Join students saving smarter with Stashify.
              </p>
              <button className="btn-primary" style={{ fontSize: "16px", padding: "16px 40px" }} onClick={() => router.push("/chat")}>
                Start saving now
                {Icon.arrowRight}
              </button>
              <p style={{ color: "var(--text-tertiary)", fontSize: "12px", marginTop: "16px" }}>
                Free forever · No credit card · No crypto knowledge needed
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "32px 32px",
        }}>
          <div style={{
            maxWidth: "1100px", margin: "0 auto",
            display: "flex", flexWrap: "wrap",
            alignItems: "center", justifyContent: "space-between",
            gap: "16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <StashifyLogo size={22} />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px", color: "#64748b" }}>
                Stashify
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              {["Built on Base", "Secured by smart contracts", "Made in Singapore"].map((item) => (
                <span key={item} className="footer-link">{item}</span>
              ))}
            </div>

            <span style={{ color: "var(--text-tertiary)", fontSize: "12px" }}>© 2026 Stashify</span>
          </div>
        </footer>

      </main>
    </>
  );
}