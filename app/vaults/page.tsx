"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* ─── LOGO ─── */
const Logo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="lg_vf" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor:"#3b82f6" }}/><stop offset="100%" style={{ stopColor:"#8b5cf6" }}/></linearGradient></defs>
    <rect width="200" height="200" rx="44" fill="url(#lg_vf)"/>
    <rect x="35" y="122" width="130" height="58" rx="9" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
    <rect x="35" y="148" width="130" height="8" fill="rgba(255,255,255,0.10)"/>
    <rect x="30" y="92" width="140" height="38" rx="9" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
    <text x="100" y="120" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="700" fill="rgba(255,255,255,0.95)">S</text>
    <circle cx="100" cy="79" r="11" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="100" y="84" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#92400e">$</text>
    <line x1="100" y1="52" x2="100" y2="66" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M93 60L100 68L107 60" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="45" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)"/>
    <rect x="137" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)"/>
  </svg>
);

/* ─── PROTOCOL LOGOS ─── */
const CoinbaseMark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#0052FF"/>
    <circle cx="12" cy="12" r="6" fill="white"/>
    <circle cx="12" cy="12" r="3.8" fill="#0052FF"/>
  </svg>
);
const MoonwellMark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#1a1028"/>
    <path d="M12 3.5C12 3.5 6.5 7 6.5 12C6.5 15 8.5 17.5 12 17.5C15.5 17.5 17.5 15 17.5 12C15.5 13.5 13.5 14 11.5 13C9.5 12 8.5 10 9.5 7.5C10.5 5.5 11.5 4 12 3.5Z" fill="#B47FEB"/>
    <circle cx="16.5" cy="7" r="2" fill="#E8C4FF" opacity="0.85"/>
  </svg>
);
const MorphoMark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#0d0d0d"/>
    <path d="M5 12L12 5L19 12L12 19L5 12Z" fill="none" stroke="#00D4AA" strokeWidth="1.5"/>
    <path d="M9 12L12 9L15 12L12 15L9 12Z" fill="#00D4AA" opacity="0.45"/>
    <circle cx="12" cy="12" r="1.6" fill="#00D4AA"/>
  </svg>
);
const AerodromeMark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#1a0a2e"/>
    <path d="M12 4L20 12L12 20L4 12L12 4Z" fill="none" stroke="#FF4D8D" strokeWidth="1.5"/>
    <path d="M12 8L16 12L12 16L8 12L12 8Z" fill="#FF4D8D" opacity="0.35"/>
    <circle cx="12" cy="12" r="2" fill="#FF4D8D"/>
    <path d="M12 4V20M4 12H20" stroke="#FF4D8D" strokeWidth="0.6" opacity="0.3"/>
  </svg>
);

/* ─── ICONS ─── */
const Ic = {
  back:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  arrow:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  chevD:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  trend:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  shield:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ext:     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  calc:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>,
  chart:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  zap:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
};

/* ─── VAULT DATA ─── */
type Vault = typeof VAULTS[0];
const VAULTS = [
  {
    id: "coinbase", name: "Coinbase USDC Rewards", protocol: "Coinbase",
    mark: <CoinbaseMark />, apy: 4.70, tvl: 80_000_000_000, risk: 1,
    riskLabel: "Lowest", chain: "Base", type: "Rewards Program",
    color: "#0052FF", light: "#60a5fa",
    abg: "rgba(0,82,255,.07)", abord: "rgba(0,82,255,.22)",
    badge: "Most trusted", badgeC: "#34d399", badgeBg: "rgba(52,211,153,.1)",
    desc: "Earn passive rewards simply by holding USDC in Coinbase Wallet. Coinbase funds these rewards directly — no smart contract exposure, no lockup, no complexity.",
    highlights: ["No smart contract risk","Backed by Coinbase","Paid monthly on Base","No lockup period","Available globally"],
    howItWorks: "Coinbase funds these rewards from their own balance sheet as a loyalty program. Your USDC is not lent out — it simply sits in your wallet and earns.",
    riskRows: [["Smart contract","None"],["Liquidity","None"],["Rate volatility","Low"],["Protocol","None"]],
    link: "https://www.coinbase.com/usdc",
  },
  {
    id: "moonwell", name: "Moonwell USDC Lending", protocol: "Moonwell",
    mark: <MoonwellMark />, apy: 6.20, tvl: 83_000_000, risk: 2,
    riskLabel: "Low", chain: "Base", type: "Lending Protocol",
    color: "#B47FEB", light: "#c084fc",
    abg: "rgba(180,127,235,.07)", abord: "rgba(180,127,235,.22)",
    badge: "Base native", badgeC: "#818cf8", badgeBg: "rgba(129,140,248,.1)",
    desc: "Lend USDC to borrowers via overcollateralized loans on Moonwell — the leading lending protocol on Base. Audited, independently rated, and withdraw anytime.",
    highlights: ["Overcollateralized only","Base native protocol","Risk rating: B (Good)","Withdraw anytime","Battle-tested contracts"],
    howItWorks: "Your USDC is lent to borrowers who must post more collateral than they borrow. Interest paid by borrowers flows to you. Rate adjusts with market demand.",
    riskRows: [["Smart contract","Low"],["Liquidity","Low"],["Rate volatility","Medium"],["Protocol","Low"]],
    link: "https://moonwell.fi",
  },
  {
    id: "morpho", name: "Morpho Flagship USDC", protocol: "Morpho",
    mark: <MorphoMark />, apy: 10.80, tvl: 500_000_000, risk: 2,
    riskLabel: "Low-Medium", chain: "Base", type: "Optimised Vault",
    color: "#00D4AA", light: "#34d399",
    abg: "rgba(0,212,170,.06)", abord: "rgba(0,212,170,.2)",
    badge: "Coinbase-backed", badgeC: "#fbbf24", badgeBg: "rgba(251,191,36,.1)",
    desc: "The same protocol Coinbase uses for their own onchain USDC lending. Morpho optimises yield across multiple lending markets automatically via curated vaults.",
    highlights: ["Used by Coinbase directly","Coinbase Ventures backed","Auto-optimised yield","Curated by Steakhouse","Instant deposit & withdraw"],
    howItWorks: "Morpho allocates your USDC across multiple lending markets to maximise returns automatically. A smart contract wallet routes funds. Rates vary with market conditions.",
    riskRows: [["Smart contract","Low"],["Liquidity","Low"],["Rate volatility","Medium"],["Protocol","Low"]],
    link: "https://app.morpho.org",
  },
  {
    id: "aerodrome", name: "Aerodrome USDC Pool", protocol: "Aerodrome",
    mark: <AerodromeMark />, apy: 7.40, tvl: 120_000_000, risk: 3,
    riskLabel: "Medium", chain: "Base", type: "Liquidity Pool",
    color: "#FF4D8D", light: "#f472b6",
    abg: "rgba(255,77,141,.06)", abord: "rgba(255,77,141,.2)",
    badge: "DEX yield", badgeC: "#f472b6", badgeBg: "rgba(244,114,182,.1)",
    desc: "Earn trading fees by providing USDC liquidity to Aerodrome — Base's central DEX and liquidity hub. Yield comes from trading volume, not lending — a different risk profile.",
    highlights: ["Fee-based yield (not lending)","Base's largest DEX by volume","No borrower risk","Earn from every swap","Different yield mechanic"],
    howItWorks: "You add USDC to Aerodrome's stable liquidity pool. Every time a trader swaps through this pool, a small fee is distributed to liquidity providers. You earn from trading volume.",
    riskRows: [["Smart contract","Medium"],["Liquidity","Low"],["Rate volatility","Higher"],["Protocol","Low"]],
    link: "https://aerodrome.finance",
  },
];

/* ─── HELPERS ─── */
function fmtTVL(n: number) {
  if (n >= 1e9) return `$${(n/1e9).toFixed(0)}B+`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(0)}M+`;
  return `$${n.toLocaleString()}`;
}

/* ─── REVEAL HOOK ─── */
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

/* ─── PARTICLES ─── */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 45 }, () => ({ x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, vx:(Math.random()-.5)*.2, vy:(Math.random()-.5)*.2, r:Math.random()*1.3+.3, o:Math.random()*.3+.05 }));
    const tick = () => {
      ctx.clearRect(0,0,c.width,c.height);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=c.width; if(p.x>c.width)p.x=0;
        if(p.y<0)p.y=c.height; if(p.y>c.height)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(99,102,241,${p.o})`; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(99,102,241,${.05*(1-d/100)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }
      raf=requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", opacity:.65 }} />;
}

/* ─── RISK DOTS ─── */
function RiskDots({ level }: { level: number }) {
  const colors = ["#4ade80","#fbbf24","#f87171"];
  const labels = ["Low risk","Medium risk","Higher risk"];
  const c = colors[level-1];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ width:"8px", height:"8px", borderRadius:"50%", background:i<=level?c:"rgba(255,255,255,.1)", boxShadow:i<=level?`0 0 8px ${c}88`:"none", transition:"all .3s" }} />
      ))}
      <span style={{ fontSize:"11px", color:c, marginLeft:"4px", fontWeight:600 }}>{labels[level-1]}</span>
    </div>
  );
}

/* ─── GROWTH PROJECTION CHART ─── */
function ProjectionChart({ amount, vault }: { amount: number; vault: Vault }) {
  const years = [0,1,2,3,5];
  const vals = years.map(y => amount * Math.pow(1 + vault.apy/100, y));
  const max = vals[vals.length-1];
  return (
    <div style={{ padding:"20px 0 0" }}>
      <p style={{ fontSize:"11px", color:"#6b7280", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", marginBottom:"16px" }}>Growth projection</p>
      <div style={{ display:"flex", alignItems:"flex-end", gap:"8px", height:"80px" }}>
        {years.map((y,i) => {
          const h = Math.max((vals[i]/max)*100, 8);
          return (
            <div key={y} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
              <span style={{ fontSize:"11px", fontWeight:700, color:vault.light }}>${vals[i]>=1000?`${(vals[i]/1000).toFixed(1)}K`:vals[i].toFixed(0)}</span>
              <div style={{ width:"100%", background:i===0?"rgba(255,255,255,.08)":`linear-gradient(to top,${vault.color}cc,${vault.color}44)`, borderRadius:"4px 4px 0 0", height:`${h}%`, transition:"height .6s cubic-bezier(.23,1,.32,1)", minHeight:"6px" }} />
              <span style={{ fontSize:"10px", color:"#4b5563" }}>Y{y}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function VaultsPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [sort, setSort] = useState<"apy"|"risk"|"tvl">("apy");
  const [hov, setHov] = useState<string|null>(null);
  const [activeTab, setActiveTab] = useState<"overview"|"projection"|"compare">("overview");
  useReveal();

  const num = parseFloat(amount);
  const hasAmt = amount !== "" && !isNaN(num) && num > 0;

  const sorted = [...VAULTS].sort((a,b) => sort==="apy"?b.apy-a.apy:sort==="risk"?a.risk-b.risk:b.tvl-a.tvl);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root { --bg:#060912; --sur:rgba(255,255,255,.035); --bor:rgba(255,255,255,.07); --t1:#eef2ff; --t2:#6b7280; --t3:#1f2937; --FD:'Cabinet Grotesk',sans-serif; --FB:'Instrument Sans',sans-serif; }
        body { background:var(--bg); color:var(--t1); font-family:var(--FB); }
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:rgba(99,102,241,.3);border-radius:4px;}

        /* Orbs */
        .vo1{position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;width:700px;height:700px;top:-20%;left:-5%;background:radial-gradient(circle,rgba(59,130,246,.12),transparent 60%);animation:vd1 26s ease-in-out infinite;}
        .vo2{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;width:500px;height:500px;bottom:5%;right:-10%;background:radial-gradient(circle,rgba(139,92,246,.10),transparent 60%);animation:vd2 20s ease-in-out infinite;}
        @keyframes vd1{0%,100%{transform:translate(0,0)}50%{transform:translate(45px,55px) scale(1.05)}}
        @keyframes vd2{0%,100%{transform:translate(0,0)}50%{transform:translate(-45px,-35px)}}

        /* Noise */
        .noise{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.018;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:256px;}

        /* Reveals */
        [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .75s cubic-bezier(.23,1,.32,1),transform .75s cubic-bezier(.23,1,.32,1);}
        [data-reveal].in{opacity:1;transform:translateY(0);}

        /* Hero */
        .vl{opacity:0;animation:vFU .6s ease var(--d,0s) forwards;}
        .vl1{--d:.08s}.vl2{--d:.25s}.vl3{--d:.42s}.vl4{--d:.58s}
        @keyframes vFU{to{opacity:1;transform:translateY(0)}}
        .vl{transform:translateY(10px);}

        /* Grad text */
        .gt{background:linear-gradient(110deg,#60a5fa 0%,#4ade80 55%,#a78bfa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

        /* Vault card */
        .vcard{background:var(--sur);border:1px solid var(--bor);border-radius:22px;transition:border-color .3s,box-shadow .3s,background .3s;cursor:pointer;}

        /* Buttons */
        .btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;font-family:var(--FB);font-weight:600;font-size:13px;padding:11px 22px;border-radius:100px;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(99,102,241,.3);transition:transform .2s,box-shadow .2s;}
        .btn-p:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 8px 32px rgba(99,102,241,.45);}
        .sort-btn{display:inline-flex;align-items:center;gap:5px;padding:8px 16px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--bor);background:transparent;color:var(--t2);font-family:var(--FB);transition:all .2s;letter-spacing:.04em;text-transform:uppercase;}
        .sort-btn:hover{color:var(--t1);border-color:rgba(255,255,255,.15);}
        .sort-btn.on{color:white;border-color:rgba(99,102,241,.45);background:rgba(99,102,241,.12);}
        .tab-btn{padding:8px 16px;border-radius:10px;font-size:13px;font-weight:500;cursor:pointer;border:none;background:transparent;color:var(--t2);font-family:var(--FB);transition:all .2s;}
        .tab-btn:hover{color:var(--t1);}
        .tab-btn.on{color:white;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.25);}

        /* Tags */
        .vtag{font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px;border:1px solid currentColor;opacity:.6;letter-spacing:.05em;text-transform:uppercase;}

        /* APY bar */
        @keyframes barIn{from{width:0}to{width:var(--w)}}
        .apybar{height:3px;border-radius:2px;animation:barIn 1.1s cubic-bezier(.23,1,.32,1) .2s both;}

        /* Calc */
        .calc-wrap{background:linear-gradient(135deg,rgba(59,130,246,.07),rgba(139,92,246,.07));border:1px solid rgba(99,102,241,.18);border-radius:20px;padding:28px;}
        .amt-input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;color:#eef2ff;font-family:var(--FD);font-size:24px;font-weight:800;letter-spacing:-.02em;padding:14px 16px 14px 44px;outline:none;transition:border-color .25s;}
        .amt-input:focus{border-color:rgba(99,102,241,.45);}
        .amt-input::placeholder{color:#374151;font-size:16px;font-weight:400;letter-spacing:0;}

        /* Disclaimer */
        .disc{display:flex;gap:14px;padding:18px 22px;border-radius:16px;background:rgba(251,191,36,.05);border:1px solid rgba(251,191,36,.15);}

        /* Expand */
        .exp-body{overflow:hidden;transition:max-height .5s cubic-bezier(.23,1,.32,1),opacity .4s ease;}

        /* Compare table */
        .cmp-table{width:100%;border-collapse:collapse;}
        .cmp-table th,.cmp-table td{padding:10px 14px;text-align:left;border-bottom:1px solid rgba(255,255,255,.05);font-size:13px;}
        .cmp-table th{color:var(--t2);font-weight:600;font-size:11px;letter-spacing:.08em;text-transform:uppercase;}
        .cmp-table tr:last-child td{border:none;}
        .cmp-table tr:hover td{background:rgba(255,255,255,.02);}
      `}</style>

      <div className="vo1" style={{ zIndex:0 }} />
      <div className="vo2" style={{ zIndex:0 }} />
      <div className="noise" />
      <Particles />

      <main style={{ position:"relative", zIndex:2, minHeight:"100vh" }}>

        {/* ══ NAV ══ */}
        <nav style={{ position:"sticky", top:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 36px", borderBottom:"1px solid rgba(255,255,255,.05)", backdropFilter:"blur(24px)", background:"rgba(6,9,18,.75)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <button onClick={() => router.push("/chat")} style={{ display:"flex", alignItems:"center", gap:"6px", background:"none", border:"none", cursor:"pointer", color:"#6b7280", fontSize:"14px", fontFamily:"var(--FB)", fontWeight:500, transition:"color .2s" }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#eef2ff"}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#6b7280"}>
              {Ic.back} Back
            </button>
            <div style={{ width:"1px", height:"20px", background:"rgba(255,255,255,.08)" }} />
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <Logo size={26} />
              <span style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"15px", letterSpacing:"-.01em" }}>Yield Vaults</span>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"12px", color:"#4ade80", fontWeight:500 }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
            Live rates · Base ecosystem
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section style={{ maxWidth:"1100px", margin:"0 auto", padding:"72px 36px 48px" }}>
          <div style={{ maxWidth:"580px" }}>
            <div className="vl vl1" style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"11px", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", color:"#4ade80", padding:"6px 14px", borderRadius:"100px", border:"1px solid rgba(74,222,128,.2)", background:"rgba(74,222,128,.06)", marginBottom:"22px" }}>
              <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
              4 curated vaults · All on Base · USDC only
            </div>
            <h1 className="vl vl2" style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(46px,6.5vw,76px)", letterSpacing:"-.04em", lineHeight:.97, marginBottom:"20px" }}>
              Put your savings<br /><span className="gt">to work.</span>
            </h1>
            <p className="vl vl3" style={{ color:"var(--t2)", fontSize:"17px", lineHeight:1.72, maxWidth:"440px", fontWeight:400, marginBottom:"36px" }}>
              Discover curated DeFi vaults that earn yield on your USDC. Every vault is vetted, audited, and built on Base. Zero volatility — all returns paid in USDC.
            </p>
            <div className="vl vl4" style={{ display:"flex", gap:"36px", flexWrap:"wrap" }}>
              {[
                { lbl:"Up to",       val:"10.8%", sub:"APY available",     c:"#60a5fa" },
                { lbl:"All vaults",  val:"USDC",  sub:"No volatility",     c:"#a78bfa" },
                { lbl:"Total TVL",   val:"$81B+", sub:"Combined liquidity", c:"#4ade80" },
              ].map(s => (
                <div key={s.lbl}>
                  <div style={{ fontSize:"11px", color:"var(--t2)", fontWeight:500, letterSpacing:".08em", textTransform:"uppercase", marginBottom:"4px" }}>{s.lbl}</div>
                  <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"30px", letterSpacing:"-.03em", color:s.c, lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:"12px", color:"var(--t2)", marginTop:"3px" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CALCULATOR ══ */}
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 36px 40px" }} data-reveal>
          <div className="calc-wrap">
            {/* Tabs */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <span style={{ color:"#818cf8" }}>{Ic.calc}</span>
                <span style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"17px", letterSpacing:"-.02em" }}>Earnings calculator</span>
              </div>
              <div style={{ display:"flex", gap:"4px" }}>
                {(["overview","projection","compare"] as const).map(t => (
                  <button key={t} className={`tab-btn ${activeTab===t?"on":""}`} onClick={() => setActiveTab(t)}>
                    {t.charAt(0).toUpperCase()+t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div style={{ position:"relative", marginBottom:hasAmt?"24px":"0" }}>
              <span style={{ position:"absolute", left:"16px", top:"50%", transform:"translateY(-50%)", color:"#6b7280", fontSize:"20px", fontWeight:800, pointerEvents:"none", fontFamily:"var(--FD)" }}>$</span>
              <input type="number" className="amt-input" placeholder="Enter your savings amount..." value={amount} onChange={e => setAmount(e.target.value)} />
            </div>

            {/* Overview tab */}
            {hasAmt && activeTab === "overview" && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"12px" }}>
                {VAULTS.map(v => (
                  <div key={v.id} style={{ padding:"18px 20px", borderRadius:"14px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", transition:"border-color .2s" }}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=v.abord}
                    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.08)"}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                      {v.mark}
                      <span style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"13px" }}>{v.protocol}</span>
                      <span style={{ marginLeft:"auto", fontSize:"12px", fontWeight:700, color:v.light }}>{v.apy}%</span>
                    </div>
                    <div style={{ display:"flex", gap:"16px" }}>
                      <div>
                        <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"22px", letterSpacing:"-.03em", color:v.light }}>${(num*v.apy/100/12).toFixed(2)}</div>
                        <div style={{ fontSize:"11px", color:"var(--t2)", marginTop:"2px" }}>per month</div>
                      </div>
                      <div>
                        <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"22px", letterSpacing:"-.03em", color:v.light }}>${(num*v.apy/100).toFixed(2)}</div>
                        <div style={{ fontSize:"11px", color:"var(--t2)", marginTop:"2px" }}>per year</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projection tab */}
            {hasAmt && activeTab === "projection" && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"16px" }}>
                {VAULTS.map(v => (
                  <div key={v.id} style={{ padding:"20px", borderRadius:"14px", background:"rgba(255,255,255,.04)", border:`1px solid ${v.abord}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                      {v.mark}
                      <span style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"13px" }}>{v.protocol}</span>
                    </div>
                    <ProjectionChart amount={num} vault={v} />
                  </div>
                ))}
              </div>
            )}

            {/* Compare tab */}
            {hasAmt && activeTab === "compare" && (
              <div style={{ overflowX:"auto" }}>
                <table className="cmp-table">
                  <thead>
                    <tr>
                      <th>Vault</th>
                      <th>APY</th>
                      <th>Monthly</th>
                      <th>Yearly</th>
                      <th>5 Year</th>
                      <th>Risk</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...VAULTS].sort((a,b)=>b.apy-a.apy).map(v => (
                      <tr key={v.id}>
                        <td><div style={{ display:"flex", alignItems:"center", gap:"8px" }}>{v.mark}<span style={{ fontFamily:"var(--FD)", fontWeight:700 }}>{v.protocol}</span></div></td>
                        <td><span style={{ color:v.light, fontFamily:"var(--FD)", fontWeight:800 }}>{v.apy}%</span></td>
                        <td style={{ color:"var(--t1)", fontWeight:500 }}>${(num*v.apy/100/12).toFixed(2)}</td>
                        <td style={{ color:"var(--t1)", fontWeight:500 }}>${(num*v.apy/100).toFixed(2)}</td>
                        <td style={{ color:v.light, fontWeight:600, fontFamily:"var(--FD)" }}>${(num*Math.pow(1+v.apy/100,5)-num).toFixed(0)}</td>
                        <td><RiskDots level={v.risk} /></td>
                        <td style={{ color:"var(--t2)", fontSize:"12px" }}>{v.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!hasAmt && (
              <p style={{ color:"#4b5563", fontSize:"13px", textAlign:"center", marginTop:"4px" }}>
                Enter an amount above to see your estimated earnings across all vaults
              </p>
            )}
          </div>
        </div>

        {/* ══ CONTROLS ══ */}
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 36px 20px" }} data-reveal>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
            <p style={{ color:"var(--t2)", fontSize:"13px" }}>
              <span style={{ color:"var(--t1)", fontWeight:600 }}>{VAULTS.length} vaults</span> · All USDC on Base · Click any card to expand
            </p>
            <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
              <span style={{ fontSize:"12px", color:"var(--t2)", marginRight:"4px" }}>Sort:</span>
              {(["apy","risk","tvl"] as const).map(s => (
                <button key={s} className={`sort-btn ${sort===s?"on":""}`} onClick={() => setSort(s)}>
                  {s==="apy"?"Yield":s==="risk"?"Safest":"TVL"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══ VAULT CARDS ══ */}
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 36px 72px" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {sorted.map((v, i) => {
              const isOpen = expanded === v.id;
              const isH = hov === v.id;
              return (
                <div key={v.id} className="vcard" data-reveal data-delay={String(i*80)}
                  style={{ borderColor:isH||isOpen?v.abord:"rgba(255,255,255,.07)", background:isH||isOpen?v.abg:"rgba(255,255,255,.025)" }}
                  onMouseEnter={() => setHov(v.id)} onMouseLeave={() => setHov(null)}
                  onClick={() => setExpanded(isOpen?null:v.id)}>
                  <div style={{ padding:"28px 32px" }}>

                    {/* Main row */}
                    <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
                      {/* Logo + name */}
                      <div style={{ display:"flex", alignItems:"center", gap:"14px", flex:1, minWidth:"180px" }}>
                        <div style={{ width:"50px", height:"50px", borderRadius:"14px", flexShrink:0, border:`1px solid ${v.abord}`, background:v.abg, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:isH?`0 0 22px ${v.color}22`:"none", transition:"box-shadow .3s" }}>{v.mark}</div>
                        <div>
                          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"5px", flexWrap:"wrap" }}>
                            <span style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"16px", letterSpacing:"-.02em" }}>{v.name}</span>
                            <span style={{ fontSize:"11px", fontWeight:700, color:v.badgeC, background:v.badgeBg, padding:"3px 9px", borderRadius:"100px" }}>{v.badge}</span>
                          </div>
                          <div style={{ display:"flex", gap:"8px", alignItems:"center", flexWrap:"wrap" }}>
                            <span style={{ fontSize:"11px", color:"var(--t2)", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)", padding:"2px 8px", borderRadius:"100px" }}>{v.chain}</span>
                            <span style={{ fontSize:"11px", color:"var(--t2)" }}>{v.type}</span>
                            <span style={{ fontSize:"11px", color:"var(--t2)" }}>TVL {fmtTVL(v.tvl)}</span>
                          </div>
                        </div>
                      </div>

                      {/* APY */}
                      <div style={{ textAlign:"center", minWidth:"100px" }}>
                        <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"38px", letterSpacing:"-.03em", lineHeight:1, color:v.light, textShadow:isH?`0 0 28px ${v.color}55`:"none", transition:"text-shadow .3s" }}>
                          {v.apy}%
                        </div>
                        <div style={{ fontSize:"10px", color:"var(--t2)", letterSpacing:".08em", textTransform:"uppercase", marginTop:"4px" }}>APY</div>
                        <div style={{ marginTop:"8px", height:"3px", borderRadius:"2px", background:"rgba(255,255,255,.06)", overflow:"hidden" }}>
                          <div className="apybar" style={{ "--w":`${(v.apy/12)*100}%`, width:`${(v.apy/12)*100}%`, background:`linear-gradient(90deg,${v.color}66,${v.color})` } as React.CSSProperties} />
                        </div>
                      </div>

                      {/* Risk */}
                      <div style={{ minWidth:"130px" }}>
                        <RiskDots level={v.risk} />
                        <div style={{ marginTop:"8px", fontSize:"12px", color:"var(--t2)" }}>TVL: <span style={{ color:"var(--t1)", fontWeight:600 }}>{fmtTVL(v.tvl)}</span></div>
                      </div>

                      {/* Description */}
                      <div style={{ flex:2, minWidth:"200px" }}>
                        <p style={{ fontSize:"13px", color:"var(--t2)", lineHeight:1.75, marginBottom:"10px" }}>{v.desc}</p>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                          {v.highlights.slice(0,3).map(h => (
                            <span key={h} className="vtag" style={{ color:v.light }}>{h}</span>
                          ))}
                        </div>
                      </div>

                      {/* CTA + expand indicator */}
                      <div style={{ display:"flex", flexDirection:"column", gap:"10px", alignItems:"center", flexShrink:0 }}>
                        <button className="btn-p" style={{ background:`linear-gradient(135deg,${v.color}cc,${v.color}88)` }}
                          onClick={e => { e.stopPropagation(); router.push("/chat"); }}>
                          Save here {Ic.arrow}
                        </button>
                        <div style={{ color:"var(--t2)", transition:"transform .3s", transform:isOpen?"rotate(180deg)":"none", display:"flex", alignItems:"center" }}>{Ic.chevD}</div>
                      </div>
                    </div>

                    {/* Inline calc preview */}
                    {hasAmt && (
                      <div style={{ marginTop:"18px", padding:"14px 18px", borderRadius:"12px", background:"rgba(255,255,255,.03)", border:`1px solid ${v.abord}`, display:"flex", alignItems:"center", gap:"24px", flexWrap:"wrap" }}>
                        <span style={{ fontSize:"12px", color:"var(--t2)" }}>With <strong style={{ color:"var(--t1)" }}>${parseFloat(amount).toLocaleString()}</strong>:</span>
                        <span><span style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"20px", color:v.light }}>${(num*v.apy/100/12).toFixed(2)}</span><span style={{ fontSize:"12px", color:"var(--t2)", marginLeft:"4px" }}>/month</span></span>
                        <span><span style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"20px", color:v.light }}>${(num*v.apy/100).toFixed(2)}</span><span style={{ fontSize:"12px", color:"var(--t2)", marginLeft:"4px" }}>/year</span></span>
                        {hasAmt && <span style={{ marginLeft:"auto" }}><span style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"13px", color:v.light }}>${(num*Math.pow(1+v.apy/100,5)-num).toFixed(0)}</span><span style={{ fontSize:"11px", color:"var(--t2)", marginLeft:"3px" }}>earned in 5yr</span></span>}
                      </div>
                    )}

                    {/* Expanded */}
                    <div className="exp-body" style={{ maxHeight:isOpen?"600px":"0", opacity:isOpen?1:0 }}>
                      <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", paddingTop:"28px", marginTop:"24px" }}>
                        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"28px" }}>
                          <div>
                            <p style={{ fontSize:"11px", color:"var(--t2)", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", marginBottom:"12px" }}>How it works</p>
                            <p style={{ fontSize:"14px", color:"#94a3b8", lineHeight:1.8 }}>{v.howItWorks}</p>
                          </div>
                          <div>
                            <p style={{ fontSize:"11px", color:"var(--t2)", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", marginBottom:"12px" }}>Risk breakdown</p>
                            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                              {v.riskRows.map(([l,val]) => (
                                <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:"13px" }}>
                                  <span style={{ color:"var(--t2)" }}>{l}</span>
                                  <span style={{ color:v.light, fontWeight:600 }}>{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p style={{ fontSize:"11px", color:"var(--t2)", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", marginBottom:"12px" }}>All highlights</p>
                            <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                              {v.highlights.map(h => (
                                <div key={h} style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"13px", color:"#94a3b8" }}>
                                  <span style={{ color:v.light, fontWeight:700 }}>✓</span> {h}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <a href={v.link} target="_blank" rel="noopener noreferrer"
                          style={{ display:"inline-flex", alignItems:"center", gap:"6px", marginTop:"24px", fontSize:"13px", fontWeight:600, color:v.light, textDecoration:"none", padding:"10px 20px", borderRadius:"100px", border:`1px solid ${v.abord}`, background:v.abg, transition:"background .2s" }}
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

        {/* ══ SUMMARY STATS ══ */}
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 36px 56px" }}>
          <div data-reveal style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"12px" }}>
            {[
              { icon:Ic.trend,  lbl:"Highest APY",        val:"10.8%",  c:"#4ade80" },
              { icon:Ic.shield, lbl:"Audited protocols",  val:"4 / 4",  c:"#60a5fa" },
              { icon:Ic.zap,    lbl:"Avg gas fee",        val:"< 1¢",   c:"#fbbf24" },
              { icon:Ic.chart,  lbl:"Yield types",        val:"3 types",c:"#a78bfa" },
            ].map((s,i) => (
              <div key={s.lbl} data-reveal data-delay={String(i*80)}
                style={{ padding:"22px 24px", background:"var(--sur)", border:"1px solid var(--bor)", borderRadius:"16px", transition:"border-color .3s" }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=`${s.c}44`}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.07)"}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
                  <span style={{ color:s.c, opacity:.8 }}>{s.icon}</span>
                  <span style={{ fontSize:"11px", color:"var(--t2)", fontWeight:600, textTransform:"uppercase", letterSpacing:".08em" }}>{s.lbl}</span>
                </div>
                <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"26px", letterSpacing:"-.03em", color:s.c }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ DISCLAIMER ══ */}
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 36px 72px" }} data-reveal>
          <div className="disc">
            <span style={{ color:"#fbbf24", flexShrink:0, marginTop:"1px" }}>{Ic.info}</span>
            <p style={{ fontSize:"13px", color:"#94a3b8", lineHeight:1.75 }}>
              <strong style={{ color:"#fbbf24", fontWeight:700 }}>Informational only.</strong>{" "}
              Yield rates are variable and change with market conditions. DeFi protocols carry smart contract risk. Stashify does not custody your funds — all vault interactions happen directly on Base blockchain. Aerodrome yields depend on trading volume and may vary significantly. Always understand the risks before depositing. This is not financial advice.
            </p>
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <footer style={{ borderTop:"1px solid rgba(255,255,255,.05)", padding:"28px 36px" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <Logo size={20} />
              <span style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"13px", color:"#6b7280" }}>Stashify</span>
            </div>
            <span style={{ color:"#1f2937", fontSize:"12px" }}>© 2026 Stashify · Built on Base</span>
          </div>
        </footer>
      </main>
    </>
  );
}