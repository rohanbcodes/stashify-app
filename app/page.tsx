"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ─────────────── LOGO ─────────────── */
const Logo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg_main" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#3b82f6" }} />
        <stop offset="100%" style={{ stopColor: "#8b5cf6" }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" rx="44" fill="url(#lg_main)" />
    <rect x="35" y="122" width="130" height="58" rx="9" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
    <rect x="35" y="148" width="130" height="8" fill="rgba(255,255,255,0.10)" />
    <rect x="30" y="92" width="140" height="38" rx="9" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    <rect x="38" y="95" width="124" height="5" rx="3" fill="rgba(255,255,255,0.30)" />
    <text x="100" y="120" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="700" fill="rgba(255,255,255,0.95)">S</text>
    <rect x="88" y="126" width="24" height="14" rx="4" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
    <circle cx="100" cy="133" r="4" fill="rgba(255,255,255,0.9)" />
    <circle cx="100" cy="133" r="2" fill="#3b82f6" />
    <circle cx="100" cy="79" r="11" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="100" y="84" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#92400e">$</text>
    <line x1="100" y1="52" x2="100" y2="66" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M93 60L100 68L107 60" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="45" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)" />
    <rect x="137" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)" />
  </svg>
);

/* ─────────────── ICONS ─────────────── */
const Ic = {
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  send: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  lock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  msg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  zap22: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  target: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  trendUp: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  handshake: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l2 2a1 1 0 1 0 3-3"/><path d="M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="M21 3l-3.4 3.4M3 21l3.4-3.4M3 13l3 3"/></svg>,
  spark: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6z"/><path d="M19 17l1 2.5L22 20l-2 1-1 2-1-2-2-1 2-.5z"/></svg>,
  external: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
};

/* ─────────────── PARTNER LOGOS (premium SVG, monochrome) ─────────────── */
const PartnerLogos = {
  base: (
    <svg viewBox="0 0 130 36" height="22" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="13" fill="currentColor" />
      <text x="33" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.4" fill="currentColor">Base</text>
    </svg>
  ),
  coinbase: (
    <svg viewBox="0 0 165 36" height="22" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="13" fill="currentColor" />
      <rect x="10" y="16" width="8" height="4" rx="0.5" fill="#060912" />
      <text x="33" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.5" fill="currentColor">Coinbase</text>
    </svg>
  ),
  usdc: (
    <svg viewBox="0 0 110 36" height="22" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="13" fill="currentColor" />
      <text x="14" y="23" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontSize="14" fontWeight="700" fill="#060912">$</text>
      <text x="33" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.5" fill="currentColor">USDC</text>
    </svg>
  ),
  circle: (
    <svg viewBox="0 0 120 36" height="22" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="11" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <text x="33" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.4" fill="currentColor">Circle</text>
    </svg>
  ),
  openai: (
    <svg viewBox="0 0 130 36" height="22" xmlns="http://www.w3.org/2000/svg">
      <path transform="translate(2,4) scale(0.95)" d="M27.18 11.62a8.5 8.5 0 0 0-.73-7 8.6 8.6 0 0 0-9.27-4.13 8.5 8.5 0 0 0-6.4-2.86 8.6 8.6 0 0 0-8.2 5.95 8.5 8.5 0 0 0-5.69 4.13 8.6 8.6 0 0 0 1.06 10.1 8.5 8.5 0 0 0 .73 7 8.6 8.6 0 0 0 9.27 4.13 8.5 8.5 0 0 0 6.4 2.86 8.6 8.6 0 0 0 8.2-5.95 8.5 8.5 0 0 0 5.69-4.13 8.6 8.6 0 0 0-1.06-10.1zM15.66 28.95a6.4 6.4 0 0 1-4.1-1.48l.2-.12 6.84-3.95a1.1 1.1 0 0 0 .56-.97V12.78l2.9 1.67a.1.1 0 0 1 .05.08v8a6.41 6.41 0 0 1-6.45 6.42z" fill="currentColor" />
      <text x="33" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.5" fill="currentColor">OpenAI</text>
    </svg>
  ),
  langchain: (
    <svg viewBox="0 0 145 36" height="22" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="11" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="14" cy="18" r="4" fill="currentColor" />
      <text x="33" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.5" fill="currentColor">LangChain</text>
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 130 36" height="22" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="13" fill="currentColor" />
      <path d="M9 12h2v12H9zM18 12h-2v8.5l-4.5-8.5H10v12h1.5v-8.5L18 24h1V12z" fill="#060912" />
      <text x="33" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.5" fill="currentColor">Next.js</text>
    </svg>
  ),
};

/* ─────────────── PARTICLE CANVAS ─────────────── */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.3,
      o: Math.random() * 0.35 + 0.06,
    }));
    const tick = () => {
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
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${0.05 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.7 }} />;
}

/* ─────────────── MAGNETIC BUTTON ─────────────── */
function MagBtn({ children, onClick, style = {}, className = "" }: {
  children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties; className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.22;
    const y = (e.clientY - r.top - r.height / 2) * 0.22;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <button ref={ref} onClick={onClick} className={className} style={{ ...style, transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1)" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>{children}</button>
  );
}

/* ─────────────── REVEAL HOOK ─────────────── */
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

/* ─────────────── TILT CARD ─────────────── */
function TiltCard({ children, style = {}, className = "", onClick }: { children: React.ReactNode; style?: React.CSSProperties; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
    el.style.setProperty("--mx", `${(e.clientX - r.left)}px`);
    el.style.setProperty("--my", `${(e.clientY - r.top)}px`);
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)"; };
  return (
    <div ref={ref} className={className} onClick={onClick} style={{ ...style, transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)", transformStyle: "preserve-3d" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
  );
}

/* ─────────────── FAQ ACCORDION ─────────────── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    {
      q: "Do I need to know anything about crypto?",
      a: "Not at all. Stashify handles everything behind the scenes — wallets, keys, blockchain transactions. You just type what you want to save for in plain English. No technical knowledge required.",
    },
    {
      q: "Is my money safe?",
      a: "Yes. Your funds are held in a smart contract on Base — not on our servers. We never have custody of your money. You can withdraw at any time, and only you control your vault.",
    },
    {
      q: "What is a Stash Pact?",
      a: "A Stash Pact is an onchain savings agreement between two people. Both deposit toward a shared goal, and the smart contract holds the funds until both parties hit their target. Neither person can withdraw early — commitment, enforced by code.",
    },
    {
      q: "What currency does Stashify use?",
      a: "Stashify uses USDC — a dollar-pegged stablecoin issued by Circle. $1 USDC = $1 USD, always. No volatility, no crypto price risk. Your savings stay stable.",
    },
    {
      q: "Are there any fees?",
      a: "Stashify charges zero platform fees. The only cost is a tiny blockchain gas fee paid to the Base network — typically less than one cent per transaction.",
    },
    {
      q: "Do I need a crypto wallet to use Stashify?",
      a: "No separate wallet setup needed. Stashify uses Coinbase's CDP wallet infrastructure to create and manage a wallet for you automatically — completely invisible to you.",
    },
    {
      q: "Can I withdraw my savings at any time?",
      a: "Yes, always. Your savings are never locked unless you create a Stash Pact with a partner. From your regular savings vault, you can withdraw any amount at any time with no penalty.",
    },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            data-reveal
            data-delay={String(i * 60)}
            onClick={() => setOpen(isOpen ? null : i)}
            style={{
              borderRadius:"16px",
              border: isOpen ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.07)",
              background: isOpen ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.03)",
              overflow:"hidden",
              cursor:"pointer",
              transition:"border-color 0.25s, background 0.25s",
            }}
            onMouseEnter={e => {
              if (!isOpen) {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }
            }}
            onMouseLeave={e => {
              if (!isOpen) {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }
            }}
          >
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", gap:"16px" }}>
              <span style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"15px", letterSpacing:"-.01em", color: isOpen ? "#eef2ff" : "#cbd5e1", transition:"color 0.2s", lineHeight:1.4 }}>
                {item.q}
              </span>
              <div style={{
                width:"28px", height:"28px", borderRadius:"50%", flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                background: isOpen ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
                border: isOpen ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.1)",
                transition:"all 0.3s ease",
                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#818cf8" : "#6b7280"} strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
            </div>
            <div style={{
              maxHeight: isOpen ? "240px" : "0",
              opacity: isOpen ? 1 : 0,
              overflow:"hidden",
              transition:"max-height 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease",
            }}>
              <div style={{ padding:"0 24px 20px", borderTop:"1px solid rgba(99,102,241,0.12)" }}>
                <p style={{ color:"#94a3b8", fontSize:"14px", lineHeight:1.8, paddingTop:"16px" }}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────── MAIN ─────────────── */
export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const VAULT_ADDR = "0xf475cEB6460dD0F004b27095aFB4C8CFc9B0260C";
  const PACT_ADDR  = "0xcABcbbfA91B10df707d6f56ccBb7adA64161d5D9";
  const baseScan = (a: string) => `https://sepolia.basescan.org/address/${a}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #060912;
          --sur: rgba(255,255,255,0.035);
          --bor: rgba(255,255,255,0.07);
          --t1: #eef2ff; --t2: #6b7280; --t3: #1f2937;
          --blue: #3b82f6; --ind: #6366f1; --vio: #8b5cf6;
          --grad: linear-gradient(135deg, #3b82f6, #8b5cf6);
          --FD: 'Cabinet Grotesk', sans-serif;
          --FB: 'Instrument Sans', sans-serif;
          --FM: 'JetBrains Mono', ui-monospace, monospace;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--t1); font-family: var(--FB); overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,.3); border-radius: 4px; }

        /* ORBS */
        .orb { position: fixed; border-radius: 50%; pointer-events: none; filter: blur(72px); }
        .o1 { width: 800px; height: 800px; top: -20%; left: -8%; background: radial-gradient(circle, rgba(59,130,246,.13) 0%, transparent 60%); animation: oF1 28s ease-in-out infinite; }
        .o2 { width: 600px; height: 600px; top: 25%; right: -12%; background: radial-gradient(circle, rgba(139,92,246,.11) 0%, transparent 60%); animation: oF2 22s ease-in-out infinite; }
        .o3 { width: 450px; height: 450px; bottom: -8%; left: 22%; background: radial-gradient(circle, rgba(99,102,241,.09) 0%, transparent 60%); animation: oF3 34s ease-in-out infinite; }
        @keyframes oF1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(50px,70px) scale(1.06)} 66%{transform:translate(-30px,35px) scale(.96)} }
        @keyframes oF2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-60px,-45px) scale(1.08)} }
        @keyframes oF3 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(40px,-28px) scale(1.04)} }

        /* NOISE */
        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: .018;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px; }

        /* REVEALS */
        [data-reveal] { opacity: 0; transform: translateY(26px); transition: opacity .75s cubic-bezier(.23,1,.32,1), transform .75s cubic-bezier(.23,1,.32,1); }
        [data-reveal].in { opacity: 1; transform: translateY(0); }

        /* HERO SEQUENCE */
        .h0 { opacity:0; transform:translateY(8px);  animation: hU .5s ease .05s forwards; }
        .h1 { opacity:0; transform:translateY(20px); animation: hU .7s ease .2s  forwards; }
        .h2 { opacity:0; transform:translateY(20px); animation: hU .7s ease .32s forwards; }
        .h3 { opacity:0; transform:translateY(16px); animation: hU .6s ease .48s forwards; }
        .h4 { opacity:0; transform:translateY(12px); animation: hU .6s ease .62s forwards; }
        .h5 { opacity:0; transform:translateY(12px); animation: hU .6s ease .72s forwards; }
        .hc { opacity:0; transform:translateY(32px) scale(.97); animation: hCard .9s cubic-bezier(.23,1,.32,1) .3s forwards; }
        @keyframes hU    { to { opacity:1; transform:translateY(0); } }
        @keyframes hCard { to { opacity:1; transform:translateY(0) scale(1); } }

        /* CHAT MESSAGES */
        .cm1 { opacity:0; animation: cmIn .4s ease .8s  forwards; }
        .cm2 { opacity:0; animation: cmIn .4s ease 1.5s forwards; }
        .cm3 { opacity:0; animation: cmIn .4s ease 2.2s forwards; }
        @keyframes cmIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }

        /* CURSOR */
        .cur { display:inline-block; width:2px; height:13px; background:#818cf8; margin-left:2px; vertical-align:middle; animation:blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* PULSE DOT */
        .pdot::after { content:''; position:absolute; inset:0; border-radius:50%; background:#4ade80; animation:pring 2.2s ease-out infinite; }
        @keyframes pring { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.6);opacity:0} }

        /* GRAD TEXT */
        .gt { background: linear-gradient(110deg, #60a5fa 0%, #818cf8 42%, #c084fc 85%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* BUTTONS */
        .btn-p { display:inline-flex; align-items:center; gap:9px; background:var(--grad); color:#fff; font-family:var(--FB); font-weight:600; font-size:15px; padding:14px 32px; border-radius:100px; border:none; cursor:pointer; box-shadow:0 0 0 1px rgba(255,255,255,.08) inset, 0 8px 28px rgba(99,102,241,.38); position:relative; overflow:hidden; }
        .btn-p::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.14),transparent 50%); opacity:0; transition:opacity .25s; }
        .btn-p:hover::after { opacity:1; }
        .btn-p:hover { box-shadow:0 0 0 1px rgba(255,255,255,.1) inset, 0 12px 44px rgba(99,102,241,.52); }

        .btn-g { display:inline-flex; align-items:center; gap:9px; background:rgba(255,255,255,.04); color:var(--t2); font-family:var(--FB); font-weight:500; font-size:15px; padding:14px 28px; border-radius:100px; border:1px solid rgba(255,255,255,.09); cursor:pointer; transition:all .25s ease; text-decoration:none; }
        .btn-g:hover { color:var(--t1); border-color:rgba(255,255,255,.17); background:rgba(255,255,255,.07); }

        /* CARD */
        .card { background:var(--sur); border:1px solid var(--bor); border-radius:22px; transition:border-color .3s, box-shadow .3s; position:relative; overflow:hidden; }
        .card:hover { border-color:rgba(99,102,241,.24); box-shadow:0 0 36px rgba(99,102,241,.06), 0 16px 48px rgba(0,0,0,.28); }
        .card-glow::before { content:''; position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .3s; background: radial-gradient(450px circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,.09), transparent 40%); z-index:0; }
        .card-glow:hover::before { opacity:1; }
        .card-glow > * { position:relative; z-index:1; }

        /* STEP NUM */
        .snum { font-family:var(--FD); font-size:110px; font-weight:900; line-height:1; color:transparent; -webkit-text-stroke:1px rgba(99,102,241,.08); position:absolute; top:-16px; right:-8px; pointer-events:none; user-select:none; transition:-webkit-text-stroke-color .3s; z-index:0; }
        .card:hover .snum { -webkit-text-stroke-color:rgba(99,102,241,.2); }

        /* LABEL */
        .lbl { font-family:var(--FB); font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; }

        /* BENTO */
        .bento { display:grid; grid-template-columns:1fr 1fr 1fr; grid-template-rows:auto auto; gap:14px; }
        .b-lg  { grid-column:1/3; }
        .b-tl  { grid-column:3; grid-row:1/3; }
        .b-sm1 { grid-column:1; }
        .b-sm2 { grid-column:2; }
        @media(max-width:768px){
          .bento{grid-template-columns:1fr 1fr;}
          .b-lg{grid-column:1/3;} .b-tl{grid-column:1/3;grid-row:auto;}
          .b-sm1{grid-column:1;} .b-sm2{grid-column:2;}
        }

        /* GLOW LINE */
        .gline { height:1px; background:linear-gradient(90deg,transparent,rgba(99,102,241,.45) 50%,transparent); }

        /* NAV */
        .nav-s { background:rgba(6,9,18,.95)!important; box-shadow:0 1px 32px rgba(0,0,0,.45); }
        .nav-link { position:relative; color:var(--t2); font-size:13px; font-weight:500; padding:9px 18px; border-radius:100px; text-decoration:none; transition:color .25s; overflow:hidden; }
        .nav-link::before { content:''; position:absolute; inset:0; border-radius:100px; background:linear-gradient(135deg, rgba(99,102,241,.16), rgba(139,92,246,.08)); opacity:0; transition:opacity .25s; z-index:0; }
        .nav-link::after { content:''; position:absolute; bottom:6px; left:50%; transform:translateX(-50%); width:0; height:1.5px; background:linear-gradient(90deg,#60a5fa,#a78bfa); border-radius:2px; transition:width .35s cubic-bezier(.23,1,.32,1); z-index:1; }
        .nav-link span { position:relative; z-index:1; }
        .nav-link:hover { color:var(--t1); }
        .nav-link:hover::before { opacity:1; }
        .nav-link:hover::after { width:20px; }

        /* HERO GRID */
        .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
        @media(max-width:900px) { .hero-grid{grid-template-columns:1fr;} .hero-right{display:none;} }

        /* FEATURE CARD CTA */
        .feat-cta { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600; letter-spacing:.04em; padding:8px 14px; border-radius:100px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04); color:var(--t1); transition:all .25s ease; cursor:pointer; text-decoration:none; }
        .feat-cta:hover { background:rgba(99,102,241,.12); border-color:rgba(99,102,241,.35); transform:translateX(2px); }

        /* MARQUEE */
        .marquee-wrap { overflow:hidden; mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent); -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent); }
        .marquee { display:flex; gap:64px; animation: scroll 35s linear infinite; width:max-content; }
        @keyframes scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .logo-item { color:#94a3b8; flex-shrink:0; transition:color .3s; cursor:default; opacity:.65; }
        .logo-item:hover { color:#eef2ff; opacity:1; }

        /* ADDRESS PILL */
        .addr-pill { display:inline-flex; align-items:center; gap:8px; font-family:var(--FM); font-size:11px; font-weight:500; padding:8px 14px; border-radius:100px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.025); color:#94a3b8; text-decoration:none; transition:all .25s; }
        .addr-pill:hover { border-color:rgba(99,102,241,.35); background:rgba(99,102,241,.06); color:#c7d2fe; }
        .addr-pill .ext-icon { color:#6366f1; }

        /* FOUNDER */
        .quote-mark { font-family: 'Georgia', serif; font-size:140px; line-height:1; color:rgba(99,102,241,.18); position:absolute; top:-18px; left:-8px; user-select:none; }
      `}</style>

      {/* BG LAYERS */}
      <div className="orb o1" style={{ zIndex: 0 }} />
      <div className="orb o2" style={{ zIndex: 0 }} />
      <div className="orb o3" style={{ zIndex: 0 }} />
      <div className="noise" />
      <Particles />

      <main style={{ position: "relative", zIndex: 2, minHeight: "100vh" }}>

        {/* ════════════════ NAV ════════════════ */}
        <nav className={scrolled ? "nav-s" : ""}
          style={{
            position: "sticky", top: 0, zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 40px",
            borderBottom: "1px solid rgba(255,255,255,.05)",
            backdropFilter: "blur(24px)",
            background: "rgba(6,9,18,.6)",
            transition: "background .3s, box-shadow .3s",
          }}>
          <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
            <Logo size={28} />
            <span style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "17px", letterSpacing: "-.02em" }}>Stashify</span>
          </div>
          <nav style={{ display: "flex", gap: "2px" }}>
            <a href="/chat" className="nav-link"><span>Chat</span></a>
            <a href="/pact" className="nav-link"><span>Stash Pact</span></a>
            <a href="/vaults" className="nav-link"><span>Yield Vaults</span></a>
            <a href="#about" className="nav-link"><span>About</span></a>
          </nav>
          <MagBtn className="btn-p" onClick={() => router.push("/chat")} style={{ padding:"10px 22px", fontSize:"13px" }}>
            Open app {Ic.arrow}
          </MagBtn>
        </nav>

        {/* ════════════════ HERO ════════════════ */}
        <section style={{ maxWidth:"1200px", margin:"0 auto", padding:"64px 40px 80px" }}>
          <div className="hero-grid">

            {/* LEFT */}
            <div>
              <div className="h0" style={{ display:"inline-flex", alignItems:"center", gap:"10px", fontSize:"12px", fontWeight:500, color:"#86efac", padding:"7px 16px", borderRadius:"100px", border:"1px solid rgba(74,222,128,.22)", background:"rgba(74,222,128,.06)", marginBottom:"28px" }}>
                <span className="pdot" style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#4ade80", display:"inline-block", position:"relative" }} />
                Live on Base · Powered by AI · Zero fees
              </div>

              <h1 style={{ marginBottom:"24px" }}>
                <div className="h1" style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(52px,6.5vw,88px)", letterSpacing:"-.04em", lineHeight:.96, color:"var(--t1)" }}>
                  Save smarter.
                </div>
                <div className="h2 gt" style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(52px,6.5vw,88px)", letterSpacing:"-.04em", lineHeight:.96 }}>
                  Onchain.
                </div>
              </h1>

              <p className="h3" style={{ color:"var(--t2)", fontSize:"clamp(16px,1.8vw,19px)", lineHeight:1.72, maxWidth:"460px", fontWeight:400, marginBottom:"36px" }}>
                Tell Stashify your goal in plain English. It moves real USDC onchain — no bank, no forms, no friction.
              </p>

              <div className="h4" style={{ display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center", marginBottom:"28px" }}>
                <MagBtn className="btn-p" onClick={() => router.push("/chat")}>Start saving now {Ic.arrow}</MagBtn>
                <a href="#how" className="btn-g">How it works ↓</a>
              </div>

              <div className="h5" style={{ display:"flex", flexWrap:"wrap", gap:"8px", alignItems:"center" }}>
                <a href={baseScan(VAULT_ADDR)} target="_blank" rel="noopener noreferrer" className="addr-pill">
                  <span style={{ color:"#6366f1", fontWeight:600 }}>VAULT</span>
                  <span>0xf475…260C</span>
                  <span className="ext-icon">{Ic.external}</span>
                </a>
                <a href={baseScan(PACT_ADDR)} target="_blank" rel="noopener noreferrer" className="addr-pill">
                  <span style={{ color:"#8b5cf6", fontWeight:600 }}>PACT</span>
                  <span>0xcABc…1d5D</span>
                  <span className="ext-icon">{Ic.external}</span>
                </a>
              </div>
            </div>

            {/* RIGHT — chat card */}
            <div className="hero-right hc" style={{ position:"relative" }}>
              <div style={{ position:"absolute", inset:"-6px", borderRadius:"30px", background:"linear-gradient(135deg,rgba(59,130,246,.35),rgba(139,92,246,.25))", filter:"blur(32px)", opacity:.45, zIndex:-1 }} />
              <div style={{ background:"rgba(10,14,28,.92)", backdropFilter:"blur(40px)", border:"1px solid rgba(255,255,255,.1)", borderRadius:"26px", overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,.7), 0 1px 0 rgba(255,255,255,.07) inset" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,.06)", background:"rgba(255,255,255,.02)" }}>
                  <Logo size={26} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"13px" }}>Stashify</div>
                    <div style={{ fontSize:"11px", color:"#4ade80" }}>● Online · Base Sepolia</div>
                  </div>
                  <div style={{ fontSize:"10px", fontWeight:700, letterSpacing:".06em", color:"#818cf8", background:"rgba(99,102,241,.1)", border:"1px solid rgba(99,102,241,.2)", padding:"4px 10px", borderRadius:"100px" }}>EXAMPLE</div>
                </div>
                <div style={{ padding:"20px", display:"flex", flexDirection:"column", gap:"10px" }}>
                  <div className="cm1" style={{ display:"flex", justifyContent:"flex-end" }}>
                    <div style={{ fontSize:"13px", lineHeight:1.5, padding:"11px 16px", borderRadius:"18px 18px 4px 18px", background:"linear-gradient(135deg,#2563eb,#6366f1)", boxShadow:"0 4px 18px rgba(37,99,235,.3)", maxWidth:"84%" }}>
                      I want to save $50 for new Jordans
                    </div>
                  </div>
                  <div className="cm2" style={{ display:"flex", justifyContent:"flex-start" }}>
                    <div style={{ fontSize:"13px", lineHeight:1.5, padding:"11px 16px", borderRadius:"18px 18px 18px 4px", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.07)", color:"#cbd5e1", maxWidth:"84%" }}>
                      Love that goal. Saving $50 for your Jordans now...
                    </div>
                  </div>
                  <div className="cm3" style={{ display:"flex", justifyContent:"flex-start" }}>
                    <div style={{ fontSize:"13px", lineHeight:1.6, padding:"11px 16px", borderRadius:"18px 18px 18px 4px", background:"rgba(34,197,94,.07)", border:"1px solid rgba(34,197,94,.18)", maxWidth:"92%" }}>
                      <span style={{ color:"#4ade80", fontWeight:700 }}>Done.</span> $50 USDC locked in your Jordans vault.
                      <div style={{ marginTop:"5px", fontSize:"11px", color:"#475569", fontFamily:"var(--FM)" }}>Tx: 0x89f4...3acd · Base Sepolia</div>
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:"10px", padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,.06)" }}>
                  <div style={{ flex:1, fontSize:"13px", color:"#374151", padding:"10px 14px", borderRadius:"12px", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.05)", display:"flex", alignItems:"center" }}>
                    Tell me your savings goal<span className="cur" />
                  </div>
                  <button style={{ width:"36px", height:"36px", borderRadius:"10px", flexShrink:0, background:"linear-gradient(135deg,#2563eb,#6366f1)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(99,102,241,.4)" }}>
                    {Ic.send}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ LOGO MARQUEE — replaces trust pill row ════════════════ */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,.05)", borderBottom:"1px solid rgba(255,255,255,.05)", padding:"32px 0", background:"rgba(255,255,255,.012)" }}>
          <p className="lbl" style={{ textAlign:"center", color:"var(--t2)", marginBottom:"24px" }}>Built on infrastructure you already trust</p>
          <div className="marquee-wrap">
            <div className="marquee">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} style={{ display:"flex", gap:"64px", flexShrink:0, alignItems:"center" }}>
                  <div className="logo-item">{PartnerLogos.base}</div>
                  <div className="logo-item">{PartnerLogos.coinbase}</div>
                  <div className="logo-item">{PartnerLogos.usdc}</div>
                  <div className="logo-item">{PartnerLogos.circle}</div>
                  <div className="logo-item">{PartnerLogos.openai}</div>
                  <div className="logo-item">{PartnerLogos.langchain}</div>
                  <div className="logo-item">{PartnerLogos.nextjs}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════ HOW IT WORKS ════════════════ */}
        <section id="how" style={{ maxWidth:"1100px", margin:"0 auto", padding:"130px 40px" }}>
          <div data-reveal style={{ textAlign:"center", marginBottom:"72px" }}>
            <p className="lbl" style={{ color:"#818cf8", marginBottom:"16px" }}>How it works</p>
            <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(38px,5vw,62px)", letterSpacing:"-.04em", lineHeight:1.02, marginBottom:"18px" }}>
              Three steps. That's<br />the whole thing.
            </h2>
            <p style={{ color:"var(--t2)", fontSize:"18px", maxWidth:"380px", margin:"0 auto", lineHeight:1.65 }}>
              No forms. No setup. No crypto knowledge required.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"14px" }}>
            {[
              { n:"01", icon:Ic.msg,    title:"Just tell Stashify", desc:"Type your goal in plain English. The AI agent understands intent, sets a target, and acknowledges every step.", tag:"As easy as texting a friend", c:"#60a5fa" },
              { n:"02", icon:Ic.zap22,  title:"AI executes onchain", desc:"Stashify moves the exact amount of USDC into your goal vault on Base. Real transactions. Real receipts.", tag:"Real money. Real blockchain.", c:"#a78bfa" },
              { n:"03", icon:Ic.target, title:"Withdraw on demand", desc:"Track every goal in your dashboard. Withdraw anything, anytime. The smart contract is the only custodian.", tag:"You always stay in charge", c:"#34d399" },
            ].map((s) => (
              <TiltCard key={s.n} className="card card-glow" style={{ padding:"34px", position:"relative", overflow:"hidden" }} >
                <span className="snum">{s.n}</span>
                <div style={{ width:"46px", height:"46px", borderRadius:"14px", background:`${s.c}15`, border:`1px solid ${s.c}25`, display:"flex", alignItems:"center", justifyContent:"center", color:s.c, marginBottom:"24px" }}>{s.icon}</div>
                <h3 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"19px", letterSpacing:"-.02em", marginBottom:"12px" }}>{s.title}</h3>
                <p style={{ color:"var(--t2)", fontSize:"14px", lineHeight:1.75, marginBottom:"20px" }}>{s.desc}</p>
                <span style={{ fontSize:"11px", fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", color:s.c, opacity:.75 }}>{s.tag}</span>
              </TiltCard>
            ))}
          </div>
        </section>

        <div className="gline" style={{ maxWidth:"520px", margin:"0 auto" }} />

        {/* ════════════════ WHAT YOU GET — replaces fake testimonials + zero-stat counter ════════════════ */}
        <section id="why" style={{ padding:"130px 40px", background:"rgba(255,255,255,.012)", borderTop:"1px solid rgba(255,255,255,.04)", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <div data-reveal style={{ textAlign:"center", marginBottom:"60px" }}>
              <p className="lbl" style={{ color:"#c084fc", marginBottom:"16px" }}>What you get</p>
              <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(38px,5vw,62px)", letterSpacing:"-.04em", lineHeight:1.02 }}>
                More than a savings app.<br />A whole onchain stack.
              </h2>
            </div>

            <div className="bento" data-reveal>

              {/* B-LG — Stash Pact (flagship, big) */}
              <TiltCard className="card card-glow b-lg" style={{ padding:"44px", minHeight:"260px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", cursor:"pointer" }} onClick={() => router.push("/pact")}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"24px" }}>
                  <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:"rgba(139,92,246,.1)", border:"1px solid rgba(139,92,246,.25)", display:"flex", alignItems:"center", justifyContent:"center", color:"#c084fc" }}>{Ic.handshake}</div>
                  <span style={{ fontSize:"10px", fontWeight:700, letterSpacing:".1em", color:"#c084fc", background:"rgba(139,92,246,.1)", border:"1px solid rgba(139,92,246,.2)", padding:"5px 12px", borderRadius:"100px" }}>FLAGSHIP</span>
                </div>
                <div>
                  <h3 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"26px", letterSpacing:"-.03em", marginBottom:"10px" }}>Stash Pact</h3>
                  <p style={{ color:"var(--t2)", fontSize:"15px", lineHeight:1.7, maxWidth:"480px", marginBottom:"22px" }}>Save with someone you trust. The smart contract holds both parties' funds until both hit target — commitment, enforced by code.</p>
                  <span className="feat-cta">Explore Stash Pact {Ic.arrow}</span>
                </div>
              </TiltCard>

              {/* B-TL — Yield Vaults (tall, hero APY) */}
              <TiltCard className="card card-glow b-tl" style={{ padding:"36px", display:"flex", flexDirection:"column", justifyContent:"space-between", background:"linear-gradient(160deg,rgba(74,222,128,.06),rgba(34,197,94,.02))", borderColor:"rgba(74,222,128,.18)", cursor:"pointer" }} onClick={() => router.push("/vaults")}>
                <div>
                  <div style={{ width:"46px", height:"46px", borderRadius:"14px", background:"rgba(74,222,128,.1)", border:"1px solid rgba(74,222,128,.25)", display:"flex", alignItems:"center", justifyContent:"center", color:"#4ade80", marginBottom:"22px" }}>{Ic.trendUp}</div>
                  <h3 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"22px", letterSpacing:"-.02em", marginBottom:"10px" }}>Yield Vaults</h3>
                  <p style={{ color:"var(--t2)", fontSize:"14px", lineHeight:1.7, marginBottom:"20px" }}>Move your savings into vetted yield vaults on Base — Coinbase, Moonwell, Morpho.</p>
                </div>
                <div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:"4px", marginBottom:"22px" }}>
                    <span style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"56px", letterSpacing:"-.04em", color:"#4ade80", lineHeight:1, fontFeatureSettings:"'tnum'" }}>10.8</span>
                    <span style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"22px", color:"#4ade80" }}>%</span>
                    <span style={{ fontSize:"11px", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"var(--t2)", marginLeft:"6px" }}>APY</span>
                  </div>
                  <span className="feat-cta">Browse vaults {Ic.arrow}</span>
                </div>
              </TiltCard>

              {/* B-SM1 — AI Chat */}
              <TiltCard className="card card-glow b-sm1" style={{ padding:"32px", cursor:"pointer" }} onClick={() => router.push("/chat")}>
                <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:"rgba(96,165,250,.08)", border:"1px solid rgba(96,165,250,.18)", display:"flex", alignItems:"center", justifyContent:"center", color:"#60a5fa", marginBottom:"18px" }}>{Ic.spark}</div>
                <h3 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"17px", letterSpacing:"-.02em", marginBottom:"8px" }}>AI Agent</h3>
                <p style={{ color:"var(--t2)", fontSize:"13px", lineHeight:1.75, marginBottom:"14px" }}>Natural language. Real onchain execution. Powered by Coinbase AgentKit.</p>
                <span className="feat-cta" style={{ fontSize:"11px", padding:"6px 12px" }}>Open chat {Ic.arrow}</span>
              </TiltCard>

              {/* B-SM2 — Smart Vault */}
              <TiltCard className="card card-glow b-sm2" style={{ padding:"32px" }}>
                <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:"rgba(99,102,241,.08)", border:"1px solid rgba(99,102,241,.18)", display:"flex", alignItems:"center", justifyContent:"center", color:"#818cf8", marginBottom:"18px" }}>{Ic.lock}</div>
                <h3 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"17px", letterSpacing:"-.02em", marginBottom:"8px" }}>Non-custodial vault</h3>
                <p style={{ color:"var(--t2)", fontSize:"13px", lineHeight:1.75, marginBottom:"14px" }}>Funds live in a smart contract. Not our servers, not our keys.</p>
                <a href={baseScan(VAULT_ADDR)} target="_blank" rel="noopener noreferrer" className="feat-cta" style={{ fontSize:"11px", padding:"6px 12px" }} onClick={(e) => e.stopPropagation()}>
                  View contract {Ic.external}
                </a>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ════════════════ FOUNDER STATEMENT — anonymous build note ════════════════ */}
        <section id="about" style={{ padding:"130px 40px" }}>
          <div data-reveal style={{ maxWidth:"880px", margin:"0 auto", borderRadius:"28px", padding:"68px 56px", position:"relative", overflow:"hidden", background:"linear-gradient(180deg, rgba(99,102,241,.04), rgba(139,92,246,.02))", border:"1px solid rgba(99,102,241,.14)" }}>
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", background: "radial-gradient(800px circle at 20% 0%, rgba(99,102,241,.1), transparent 50%), radial-gradient(700px circle at 80% 100%, rgba(139,92,246,.08), transparent 50%)" }} />
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(99,102,241,.5) 50%,transparent)" }} />

            <div style={{ position:"relative" }}>
              <p className="lbl" style={{ color:"#818cf8", marginBottom:"24px" }}>The build</p>

              <div style={{ position:"relative" }}>
                <span className="quote-mark">&ldquo;</span>
                <p style={{ fontFamily:"var(--FD)", fontWeight:500, fontSize:"clamp(22px,2.4vw,30px)", letterSpacing:"-.02em", lineHeight:1.4, color:"#eef2ff", marginBottom:"36px", position:"relative", zIndex:1 }}>
                  Saving was always the boring step between earning and spending. So I built the version I actually wanted to use — one that talks back, moves real money, and never holds it hostage.
                </p>
              </div>

              <div style={{ display:"flex", flexWrap:"wrap", gap:"24px", alignItems:"center", paddingTop:"28px", borderTop:"1px solid rgba(99,102,241,.12)" }}>
                <div>
                  <p className="lbl" style={{ color:"var(--t3)", marginBottom:"6px" }}>Built for</p>
                  <p style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"15px", letterSpacing:"-.01em", color:"var(--t1)" }}>Base Batches 003</p>
                </div>
                <div style={{ width:"1px", height:"36px", background:"rgba(255,255,255,.08)" }} />
                <div>
                  <p className="lbl" style={{ color:"var(--t3)", marginBottom:"6px" }}>Track</p>
                  <p style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"15px", letterSpacing:"-.01em", color:"var(--t1)" }}>Student</p>
                </div>
                <div style={{ width:"1px", height:"36px", background:"rgba(255,255,255,.08)" }} />
                <div>
                  <p className="lbl" style={{ color:"var(--t3)", marginBottom:"6px" }}>Network</p>
                  <p style={{ fontFamily:"var(--FM)", fontWeight:600, fontSize:"14px", color:"var(--t1)" }}>Base Sepolia</p>
                </div>
                <div style={{ width:"1px", height:"36px", background:"rgba(255,255,255,.08)" }} />
                <div>
                  <p className="lbl" style={{ color:"var(--t3)", marginBottom:"6px" }}>Contracts</p>
                  <div style={{ display:"flex", gap:"6px" }}>
                    <a href={baseScan(VAULT_ADDR)} target="_blank" rel="noopener noreferrer" className="addr-pill" style={{ padding:"4px 10px", fontSize:"10px" }}>
                      Vault {Ic.external}
                    </a>
                    <a href={baseScan(PACT_ADDR)} target="_blank" rel="noopener noreferrer" className="addr-pill" style={{ padding:"4px 10px", fontSize:"10px" }}>
                      Pact {Ic.external}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ FAQ ════════════════ */}
        <section id="faq" style={{ maxWidth:"660px", margin:"0 auto", padding:"0 24px 130px" }}>
          <div data-reveal style={{ textAlign:"center", marginBottom:"52px" }}>
            <p className="lbl" style={{ color:"#818cf8", marginBottom:"16px" }}>FAQ</p>
            <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(34px,4.5vw,50px)", letterSpacing:"-.04em" }}>Questions? Answered.</h2>
          </div>
          <FAQSection />
        </section>

        {/* ════════════════ FINAL CTA ════════════════ */}
        <section style={{ padding:"0 40px 130px" }}>
          <div data-reveal style={{ maxWidth:"860px", margin:"0 auto", borderRadius:"28px", padding:"80px 48px", textAlign:"center", position:"relative", overflow:"hidden", background:"linear-gradient(160deg,rgba(59,130,246,.1),rgba(139,92,246,.08))", border:"1px solid rgba(99,102,241,.2)" }}>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 50% at 50% 0%,rgba(99,102,241,.15),transparent)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(99,102,241,.7) 50%,transparent)" }} />
            <div style={{ position:"relative" }}>
              <Logo size={52} />
              <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(34px,4.5vw,52px)", letterSpacing:"-.04em", lineHeight:1.05, marginTop:"28px", marginBottom:"16px" }}>
                Your first goal is<br />one message away.
              </h2>
              <p style={{ color:"var(--t2)", fontSize:"18px", marginBottom:"36px", fontWeight:300 }}>Open Stashify. Start saving onchain in 30 seconds.</p>
              <MagBtn className="btn-p" style={{ fontSize:"16px", padding:"16px 44px" }} onClick={() => router.push("/chat")}>
                Open Stashify {Ic.arrow}
              </MagBtn>
              <p style={{ color:"var(--t3)", fontSize:"12px", marginTop:"18px" }}>Free forever · No credit card · No crypto knowledge needed</p>
            </div>
          </div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer style={{ borderTop:"1px solid rgba(255,255,255,.08)", padding:"36px 40px", background:"rgba(255,255,255,.015)" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <Logo size={22} />
              <span style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "14px", color: "#eef2ff" }}>Stashify</span>
            </div>
            <div style={{ display:"flex", gap:"20px", flexWrap:"wrap", alignItems:"center" }}>
              <a href={baseScan(VAULT_ADDR)} target="_blank" rel="noopener noreferrer" style={{ color:"#6b7280", fontSize:"12px", fontWeight:500, textDecoration:"none", transition:"color .2s", display:"inline-flex", alignItems:"center", gap:"6px" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="#eef2ff"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="#6b7280"}>
                Vault contract {Ic.external}
              </a>
              <a href={baseScan(PACT_ADDR)} target="_blank" rel="noopener noreferrer" style={{ color:"#6b7280", fontSize:"12px", fontWeight:500, textDecoration:"none", transition:"color .2s", display:"inline-flex", alignItems:"center", gap:"6px" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="#eef2ff"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="#6b7280"}>
                Pact contract {Ic.external}
              </a>
              <span style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#60a5fa", display:"inline-block", opacity:0.8 }} />
                <span style={{ color:"#6b7280", fontSize:"12px", fontWeight:500 }}>Built on Base</span>
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#a78bfa", display:"inline-block", opacity:0.8 }} />
                <span style={{ color:"#6b7280", fontSize:"12px", fontWeight:500 }}>Base Batches 003</span>
              </span>
            </div>
            <span style={{ color:"#4b5563", fontSize:"12px" }}>© 2026 Stashify</span>
          </div>
        </footer>
      </main>
    </>
  );
}