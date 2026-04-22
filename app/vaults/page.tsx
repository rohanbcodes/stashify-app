"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* ── LOGO ── */
const StashifyLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg_v2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2563eb" }} /><stop offset="100%" style={{ stopColor: "#7c3aed" }} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#lg_v2)" />
    <rect x="35" y="122" width="130" height="58" rx="9" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
    <rect x="35" y="148" width="130" height="8" fill="rgba(255,255,255,0.10)" />
    <rect x="30" y="92" width="140" height="38" rx="9" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    <rect x="38" y="95" width="124" height="5" rx="3" fill="rgba(255,255,255,0.30)" />
    <text x="100" y="120" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontWeight="700" fill="rgba(255,255,255,0.95)">S</text>
    <rect x="88" y="126" width="24" height="14" rx="4" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
    <circle cx="100" cy="133" r="4" fill="rgba(255,255,255,0.9)" /><circle cx="100" cy="133" r="2" fill="#2563eb" />
    <rect x="94" y="93" width="12" height="4" rx="2" fill="rgba(99,102,241,0.55)" />
    <circle cx="100" cy="79" r="11" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="100" y="84" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#92400e">$</text>
    <line x1="100" y1="52" x2="100" y2="66" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M93 60 L100 68 L107 60" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="45" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)" />
    <rect x="137" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)" />
  </svg>
);

/* ── PROTOCOL LOGOS ── */
const CoinbaseLogo = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect width="26" height="26" rx="7" fill="#0052FF"/>
    <circle cx="13" cy="13" r="6.5" fill="white"/>
    <circle cx="13" cy="13" r="4" fill="#0052FF"/>
  </svg>
);
const MoonwellLogo = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect width="26" height="26" rx="7" fill="#1a1028"/>
    <path d="M13 4C13 4 7 7.5 7 13C7 16.3 9.7 19 13 19C16.3 19 19 16.3 19 13C17 14.5 14.5 15 12 14C9.5 13 8 10.5 9 8C10 6 11.5 4.5 13 4Z" fill="#B47FEB"/>
    <circle cx="17" cy="8" r="2.2" fill="#E8C4FF" opacity="0.8"/>
  </svg>
);
const MorphoLogo = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect width="26" height="26" rx="7" fill="#0F0F0F"/>
    <path d="M6 13L13 6L20 13L13 20L6 13Z" fill="none" stroke="#00D4AA" strokeWidth="1.6"/>
    <path d="M9.5 13L13 9.5L16.5 13L13 16.5L9.5 13Z" fill="#00D4AA" opacity="0.5"/>
    <circle cx="13" cy="13" r="1.8" fill="#00D4AA"/>
  </svg>
);

/* ── ICONS ── */
const Ic = {
  back: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  arrow: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  chevDown: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  info: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  trending: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  shield: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ext: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  calc: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>,
};

/* ── VAULT DATA ── */
const VAULTS = [
  {
    id: "coinbase",
    name: "Coinbase USDC Rewards",
    protocol: "Coinbase",
    logo: <CoinbaseLogo />,
    apy: 4.70,
    tvl: "$80B+",
    risk: 1,
    riskLabel: "Lowest",
    chain: "Base",
    type: "Rewards",
    color: "#0052FF",
    lightColor: "#60a5fa",
    accentBg: "rgba(0,82,255,0.07)",
    accentBorder: "rgba(0,82,255,0.22)",
    badge: "Most trusted",
    badgeColor: "#34d399",
    badgeBg: "rgba(52,211,153,0.1)",
    description: "Earn passive rewards simply by holding USDC in Coinbase Wallet. No lockup, no smart contract exposure — Coinbase funds these rewards directly.",
    highlights: ["Backed by Coinbase directly", "Paid monthly on Base", "No lockup period", "No smart contract risk", "Available globally"],
    howItWorks: "Coinbase funds these rewards from their own balance sheet as a loyalty program. Your USDC is not lent out — it simply sits in your wallet and earns.",
    riskDetails: [
      { label: "Smart contract risk", val: "None" },
      { label: "Liquidity risk", val: "None" },
      { label: "Rate volatility", val: "Low" },
      { label: "Protocol risk", val: "None" },
    ],
    link: "https://www.coinbase.com/usdc",
  },
  {
    id: "moonwell",
    name: "Moonwell USDC Lending",
    protocol: "Moonwell",
    logo: <MoonwellLogo />,
    apy: 8.62,
    tvl: "$83M+",
    risk: 2,
    riskLabel: "Low",
    chain: "Base",
    type: "Lending",
    color: "#B47FEB",
    lightColor: "#c084fc",
    accentBg: "rgba(180,127,235,0.07)",
    accentBorder: "rgba(180,127,235,0.22)",
    badge: "Base native",
    badgeColor: "#818cf8",
    badgeBg: "rgba(129,140,248,0.1)",
    description: "Lend USDC to borrowers via overcollateralized loans on Moonwell — the leading lending protocol on Base, audited and independently rated.",
    highlights: ["Built on Base natively", "Overcollateralized only", "Risk rating: B (Good)", "Withdraw anytime", "Battle-tested contracts"],
    howItWorks: "Your USDC is lent to borrowers who must post more collateral than they borrow. Interest paid by borrowers flows to you as yield. Rate adjusts with market demand.",
    riskDetails: [
      { label: "Smart contract risk", val: "Low" },
      { label: "Liquidity risk", val: "Low" },
      { label: "Rate volatility", val: "Medium" },
      { label: "Protocol risk", val: "Low" },
    ],
    link: "https://moonwell.fi",
  },
  {
    id: "morpho",
    name: "Morpho Flagship USDC",
    protocol: "Morpho",
    logo: <MorphoLogo />,
    apy: 10.80,
    tvl: "$500M+",
    risk: 2,
    riskLabel: "Low-Medium",
    chain: "Base",
    type: "Optimised Vault",
    color: "#00D4AA",
    lightColor: "#34d399",
    accentBg: "rgba(0,212,170,0.06)",
    accentBorder: "rgba(0,212,170,0.2)",
    badge: "Coinbase-backed",
    badgeColor: "#fbbf24",
    badgeBg: "rgba(251,191,36,0.1)",
    description: "The same protocol Coinbase uses for their own onchain USDC lending. Morpho optimises yield across multiple lending markets automatically via curated vaults.",
    highlights: ["Used by Coinbase directly", "Coinbase Ventures backed", "Auto-optimised yield", "Curated by Steakhouse Financial", "Instant deposit & withdraw"],
    howItWorks: "Morpho allocates your USDC across multiple lending markets to maximise returns. A smart contract wallet routes funds automatically. Rates vary with market conditions.",
    riskDetails: [
      { label: "Smart contract risk", val: "Low" },
      { label: "Liquidity risk", val: "Low" },
      { label: "Rate volatility", val: "Medium" },
      { label: "Protocol risk", val: "Low" },
    ],
    link: "https://app.morpho.org",
  },
];

/* ── SCROLL REVEAL ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          setTimeout(() => el.classList.add("in"), parseInt(el.dataset.delay || "0"));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll("[data-reveal]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── RISK DOTS ── */
function RiskDots({ level }: { level: number }) {
  const c = ["#4ade80", "#fbbf24", "#f87171"][level - 1];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: i <= level ? c : "rgba(255,255,255,0.1)",
          boxShadow: i <= level ? `0 0 7px ${c}99` : "none",
          transition: "all .3s",
        }} />
      ))}
      <span style={{ fontSize: "11px", color: c, marginLeft: "5px", fontWeight: 600 }}>
        {["Low risk", "Medium risk", "Higher risk"][level - 1]}
      </span>
    </div>
  );
}

/* ── PARTICLES ── */
function Particles() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvas.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
      r: Math.random() * 1.2 + .3, o: Math.random() * .35 + .05,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.o})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${.055 * (1 - d / 110)})`; ctx.lineWidth = .5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvas} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ── ANIMATED APY ── */
function APYDisplay({ value, color }: { value: number; color: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let s = 0;
        const step = (ts: number) => {
          if (!s) s = ts;
          const p = Math.min((ts - s) / 1200, 1);
          setN(parseFloat((( 1 - Math.pow(1 - p, 3)) * value).toFixed(2)));
          if (p < 1) requestAnimationFrame(step); else setN(value);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <span ref={ref} style={{ color, fontFamily: "var(--FD)", fontWeight: 900, fontSize: "42px", letterSpacing: "-.03em", lineHeight: 1 }}>
      {n.toFixed(2)}%
    </span>
  );
}

/* ── MAIN ── */
export default function VaultsPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [sort, setSort] = useState<"apy" | "tvl" | "risk">("apy");
  const [hovered, setHovered] = useState<string | null>(null);
  useReveal();

  const num = parseFloat(amount);
  const hasAmount = amount !== "" && !isNaN(num) && num > 0;

  const sorted = [...VAULTS].sort((a, b) => {
    if (sort === "apy") return b.apy - a.apy;
    if (sort === "risk") return a.risk - b.risk;
    return 0;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root {
          --bg:#060912; --s1:rgba(255,255,255,.035); --b1:rgba(255,255,255,.07);
          --t1:#eef2ff; --t2:#6b7280; --t3:#1f2937;
          --grad:linear-gradient(135deg,#3b82f6,#8b5cf6);
          --FD:'Cabinet Grotesk',sans-serif; --FB:'Instrument Sans',sans-serif;
        }
        body { background:var(--bg); color:var(--t1); font-family:var(--FB); }

        /* Orbs */
        .vo1 { position:fixed; border-radius:50%; filter:blur(80px); pointer-events:none; width:700px; height:700px; top:-20%; left:-5%; background:radial-gradient(circle,rgba(59,130,246,.11),transparent 60%); animation:vd1 28s ease-in-out infinite; }
        .vo2 { position:fixed; border-radius:50%; filter:blur(90px); pointer-events:none; width:500px; height:500px; bottom:5%; right:-10%; background:radial-gradient(circle,rgba(139,92,246,.1),transparent 60%); animation:vd2 22s ease-in-out infinite; }
        @keyframes vd1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(50px,60px) scale(1.06)} }
        @keyframes vd2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,-40px)} }

        /* Reveal */
        [data-reveal] { opacity:0; transform:translateY(28px); transition:opacity .75s cubic-bezier(.23,1,.32,1), transform .75s cubic-bezier(.23,1,.32,1); }
        [data-reveal].in { opacity:1; transform:translateY(0); }

        /* Hero anim */
        .vl { opacity:0; transform:translateY(10px); animation:vFU .6s ease var(--d,0s) forwards; }
        .vl1 { --d:.1s } .vl2 { --d:.3s } .vl3 { --d:.5s } .vl4 { --d:.7s }
        @keyframes vFU { to{opacity:1;transform:translateY(0)} }

        /* Grad text */
        .gt { background:linear-gradient(110deg,#60a5fa 0%,#4ade80 60%,#a78bfa 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* Card */
        .vcard {
          background:var(--s1); border:1px solid var(--b1); border-radius:22px;
          transition:border-color .3s, box-shadow .3s, transform .4s cubic-bezier(.23,1,.32,1);
          transform-style:preserve-3d;
        }

        /* Buttons */
        .btn-p { display:inline-flex; align-items:center; gap:8px; background:var(--grad); color:#fff; font-family:var(--FB); font-weight:600; font-size:13px; padding:11px 22px; border-radius:100px; border:none; cursor:pointer; box-shadow:0 4px 20px rgba(99,102,241,.3); transition:transform .2s,box-shadow .2s; }
        .btn-p:hover { transform:translateY(-2px) scale(1.02); box-shadow:0 8px 32px rgba(99,102,241,.45); }
        .sort-btn { display:inline-flex; align-items:center; gap:5px; padding:8px 16px; border-radius:100px; font-size:12px; font-weight:600; cursor:pointer; border:1px solid var(--b1); background:transparent; color:var(--t2); font-family:var(--FB); transition:all .2s; letter-spacing:.04em; text-transform:uppercase; }
        .sort-btn:hover { color:var(--t1); border-color:rgba(255,255,255,.15); }
        .sort-btn.on { color:white; border-color:rgba(99,102,241,.45); background:rgba(99,102,241,.12); }

        /* Tag */
        .vtag { font-size:10px; font-weight:700; padding:3px 9px; border-radius:100px; border:1px solid currentColor; opacity:.65; letter-spacing:.06em; text-transform:uppercase; }

        /* APY bar */
        @keyframes barIn { from{width:0} to{width:var(--w)} }
        .apybar { height:3px; border-radius:2px; animation:barIn 1.2s cubic-bezier(.23,1,.32,1) .2s both; }

        /* Calculator */
        .calc-card { background:linear-gradient(135deg,rgba(59,130,246,.07),rgba(139,92,246,.07)); border:1px solid rgba(99,102,241,.18); border-radius:20px; padding:28px; }

        /* Input */
        .amount-input { width:100%; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); border-radius:12px; color:#eef2ff; font-family:var(--FB); font-size:22px; font-weight:600; padding:14px 16px 14px 40px; outline:none; transition:border-color .25s; }
        .amount-input:focus { border-color:rgba(99,102,241,.4); }
        .amount-input::placeholder { color:#374151; font-weight:400; font-size:16px; }

        /* Noise */
        .noise { position:fixed; inset:0; pointer-events:none; z-index:1; opacity:.018; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:256px; }

        /* Scrollbar */
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:rgba(99,102,241,.3); border-radius:4px; }

        /* Expand anim */
        .expand-body { overflow:hidden; transition:max-height .5s cubic-bezier(.23,1,.32,1), opacity .4s ease; }
      `}</style>

      <div className="vo1" style={{ zIndex: 0 }} />
      <div className="vo2" style={{ zIndex: 0 }} />
      <div className="noise" />
      <Particles />

      <main style={{ position: "relative", zIndex: 2, minHeight: "100vh" }}>

        {/* ══ NAV ══ */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 36px",
          borderBottom: "1px solid rgba(255,255,255,.05)",
          backdropFilter: "blur(24px)",
          background: "rgba(6,9,18,.75)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => router.push("/chat")} style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "none", border: "none", cursor: "pointer",
              color: "#6b7280", fontSize: "14px", fontFamily: "var(--FB)", fontWeight: 500,
              transition: "color .2s", padding: "6px 0",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#eef2ff"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#6b7280"}>
              {Ic.back} Back
            </button>
            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,.08)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <StashifyLogo size={26} />
              <span style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "15px", letterSpacing: "-.01em" }}>Yield Vaults</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#4ade80", fontWeight: 500 }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            Live rates
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 56px" }}>
          <div style={{ maxWidth: "600px" }}>
            <div className="vl vl1" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "11px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase",
              color: "#4ade80", padding: "6px 14px", borderRadius: "100px",
              border: "1px solid rgba(74,222,128,.2)", background: "rgba(74,222,128,.06)", marginBottom: "24px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Curated DeFi yields · Base ecosystem
            </div>

            <h1 className="vl vl2" style={{
              fontFamily: "var(--FD)", fontWeight: 900,
              fontSize: "clamp(48px,7vw,80px)", letterSpacing: "-.04em", lineHeight: .98,
              marginBottom: "24px",
            }}>
              Put your savings<br />
              <span className="gt">to work.</span>
            </h1>

            <p className="vl vl3" style={{
              color: "var(--t2)", fontSize: "17px", lineHeight: 1.7,
              maxWidth: "460px", fontWeight: 400, marginBottom: "40px",
            }}>
              Discover curated DeFi vaults that earn yield on your USDC. Every vault is vetted, audited, and built on Base.
            </p>

            {/* Hero stats */}
            <div className="vl vl4" style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
              {[
                { label: "Up to", val: "10.8%", sub: "APY available", c: "#60a5fa" },
                { label: "All vaults", val: "USDC", sub: "No volatility", c: "#a78bfa" },
                { label: "Network", val: "Base", sub: "< 1¢ gas fees", c: "#4ade80" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: "11px", color: "var(--t2)", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "4px" }}>{s.label}</div>
                  <div style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "32px", letterSpacing: "-.03em", color: s.c, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: "12px", color: "var(--t2)", marginTop: "3px" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CALCULATOR ══ */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 56px" }} data-reveal>
          <div className="calc-card">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ color: "#818cf8" }}>{Ic.calc}</div>
              <span style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "17px", letterSpacing: "-.02em" }}>Earnings calculator</span>
              <span style={{ fontSize: "12px", color: "var(--t2)", marginLeft: "4px" }}>— see how much you'd earn</span>
            </div>

            <div style={{ position: "relative", marginBottom: hasAmount ? "24px" : "0" }}>
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontSize: "18px", fontWeight: 600, pointerEvents: "none" }}>$</span>
              <input
                type="number"
                className="amount-input"
                placeholder="Enter your savings amount..."
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>

            {hasAmount && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "12px" }}>
                {VAULTS.map(v => {
                  const monthly = (num * v.apy / 100 / 12).toFixed(2);
                  const yearly = (num * v.apy / 100).toFixed(2);
                  return (
                    <div key={v.id} style={{
                      padding: "18px 20px", borderRadius: "14px",
                      background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                      transition: "border-color .2s",
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = v.accentBorder}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.08)"}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                        {v.logo}
                        <span style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "13px" }}>{v.protocol}</span>
                        <span style={{ marginLeft: "auto", fontSize: "12px", fontWeight: 700, color: v.lightColor }}>{v.apy}% APY</span>
                      </div>
                      <div style={{ display: "flex", gap: "16px" }}>
                        <div>
                          <div style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "22px", letterSpacing: "-.03em", color: v.lightColor }}>${monthly}</div>
                          <div style={{ fontSize: "11px", color: "var(--t2)", marginTop: "2px" }}>per month</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "22px", letterSpacing: "-.03em", color: v.lightColor }}>${yearly}</div>
                          <div style={{ fontSize: "11px", color: "var(--t2)", marginTop: "2px" }}>per year</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ══ CONTROLS ══ */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 24px" }} data-reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ color: "var(--t2)", fontSize: "13px" }}>
              <span style={{ color: "var(--t1)", fontWeight: 600 }}>{VAULTS.length} vaults</span> available · All accept USDC on Base
            </p>
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--t2)", display: "flex", alignItems: "center", marginRight: "4px" }}>Sort:</span>
              {(["apy", "risk"] as const).map(s => (
                <button key={s} className={`sort-btn ${sort === s ? "on" : ""}`} onClick={() => setSort(s)}>
                  {s === "apy" ? "Highest yield" : "Lowest risk"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══ VAULT CARDS ══ */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sorted.map((v, i) => {
              const isOpen = expanded === v.id;
              const isHov = hovered === v.id;
              const cardRef = useRef<HTMLDivElement>(null);
              const onMove = (e: React.MouseEvent) => {
                const el = cardRef.current; if (!el) return;
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
                el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
              };
              const onLeave = () => { if (cardRef.current) cardRef.current.style.transform = "none"; };

              return (
                <div key={v.id} ref={cardRef} className="vcard"
                  data-reveal data-delay={String(i * 90)}
                  style={{
                    borderColor: isHov || isOpen ? v.accentBorder : "rgba(255,255,255,.07)",
                    background: isHov || isOpen ? v.accentBg : "rgba(255,255,255,.025)",
                    cursor: "pointer",
                  }}
                  onMouseMove={onMove} onMouseLeave={() => { onLeave(); setHovered(null); }}
                  onMouseEnter={() => setHovered(v.id)}
                  onClick={() => setExpanded(isOpen ? null : v.id)}>

                  <div style={{ padding: "28px 32px" }}>
                    {/* Main row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>

                      {/* Logo + name */}
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: "200px" }}>
                        <div style={{
                          width: "52px", height: "52px", borderRadius: "15px", flexShrink: 0,
                          border: `1px solid ${v.accentBorder}`, background: v.accentBg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: isHov ? `0 0 24px ${v.color}22` : "none", transition: "box-shadow .3s",
                        }}>{v.logo}</div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px", flexWrap: "wrap" }}>
                            <span style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "17px", letterSpacing: "-.02em" }}>{v.name}</span>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: v.badgeColor, background: v.badgeBg, padding: "3px 9px", borderRadius: "100px" }}>{v.badge}</span>
                          </div>
                          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <span style={{ fontSize: "11px", color: "var(--t2)", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", padding: "2px 8px", borderRadius: "100px" }}>{v.chain}</span>
                            <span style={{ fontSize: "11px", color: "var(--t2)" }}>{v.type}</span>
                            <span style={{ fontSize: "11px", color: "var(--t2)" }}>TVL {v.tvl}</span>
                          </div>
                        </div>
                      </div>

                      {/* APY */}
                      <div style={{ textAlign: "center", minWidth: "110px" }}>
                        <APYDisplay value={v.apy} color={v.lightColor} />
                        <div style={{ fontSize: "10px", color: "var(--t2)", letterSpacing: ".08em", textTransform: "uppercase", marginTop: "4px" }}>APY</div>
                        <div style={{ marginTop: "8px", height: "3px", borderRadius: "2px", background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
                          <div className="apybar" style={{ "--w": `${(v.apy / 12) * 100}%`, width: `${(v.apy / 12) * 100}%`, background: `linear-gradient(90deg,${v.color}77,${v.color})` } as React.CSSProperties} />
                        </div>
                      </div>

                      {/* Risk */}
                      <div style={{ minWidth: "130px" }}>
                        <RiskDots level={v.risk} />
                        <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--t2)" }}>TVL: <span style={{ color: "var(--t1)", fontWeight: 600 }}>{v.tvl}</span></div>
                      </div>

                      {/* Description */}
                      <div style={{ flex: 2, minWidth: "220px" }}>
                        <p style={{ fontSize: "13px", color: "var(--t2)", lineHeight: 1.75, marginBottom: "10px" }}>{v.description}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                          {v.highlights.slice(0, 3).map(h => (
                            <span key={h} className="vtag" style={{ color: v.lightColor }}>{h}</span>
                          ))}
                        </div>
                      </div>

                      {/* CTA + expand */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", flexShrink: 0 }}>
                        <button className="btn-p"
                          style={{ background: `linear-gradient(135deg,${v.color}cc,${v.color}88)` }}
                          onClick={e => { e.stopPropagation(); router.push("/chat"); }}>
                          Save here {Ic.arrow}
                        </button>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--t2)", fontSize: "12px", transition: "transform .3s", transform: isOpen ? "rotate(180deg)" : "none" }}>
                          {Ic.chevDown}
                        </div>
                      </div>
                    </div>

                    {/* Calculator preview for this vault */}
                    {hasAmount && (
                      <div style={{
                        marginTop: "20px", padding: "14px 18px", borderRadius: "12px",
                        background: "rgba(255,255,255,.03)", border: `1px solid ${v.accentBorder}`,
                        display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap",
                      }}>
                        <span style={{ fontSize: "12px", color: "var(--t2)" }}>With <strong style={{ color: "var(--t1)" }}>${parseFloat(amount).toLocaleString()}</strong> here:</span>
                        <span>
                          <span style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "20px", color: v.lightColor }}>${(num * v.apy / 100 / 12).toFixed(2)}</span>
                          <span style={{ fontSize: "12px", color: "var(--t2)", marginLeft: "4px" }}>/ month</span>
                        </span>
                        <span>
                          <span style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "20px", color: v.lightColor }}>${(num * v.apy / 100).toFixed(2)}</span>
                          <span style={{ fontSize: "12px", color: "var(--t2)", marginLeft: "4px" }}>/ year</span>
                        </span>
                      </div>
                    )}

                    {/* Expanded detail */}
                    <div className="expand-body" style={{ maxHeight: isOpen ? "500px" : "0", opacity: isOpen ? 1 : 0 }}>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: "28px", marginTop: "24px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "32px" }}>
                          <div>
                            <p style={{ fontSize: "11px", color: "var(--t2)", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "12px" }}>How it works</p>
                            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.8 }}>{v.howItWorks}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "11px", color: "var(--t2)", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "12px" }}>Risk breakdown</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              {v.riskDetails.map(r => (
                                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                                  <span style={{ color: "var(--t2)" }}>{r.label}</span>
                                  <span style={{ color: v.lightColor, fontWeight: 600 }}>{r.val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p style={{ fontSize: "11px", color: "var(--t2)", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "12px" }}>All highlights</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                              {v.highlights.map(h => (
                                <div key={h} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#94a3b8" }}>
                                  <span style={{ color: v.lightColor, fontWeight: 700 }}>✓</span> {h}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <a href={v.link} target="_blank" rel="noopener noreferrer"
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            marginTop: "24px", fontSize: "13px", fontWeight: 600,
                            color: v.lightColor, textDecoration: "none",
                            padding: "10px 20px", borderRadius: "100px",
                            border: `1px solid ${v.accentBorder}`, background: v.accentBg,
                            transition: "background .2s",
                          }}
                          onClick={e => e.stopPropagation()}>
                          Open {v.protocol} {Ic.ext}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ DISCLAIMER ══ */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }} data-reveal>
          <div style={{
            display: "flex", gap: "14px", padding: "18px 22px", borderRadius: "16px",
            background: "rgba(251,191,36,.05)", border: "1px solid rgba(251,191,36,.15)",
          }}>
            <span style={{ color: "#fbbf24", flexShrink: 0, marginTop: "1px" }}>{Ic.info}</span>
            <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.75 }}>
              <strong style={{ color: "#fbbf24", fontWeight: 700 }}>Informational only.</strong>{" "}
              Yield rates are variable and change with market conditions. DeFi protocols carry smart contract risk. Stashify does not custody your funds — all vault interactions happen directly on Base blockchain. Always understand the risks before depositing. This is not financial advice.
            </p>
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "28px 36px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <StashifyLogo size={20} />
              <span style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "13px", color: "#6b7280" }}>Stashify</span>
            </div>
            <span style={{ color: "#1f2937", fontSize: "12px" }}>© 2026 Stashify · Built on Base</span>
          </div>
        </footer>

      </main>
    </>
  );
}