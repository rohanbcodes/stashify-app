"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   LOGO
───────────────────────────────────────── */
const StashifyLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="icongrad_v" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2563eb" }} />
        <stop offset="100%" style={{ stopColor: "#7c3aed" }} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#icongrad_v)" />
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
   PROTOCOL LOGOS (SVG)
───────────────────────────────────────── */
const CoinbaseLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="#0052FF" />
    <circle cx="14" cy="14" r="7" fill="white" />
    <circle cx="14" cy="14" r="4.5" fill="#0052FF" />
  </svg>
);

const MoonwellLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="#1a1028" />
    <path d="M14 5C14 5 8 8 8 14C8 17.3 10.7 20 14 20C17.3 20 20 17.3 20 14C18 15.5 15.5 16 13 15C10.5 14 9 11.5 10 9C11 7 12.5 5.5 14 5Z" fill="#B47FEB" />
    <circle cx="18" cy="9" r="2.5" fill="#E8C4FF" opacity="0.8" />
  </svg>
);

const MorphoLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="#0F0F0F" />
    <path d="M7 14L14 7L21 14L14 21L7 14Z" fill="none" stroke="#00D4AA" strokeWidth="1.8" />
    <path d="M10.5 14L14 10.5L17.5 14L14 17.5L10.5 14Z" fill="#00D4AA" opacity="0.6" />
    <circle cx="14" cy="14" r="2" fill="#00D4AA" />
  </svg>
);

const AaveLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="#1A1A2E" />
    <path d="M14 6L20 20H8L14 6Z" fill="none" stroke="#B6509E" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M11 16L14 9L17 16" fill="none" stroke="#B6509E" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="10.5" y1="17.5" x2="17.5" y2="17.5" stroke="#2EBAC6" strokeWidth="1.5" />
  </svg>
);

const CompoundLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="#070A0E" />
    <circle cx="14" cy="14" r="7" fill="none" stroke="#00D395" strokeWidth="1.8" />
    <path d="M14 8V14L18 16" stroke="#00D395" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="14" cy="14" r="2" fill="#00D395" opacity="0.5" />
  </svg>
);

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const Icons = {
  arrowLeft: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  arrowRight: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  trendUp: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  shield: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  users: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  zap: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  info: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  externalLink: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  sortAsc: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="4" /><polyline points="6 10 12 4 18 10" />
    </svg>
  ),
};

/* ─────────────────────────────────────────
   VAULT DATA
───────────────────────────────────────── */
type SortKey = "apy" | "tvl" | "risk";

const VAULTS = [
  {
    id: "coinbase-usdc",
    name: "Coinbase USDC Vault",
    protocol: "Coinbase",
    logo: <CoinbaseLogo />,
    apy: 4.7,
    tvl: 1240000000,
    risk: 1,
    chain: "Base",
    category: "Stablecoin",
    description: "Institutional-grade USDC yield from Coinbase's treasury operations. The safest entry point into on-chain savings.",
    tags: ["Audited", "Insured", "Institutional"],
    color: "#0052FF",
    accentBg: "rgba(0,82,255,0.08)",
    accentBorder: "rgba(0,82,255,0.2)",
  },
  {
    id: "moonwell-usdc",
    name: "Moonwell USDC",
    protocol: "Moonwell",
    logo: <MoonwellLogo />,
    apy: 6.2,
    tvl: 89000000,
    risk: 2,
    chain: "Base",
    category: "Lending",
    description: "Supply USDC to Moonwell's lending protocol on Base. Earn yield from borrowers while keeping full liquidity.",
    tags: ["Audited", "Liquid", "DeFi native"],
    color: "#B47FEB",
    accentBg: "rgba(180,127,235,0.08)",
    accentBorder: "rgba(180,127,235,0.2)",
  },
  {
    id: "morpho-usdc",
    name: "Morpho Blue USDC",
    protocol: "Morpho",
    logo: <MorphoLogo />,
    apy: 8.4,
    tvl: 340000000,
    risk: 2,
    chain: "Base",
    category: "Optimised Lending",
    description: "Morpho's peer-to-peer lending optimiser routes your USDC to the highest-yield matches, beating standard protocols.",
    tags: ["Peer-to-peer", "Optimised", "High yield"],
    color: "#00D4AA",
    accentBg: "rgba(0,212,170,0.07)",
    accentBorder: "rgba(0,212,170,0.18)",
  },
  {
    id: "aave-usdc",
    name: "Aave v3 USDC",
    protocol: "Aave",
    logo: <AaveLogo />,
    apy: 5.9,
    tvl: 2100000000,
    risk: 1,
    chain: "Base",
    category: "Lending",
    description: "The largest DeFi lending protocol by TVL. Battle-tested since 2020 with billions secured and multiple audits.",
    tags: ["Battle-tested", "Multi-audit", "Largest TVL"],
    color: "#B6509E",
    accentBg: "rgba(182,80,158,0.07)",
    accentBorder: "rgba(182,80,158,0.18)",
  },
  {
    id: "compound-usdc",
    name: "Compound v3 USDC",
    protocol: "Compound",
    logo: <CompoundLogo />,
    apy: 10.8,
    tvl: 156000000,
    risk: 3,
    chain: "Base",
    category: "Lending",
    description: "Compound's latest architecture offers the highest yields in this list but carries more smart contract complexity.",
    tags: ["Highest APY", "Community governed", "Advanced"],
    color: "#00D395",
    accentBg: "rgba(0,211,149,0.07)",
    accentBorder: "rgba(0,211,149,0.18)",
  },
];

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.delay || "0";
          setTimeout(() => el.classList.add("revealed"), parseInt(delay));
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────────────────────
   3D TILT
───────────────────────────────────────── */
function TiltCard({ children, className = "", style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)"; };
  return (
    <div ref={ref} className={className} style={{ ...style, transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)", transformStyle: "preserve-3d" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   RISK DOTS
───────────────────────────────────────── */
function RiskDots({ level }: { level: number }) {
  const colors = ["#4ade80", "#fbbf24", "#f87171"];
  const labels = ["Low risk", "Medium risk", "Higher risk"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          width: "7px", height: "7px", borderRadius: "50%",
          background: i <= level ? colors[level - 1] : "rgba(255,255,255,0.1)",
          boxShadow: i <= level ? `0 0 6px ${colors[level - 1]}88` : "none",
          transition: "all 0.2s",
        }} />
      ))}
      <span style={{ fontSize: "11px", color: colors[level - 1], marginLeft: "4px", fontWeight: 500 }}>
        {labels[level - 1]}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   TVL FORMATTER
───────────────────────────────────────── */
function fmtTVL(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
}

/* ─────────────────────────────────────────
   ANIMATED APY COUNTER
───────────────────────────────────────── */
function APYCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const dur = 1400;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setDisplay(parseFloat((ease * value).toFixed(1)));
          if (p < 1) requestAnimationFrame(step);
          else setDisplay(value);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{display.toFixed(1)}</span>;
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function VaultsPage() {
  const router = useRouter();
  const [sort, setSort] = useState<SortKey>("apy");
  const [filter, setFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [hovered, setHovered] = useState<string | null>(null);

  useScrollReveal();

  const sorted = [...VAULTS]
    .filter((v) => {
      if (filter === "low") return v.risk === 1;
      if (filter === "medium") return v.risk === 2;
      if (filter === "high") return v.risk === 3;
      return true;
    })
    .sort((a, b) => {
      if (sort === "apy") return b.apy - a.apy;
      if (sort === "tvl") return b.tvl - a.tvl;
      if (sort === "risk") return a.risk - b.risk;
      return 0;
    });

  const avgAPY = (VAULTS.reduce((s, v) => s + v.apy, 0) / VAULTS.length).toFixed(1);
  const totalTVL = VAULTS.reduce((s, v) => s + v.tvl, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #04080f;
          --surface: rgba(255,255,255,0.03);
          --border: rgba(255,255,255,0.06);
          --text-primary: #f0f4ff;
          --text-secondary: #64748b;
          --grad: linear-gradient(135deg, #2563eb, #6366f1);
          --font-display: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        body { background: var(--bg); color: var(--text-primary); font-family: var(--font-body); }

        /* Orbs */
        .vault-orb-1 {
          position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none;
          width: 600px; height: 600px; top: -10%; left: 5%;
          background: radial-gradient(circle, rgba(37,99,235,0.12), transparent 65%);
          animation: vaultFloat1 24s ease-in-out infinite;
        }
        .vault-orb-2 {
          position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none;
          width: 400px; height: 400px; bottom: 10%; right: 5%;
          background: radial-gradient(circle, rgba(124,58,237,0.10), transparent 65%);
          animation: vaultFloat2 30s ease-in-out infinite;
        }
        @keyframes vaultFloat1 {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(30px, 40px); }
        }
        @keyframes vaultFloat2 {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(-40px,-30px); }
        }

        /* Grid */
        .vault-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 30%, black, transparent);
        }

        /* Reveal */
        [data-reveal] {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); }

        /* Hero anim */
        .v-hero-label { opacity: 0; transform: translateY(10px); animation: vFadeUp 0.6s ease 0.1s forwards; }
        .v-hero-h1    { opacity: 0; transform: translateY(18px); animation: vFadeUp 0.7s ease 0.3s forwards; }
        .v-hero-sub   { opacity: 0; transform: translateY(14px); animation: vFadeUp 0.7s ease 0.5s forwards; }
        .v-hero-stats { opacity: 0; transform: translateY(12px); animation: vFadeUp 0.7s ease 0.7s forwards; }
        @keyframes vFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Grad text */
        .grad-text {
          background: linear-gradient(100deg, #60a5fa 0%, #818cf8 50%, #34d399 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* Vault card */
        .vault-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          cursor: pointer;
        }
        .vault-card:hover {
          box-shadow: 0 0 40px rgba(99,102,241,0.08), 0 8px 32px rgba(0,0,0,0.3);
        }

        /* Sort button */
        .sort-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 10px;
          font-size: 13px; font-weight: 500; cursor: pointer;
          border: 1px solid var(--border);
          background: transparent; color: var(--text-secondary);
          transition: all 0.2s ease; font-family: var(--font-body);
        }
        .sort-btn:hover { color: var(--text-primary); border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); }
        .sort-btn.active { color: white; border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.12); }

        /* Filter pill */
        .filter-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 100px;
          font-size: 12px; font-weight: 500; cursor: pointer;
          border: 1px solid var(--border);
          background: transparent; color: var(--text-secondary);
          transition: all 0.2s ease; font-family: var(--font-body);
        }
        .filter-pill:hover { color: var(--text-primary); }
        .filter-pill.active-all { color: white; background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); }
        .filter-pill.active-low { color: #4ade80; background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.25); }
        .filter-pill.active-medium { color: #fbbf24; background: rgba(251,191,36,0.08); border-color: rgba(251,191,36,0.25); }
        .filter-pill.active-high { color: #f87171; background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.25); }

        /* CTA button */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--grad); color: white;
          font-family: var(--font-body); font-weight: 600; font-size: 13px;
          padding: 10px 20px; border-radius: 12px; border: none; cursor: pointer;
          box-shadow: 0 0 20px rgba(99,102,241,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary:hover { transform: translateY(-1px) scale(1.02); box-shadow: 0 0 32px rgba(99,102,241,0.4); }

        /* APY glow */
        .apy-value {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        /* Stat card */
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px 28px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .stat-card:hover {
          border-color: rgba(99,102,241,0.2);
          box-shadow: 0 0 24px rgba(99,102,241,0.05);
        }

        /* Tag */
        .tag {
          font-size: 10px; font-weight: 600;
          padding: 3px 9px; border-radius: 100px;
          letter-spacing: 0.05em; text-transform: uppercase;
          border: 1px solid currentColor;
          opacity: 0.65;
        }

        /* Nav back */
        .nav-back {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--text-secondary); font-size: 14px; font-weight: 500;
          cursor: pointer; transition: color 0.2s;
          background: none; border: none; font-family: var(--font-body);
        }
        .nav-back:hover { color: var(--text-primary); }

        /* Disclaimer */
        .disclaimer {
          background: rgba(251,191,36,0.05);
          border: 1px solid rgba(251,191,36,0.15);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex; align-items: flex-start; gap: 12px;
        }

        /* Animated APY bar */
        @keyframes barGrow {
          from { width: 0; }
          to { width: var(--bar-width); }
        }
        .apy-bar {
          height: 3px; border-radius: 2px;
          animation: barGrow 1.2s cubic-bezier(0.23,1,0.32,1) 0.3s both;
        }

        /* Noise overlay */
        .noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px;
        }
      `}</style>

      {/* Background layers */}
      <div className="vault-orb-1" style={{ zIndex: 0 }} />
      <div className="vault-orb-2" style={{ zIndex: 0 }} />
      <div className="vault-grid" />
      <div className="noise" />

      <main style={{ position: "relative", zIndex: 2, minHeight: "100vh", fontFamily: "var(--font-body)" }}>

        {/* ══════════════════════════════════════
            TOP BAR
        ══════════════════════════════════════ */}
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 32px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          background: "rgba(4,8,15,0.8)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button className="nav-back" onClick={() => router.push("/chat")}>
              {Icons.arrowLeft}
              Back
            </button>
            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <StashifyLogo size={26} />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px" }}>Yield Vaults</span>
            </div>
          </div>

          {/* Nav links to other app pages */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {[
              { label: "Chat", path: "/chat" },
              { label: "Pacts", path: "/pact" },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  color: "#64748b", fontSize: "13px", fontWeight: 500,
                  padding: "8px 14px", borderRadius: "10px",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f0f4ff"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#64748b"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 60px" }}>
          <div style={{ maxWidth: "640px" }}>
            <div className="v-hero-label" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#4ade80", marginBottom: "24px",
              padding: "6px 14px", borderRadius: "100px",
              border: "1px solid rgba(74,222,128,0.2)",
              background: "rgba(74,222,128,0.06)",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Live yields · Updated in real time
            </div>

            <h1 className="v-hero-h1" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6vw, 72px)",
              fontWeight: 800, letterSpacing: "-0.035em",
              lineHeight: 1.04, marginBottom: "20px",
            }}>
              Put your savings<br />
              <span className="grad-text">to work.</span>
            </h1>

            <p className="v-hero-sub" style={{
              color: "var(--text-secondary)", fontSize: "17px",
              lineHeight: 1.7, maxWidth: "480px", fontWeight: 300, marginBottom: "40px",
            }}>
              Discover curated DeFi vaults that earn yield on your USDC. Every vault is vetted, audited, and built on Base.
            </p>

            {/* Hero stats */}
            <div className="v-hero-stats" style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              {[
                { label: "Average APY", value: `${avgAPY}%`, color: "#60a5fa" },
                { label: "Total value locked", value: fmtTVL(totalTVL), color: "#a78bfa" },
                { label: "Vaults available", value: `${VAULTS.length}`, color: "#4ade80" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "28px", fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: s.color,
                    marginBottom: "4px",
                  }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CONTROLS
        ══════════════════════════════════════ */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 32px" }} data-reveal>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px",
            padding: "16px 20px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
          }}>
            {/* Filter pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500, display: "flex", alignItems: "center", marginRight: "4px" }}>
                Risk
              </span>
              {(["all", "low", "medium", "high"] as const).map((f) => (
                <button
                  key={f}
                  className={`filter-pill ${filter === f ? `active-${f}` : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort buttons */}
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500, display: "flex", alignItems: "center", marginRight: "4px" }}>
                Sort
              </span>
              {(["apy", "tvl", "risk"] as const).map((s) => (
                <button
                  key={s}
                  className={`sort-btn ${sort === s ? "active" : ""}`}
                  onClick={() => setSort(s)}
                >
                  {sort === s && Icons.sortAsc}
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            VAULT CARDS
        ══════════════════════════════════════ */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sorted.map((vault, i) => (
              <TiltCard
                key={vault.id}
                className="vault-card"
                style={{
                  borderColor: hovered === vault.id ? vault.accentBorder : "rgba(255,255,255,0.06)",
                  background: hovered === vault.id ? vault.accentBg : "rgba(255,255,255,0.025)",
                }}
                data-reveal
                data-delay={String(i * 80)}
              >
                <div
                  onMouseEnter={() => setHovered(vault.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ padding: "28px 32px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>

                    {/* Protocol logo + name */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: "1", minWidth: "200px" }}>
                      <div style={{
                        width: "48px", height: "48px", borderRadius: "14px",
                        border: `1px solid ${vault.accentBorder}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: vault.accentBg, flexShrink: 0,
                        boxShadow: hovered === vault.id ? `0 0 20px ${vault.color}22` : "none",
                        transition: "box-shadow 0.3s",
                      }}>
                        {vault.logo}
                      </div>
                      <div>
                        <div style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700, fontSize: "16px",
                          letterSpacing: "-0.01em", marginBottom: "4px",
                        }}>
                          {vault.name}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{
                            fontSize: "11px", color: "var(--text-secondary)",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            padding: "2px 8px", borderRadius: "100px",
                          }}>
                            {vault.chain}
                          </span>
                          <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{vault.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* APY */}
                    <div style={{ textAlign: "center", minWidth: "100px" }}>
                      <div className="apy-value" style={{
                        fontSize: "36px",
                        color: vault.color,
                        textShadow: hovered === vault.id ? `0 0 24px ${vault.color}55` : "none",
                        transition: "text-shadow 0.3s",
                      }}>
                        <APYCounter value={vault.apy} />%
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        APY
                      </div>
                      {/* APY bar */}
                      <div style={{ marginTop: "8px", height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <div
                          className="apy-bar"
                          style={{
                            "--bar-width": `${(vault.apy / 12) * 100}%`,
                            width: `${(vault.apy / 12) * 100}%`,
                            background: `linear-gradient(90deg, ${vault.color}88, ${vault.color})`,
                          } as React.CSSProperties}
                        />
                      </div>
                    </div>

                    {/* TVL + Risk */}
                    <div style={{ minWidth: "120px" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.02em", marginBottom: "4px" }}>
                        {fmtTVL(vault.tvl)}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        TVL
                      </div>
                      <RiskDots level={vault.risk} />
                    </div>

                    {/* Description + tags */}
                    <div style={{ flex: 2, minWidth: "220px" }}>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "12px" }}>
                        {vault.description}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {vault.tags.map((tag) => (
                          <span key={tag} className="tag" style={{ color: vault.color }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div style={{ flexShrink: 0 }}>
                      <button
                        className="btn-primary"
                        onClick={() => router.push("/chat")}
                        style={{ background: `linear-gradient(135deg, ${vault.color}cc, ${vault.color}88)` }}
                      >
                        Save here
                        {Icons.arrowRight}
                      </button>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "8px", justifyContent: "center" }}>
                        <span style={{ color: "var(--text-secondary)", fontSize: "11px" }}>via Stashify Chat</span>
                      </div>
                    </div>

                  </div>
                </div>
              </TiltCard>
            ))}

            {sorted.length === 0 && (
              <div style={{ textAlign: "center", padding: "64px", color: "var(--text-secondary)" }}>
                No vaults match this filter.
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════
            SUMMARY STATS
        ══════════════════════════════════════ */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
            {[
              { icon: Icons.trendUp, label: "Highest APY", value: `${Math.max(...VAULTS.map(v => v.apy))}%`, color: "#4ade80" },
              { icon: Icons.shield, label: "Audited protocols", value: "5 / 5", color: "#60a5fa" },
              { icon: Icons.users, label: "Total value locked", value: fmtTVL(totalTVL), color: "#a78bfa" },
              { icon: Icons.zap, label: "All on Base network", value: "< 1¢ gas", color: "#fbbf24" },
            ].map((s, i) => (
              <TiltCard key={s.label} className="stat-card" data-reveal data-delay={String(i * 80)}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: s.color, opacity: 0.8 }}>{s.icon}</div>
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {s.label}
                  </span>
                </div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "26px", fontWeight: 800, letterSpacing: "-0.03em",
                  color: s.color,
                }}>
                  {s.value}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            DISCLAIMER
        ══════════════════════════════════════ */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }} data-reveal>
          <div className="disclaimer">
            <div style={{ color: "#fbbf24", flexShrink: 0, marginTop: "1px" }}>{Icons.info}</div>
            <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.7 }}>
              <strong style={{ color: "#fbbf24", fontWeight: 600 }}>Informational only.</strong>{" "}
              Yield rates shown are variable and change with market conditions. DeFi protocols carry smart contract risk. Stashify does not custody your funds — all vault interactions happen directly on Base blockchain. Always understand the risks before depositing.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "28px 32px",
        }}>
          <div style={{
            maxWidth: "1100px", margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <StashifyLogo size={20} />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "13px", color: "#64748b" }}>Stashify</span>
            </div>
            <span style={{ color: "#334155", fontSize: "12px" }}>© 2026 Stashify · Built on Base</span>
          </div>
        </footer>

      </main>
    </>
  );
}