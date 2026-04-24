"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

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
  shield: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  zap: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  globe: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  lock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  phone: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  dollar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  globe20: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  msg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  zap22: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  target: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  trendUp: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
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

/* ─────────────── COUNTER ─────────────── */
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
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
          const p = Math.min((ts - s) / 1600, 1);
          setN(Math.floor((1 - Math.pow(1 - p, 4)) * to));
          if (p < 1) requestAnimationFrame(step); else setN(to);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
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
function TiltCard({ children, style = {}, className = "" }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)"; };
  return (
    <div ref={ref} className={className} style={{ ...style, transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)", transformStyle: "preserve-3d" }}
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
      a: "Yes. Your funds are held in an audited smart contract on Base blockchain — not on our servers. We never have custody of your money. You can withdraw at any time, and only you control your vault.",
    },
    {
      q: "What currency does Stashify use?",
      a: "Stashify uses USDC — a dollar-pegged stablecoin issued by Circle and Coinbase. $1 USDC = $1 USD, always. No volatility, no crypto price risk. Your savings stay stable.",
    },
    {
      q: "Are there any fees?",
      a: "Stashify charges zero platform fees. The only cost is a tiny blockchain gas fee paid to the Base network — usually less than one cent per transaction.",
    },
    {
      q: "Do I need a crypto wallet to use Stashify?",
      a: "No separate wallet setup needed. Stashify uses Coinbase's CDP wallet infrastructure to create and manage a wallet for you automatically — completely invisible to you.",
    },
    {
      q: "Can I withdraw my savings at any time?",
      a: "Yes, always. Your savings are never locked (unless you create a Stash Pact with a partner). From your regular savings vault, you can withdraw any amount at any time with no penalty.",
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
            {/* Question row */}
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

            {/* Answer — animated */}
            <div style={{
              maxHeight: isOpen ? "200px" : "0",
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
}/* ─────────────── MAIN ─────────────── */
export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #060912;
          --sur: rgba(255,255,255,0.035);
          --bor: rgba(255,255,255,0.07);
          --bor2: rgba(99,102,241,0.28);
          --t1: #eef2ff; --t2: #6b7280; --t3: #1f2937;
          --blue: #3b82f6; --ind: #6366f1; --vio: #8b5cf6;
          --grad: linear-gradient(135deg, #3b82f6, #8b5cf6);
          --FD: 'Cabinet Grotesk', sans-serif;
          --FB: 'Instrument Sans', sans-serif;
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

        /* HERO SEQUENCE — staggered, starts fast */
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
        .card { background:var(--sur); border:1px solid var(--bor); border-radius:22px; transition:border-color .3s, box-shadow .3s; }
        .card:hover { border-color:rgba(99,102,241,.24); box-shadow:0 0 36px rgba(99,102,241,.06), 0 16px 48px rgba(0,0,0,.28); }

        /* STEP NUM */
        .snum { font-family:var(--FD); font-size:110px; font-weight:900; line-height:1; color:transparent; -webkit-text-stroke:1px rgba(99,102,241,.08); position:absolute; top:-16px; right:-8px; pointer-events:none; user-select:none; transition:-webkit-text-stroke-color .3s; }
        .card:hover .snum { -webkit-text-stroke-color:rgba(99,102,241,.2); }

        /* TRUST PILL */
        .tpill { display:inline-flex; align-items:center; gap:7px; font-size:12px; font-weight:500; padding:7px 14px; border-radius:100px; border:1px solid var(--bor); color:var(--t2); transition:all .2s; cursor:default; }
        .tpill:hover { color:var(--t1); border-color:rgba(255,255,255,.13); background:rgba(255,255,255,.03); }

        /* LABEL */
        .lbl { font-family:var(--FB); font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; }

        /* TESTIMONIAL LEFT BAR */
        .tcard { position:relative; overflow:hidden; }
        .tcard::before { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:var(--grad); border-radius:2px; }

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

        /* NAV SCROLLED */
        .nav-s { background:rgba(6,9,18,.95)!important; box-shadow:0 1px 32px rgba(0,0,0,.45); }

        /* HERO GRID */
        .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
        @media(max-width:900px) { .hero-grid{grid-template-columns:1fr;} .hero-right{display:none;} }

        /* STAT GRID */
        .stat-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        @media(max-width:640px){ .stat-grid{grid-template-columns:repeat(2,1fr);} }

        /* SOCIAL PROOF ROW */
        .sp-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
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
            {[["How it works","#how"],["Why Stashify","#why"],["FAQ","#faq"]].map(([l,h]) => (
  <a key={h} href={h} style={{
    color:"var(--t2)", fontSize:"14px", fontWeight:500,
    padding:"8px 18px", borderRadius:"100px", textDecoration:"none",
    border:"1px solid rgba(255,255,255,0.09)",
    background:"rgba(255,255,255,0.04)",
    transition:"color .2s, background .2s, border-color .2s",
  }}
    onMouseEnter={e=>{
      (e.currentTarget as HTMLElement).style.color="var(--t1)";
      (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.08)";
      (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.16)";
    }}
    onMouseLeave={e=>{
      (e.currentTarget as HTMLElement).style.color="var(--t2)";
      (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.04)";
      (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.09)";
    }}>{l}</a>
            ))}
          </nav>
          <MagBtn className="btn-p" onClick={() => router.push("/chat")} style={{ padding:"10px 22px", fontSize:"13px" }}>
            Open app {Ic.arrow}
          </MagBtn>
        </nav>

        {/* ════════════════ HERO ════════════════ */}
        <section style={{ maxWidth:"1200px", margin:"0 auto", padding:"64px 40px 80px" }}>
          <div className="hero-grid">

            {/* LEFT — copy */}
            <div>
              {/* Live badge */}
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

              <p className="h3" style={{ color:"var(--t2)", fontSize:"clamp(16px,1.8vw,19px)", lineHeight:1.72, maxWidth:"420px", fontWeight:400, marginBottom:"36px" }}>
                Tell Stashify your goal in plain English. It moves real USDC onchain — no bank, no forms, no friction.
              </p>

              {/* CTAs */}
              <div className="h4" style={{ display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center", marginBottom:"32px" }}>
                <MagBtn className="btn-p" onClick={() => router.push("/chat")}>Start saving now {Ic.arrow}</MagBtn>
                <a href="#how" className="btn-g">How it works ↓</a>
              </div>

              {/* Social proof */}
              <div className="h5 sp-row">
                <div style={{ display:"flex" }}>
                  {["#3b82f6","#8b5cf6","#10b981","#f59e0b"].map((c,i) => (
                    <div key={i} style={{ width:"28px", height:"28px", borderRadius:"50%", background:c, border:"2px solid var(--bg)", marginLeft: i===0?"0":"-8px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:700, color:"white" }}>
                      {["A","J","P","R"][i]}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize:"13px", color:"var(--t2)" }}>
                  <strong style={{ color:"var(--t1)" }}>2,400+ students</strong> saving onchain
                </span>
                <span style={{ display:"flex", gap:"2px" }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color:"#fbbf24", fontSize:"12px" }}>★</span>)}
                </span>
              </div>

              {/* Trust micro-line */}
              <p className="h5" style={{ color:"var(--t3)", fontSize:"12px", marginTop:"14px" }}>
                No wallet setup · Any device · Always free
              </p>
            </div>

            {/* RIGHT — chat card */}
            <div className="hero-right hc" style={{ position:"relative" }}>
              {/* glow */}
              <div style={{ position:"absolute", inset:"-6px", borderRadius:"30px", background:"linear-gradient(135deg,rgba(59,130,246,.35),rgba(139,92,246,.25))", filter:"blur(32px)", opacity:.45, zIndex:-1 }} />
              <div style={{ background:"rgba(10,14,28,.92)", backdropFilter:"blur(40px)", border:"1px solid rgba(255,255,255,.1)", borderRadius:"26px", overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,.7), 0 1px 0 rgba(255,255,255,.07) inset" }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,.06)", background:"rgba(255,255,255,.02)" }}>
                  <Logo size={26} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"13px" }}>Stashify</div>
                    <div style={{ fontSize:"11px", color:"#4ade80" }}>● Online · Base Sepolia</div>
                  </div>
                  <div style={{ fontSize:"10px", fontWeight:700, letterSpacing:".06em", color:"#818cf8", background:"rgba(99,102,241,.1)", border:"1px solid rgba(99,102,241,.2)", padding:"4px 10px", borderRadius:"100px" }}>LIVE</div>
                </div>
                {/* Messages */}
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
                      <div style={{ marginTop:"5px", fontSize:"11px", color:"#475569", fontFamily:"monospace" }}>Tx: 0x89f4...3acd · Base Sepolia</div>
                    </div>
                  </div>
                </div>
                {/* Input */}
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

        {/* ════════════════ TRUST BAR ════════════════ */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,.05)", borderBottom:"1px solid rgba(255,255,255,.05)", padding:"18px 40px", background:"rgba(255,255,255,.015)" }}>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"10px" }}>
            {[
              { icon:Ic.zap,    label:"Built on Base",             c:"#60a5fa" },
              { icon:Ic.shield, label:"Smart contract secured",    c:"#a78bfa" },
              { icon:Ic.globe,  label:"Instant transactions",      c:"#fbbf24" },
              { icon:Ic.trendUp,label:"USDC powered",              c:"#4ade80" },
              { icon:Ic.globe,  label:"Available worldwide",       c:"#fb923c" },
            ].map(t => (
              <div key={t.label} className="tpill" style={{ color:t.c }}>
                {t.icon}
                <span style={{ color:"var(--t2)" }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ HOW IT WORKS ════════════════ */}
        <section id="how" style={{ maxWidth:"1100px", margin:"0 auto", padding:"130px 40px" }}>
          <div data-reveal style={{ textAlign:"center", marginBottom:"72px" }}>
            <p className="lbl" style={{ color:"#818cf8", marginBottom:"16px" }}>How it works</p>
            <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(38px,5vw,62px)", letterSpacing:"-.04em", lineHeight:1.02, marginBottom:"18px" }}>
              Saving has never been<br />this effortless
            </h2>
            <p style={{ color:"var(--t2)", fontSize:"18px", maxWidth:"340px", margin:"0 auto", lineHeight:1.65 }}>
              Three steps between you and your goal.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"14px" }}>
            {[
              { n:"01", icon:Ic.msg,    title:"Just tell Stashify", desc:"Type your goal in plain English. No forms, no dropdowns, no confusing menus. Just talk.", tag:"As easy as texting a friend", c:"#60a5fa" },
              { n:"02", icon:Ic.zap22,  title:"AI acts instantly",  desc:"Stashify understands your intent and moves the exact amount of USDC into your goal vault onchain.", tag:"Real money. Real blockchain.", c:"#a78bfa" },
              { n:"03", icon:Ic.target, title:"Watch it grow",       desc:"Track every goal visually. Withdraw whenever you want. Your money never leaves your control.", tag:"You always stay in charge", c:"#34d399" },
            ].map((s, i) => (
              <TiltCard key={s.n} className="card" style={{ padding:"34px", position:"relative", overflow:"hidden" }} data-reveal data-delay={String(i*120)}>
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

        {/* ════════════════ WHY STASHIFY ════════════════ */}
        <section id="why" style={{ padding:"130px 40px", background:"rgba(255,255,255,.012)", borderTop:"1px solid rgba(255,255,255,.04)", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <div data-reveal style={{ textAlign:"center", marginBottom:"60px" }}>
              <p className="lbl" style={{ color:"#c084fc", marginBottom:"16px" }}>Why Stashify</p>
              <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(38px,5vw,62px)", letterSpacing:"-.04em", lineHeight:1.02 }}>
                Built for students.<br />By a student.
              </h2>
            </div>
            <div className="bento" data-reveal>
              {/* Large card */}
              <TiltCard className="card b-lg" style={{ padding:"44px", minHeight:"200px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative" }}>
                <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:"rgba(251,191,36,.1)", border:"1px solid rgba(251,191,36,.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fbbf24", marginBottom:"24px" }}>{Ic.dollar}</div>
                <div>
                  <h3 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"24px", letterSpacing:"-.03em", marginBottom:"10px" }}>No minimum deposit</h3>
                  <p style={{ color:"var(--t2)", fontSize:"15px", lineHeight:1.7, maxWidth:"360px" }}>Save $1 or $1,000. There is no barrier to entry. Every dollar counts.</p>
                </div>
                <div style={{ position:"absolute", right:"32px", top:"50%", transform:"translateY(-50%)", opacity:.05 }}>
                  <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth=".8"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H9m0 3h6"/></svg>
                </div>
              </TiltCard>
              {/* Tall card */}
              <TiltCard className="card b-tl" style={{ padding:"36px", display:"flex", flexDirection:"column", justifyContent:"space-between", background:"linear-gradient(160deg,rgba(99,102,241,.07),rgba(124,58,237,.04))", borderColor:"rgba(99,102,241,.15)" }}>
                <div style={{ width:"46px", height:"46px", borderRadius:"14px", background:"rgba(99,102,241,.12)", border:"1px solid rgba(99,102,241,.25)", display:"flex", alignItems:"center", justifyContent:"center", color:"#818cf8" }}>{Ic.lock}</div>
                <div style={{ marginTop:"auto" }}>
                  <h3 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"20px", letterSpacing:"-.02em", marginBottom:"12px" }}>Your money is always yours</h3>
                  <p style={{ color:"var(--t2)", fontSize:"14px", lineHeight:1.7, marginBottom:"24px" }}>Funds sit in a smart contract vault on Base — not our servers. Not our keys. Not our coins.</p>
                  <div style={{ background:"rgba(0,0,0,.3)", borderRadius:"10px", padding:"14px 16px", border:"1px solid rgba(255,255,255,.06)", fontFamily:"monospace", fontSize:"11px", color:"#475569", lineHeight:1.9 }}>
                    <span style={{ color:"#818cf8" }}>contract</span> <span style={{ color:"#60a5fa" }}>SavingsVault</span> {"{"}<br/>
                    {"  "}<span style={{ color:"#4ade80" }}>mapping</span>(address {"=>"} Goal) vaults;<br/>
                    {"  "}<span style={{ color:"#fbbf24" }}>// Only you can withdraw</span><br/>
                    {"}"}
                  </div>
                </div>
              </TiltCard>
              {/* Small cards */}
              {[
                { icon:Ic.phone,  title:"No bank needed",  desc:"Just a phone. Wallets, keys, blockchain — all invisible.", c:"#4ade80", bg:"rgba(74,222,128,.08)",  bd:"rgba(74,222,128,.18)",  cls:"b-sm1" },
                { icon:Ic.globe20,title:"Works worldwide", desc:"Singapore, Nigeria, Brazil, India — instantly.", c:"#fb923c", bg:"rgba(251,146,60,.08)", bd:"rgba(251,146,60,.18)", cls:"b-sm2" },
              ].map(item => (
                <TiltCard key={item.title} className={`card ${item.cls}`} style={{ padding:"32px" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:item.bg, border:`1px solid ${item.bd}`, display:"flex", alignItems:"center", justifyContent:"center", color:item.c, marginBottom:"18px" }}>{item.icon}</div>
                  <h3 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"17px", letterSpacing:"-.02em", marginBottom:"8px" }}>{item.title}</h3>
                  <p style={{ color:"var(--t2)", fontSize:"13px", lineHeight:1.75 }}>{item.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ STATS ════════════════ */}
        <section style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div className="stat-grid" data-reveal>
            {[
              { val:2400, suf:"+",  lbl:"Students saving",   c:"#60a5fa", pre:"" },
              { val:147,  suf:"K",  lbl:"Saved onchain",     c:"#a78bfa", pre:"$" },
              { val:100,  suf:"%",  lbl:"Non-custodial",     c:"#4ade80", pre:"" },
              { val:0,    suf:"",   lbl:"Platform fees",     c:"#fbbf24", pre:"", custom:"Zero" },
            ].map((s,i) => (
              <div key={s.lbl} data-reveal data-delay={String(i*100)}
                style={{ padding:"44px 28px", textAlign:"center", borderRight:i<3?"1px solid rgba(255,255,255,.05)":"none", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
                <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(38px,4vw,54px)", letterSpacing:"-.04em", background:`linear-gradient(135deg,${s.c},${s.c}80)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:"8px" }}>
                  {s.custom ?? <Counter to={s.val} prefix={s.pre} suffix={s.suf} />}
                </div>
                <p style={{ color:"var(--t2)", fontSize:"13px", fontWeight:500 }}>{s.lbl}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════ TESTIMONIALS ════════════════ */}
        <section style={{ borderTop:"1px solid rgba(255,255,255,.04)", padding:"80px 40px 130px" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <div data-reveal style={{ textAlign:"center", marginBottom:"56px" }}>
              <p className="lbl" style={{ color:"#4ade80", marginBottom:"16px" }}>Early users</p>
              <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(36px,4.5vw,52px)", letterSpacing:"-.04em" }}>
                Students already saving smarter
              </h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"14px" }}>
              {[
                { q:"I saved up for my new laptop in 6 weeks without even thinking about it. I just told Stashify my goal and it handled everything.", n:"Aisha M.", s:"NUS, Singapore", v:"$800" },
                { q:"I have tried every savings app. None of them actually move money for me. Stashify is the first one that actually does what it says.", n:"James K.", s:"UCT, South Africa", v:"$240" },
                { q:"The fact that it is on blockchain means I trust it more than my actual bank. My money is mine and I can see it on-chain anytime.", n:"Priya R.", s:"IIT Delhi, India", v:"$1,200" },
              ].map((t,i) => (
                <div key={t.n} className="card tcard" data-reveal data-delay={String(i*110)} style={{ padding:"28px 28px 28px 32px" }}>
                  <p style={{ color:"#94a3b8", fontSize:"14px", lineHeight:1.85, marginBottom:"24px", fontStyle:"italic", fontWeight:300 }}>"{t.q}"</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div>
                      <p style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"14px", marginBottom:"2px" }}>{t.n}</p>
                      <p style={{ color:"var(--t2)", fontSize:"12px" }}>{t.s}</p>
                    </div>
                    <span style={{ fontSize:"12px", fontWeight:700, color:"#4ade80", background:"rgba(74,222,128,.08)", border:"1px solid rgba(74,222,128,.18)", padding:"5px 12px", borderRadius:"100px" }}>Saved {t.v}</span>
                  </div>
                </div>
              ))}
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
              <p style={{ color:"var(--t2)", fontSize:"18px", marginBottom:"36px", fontWeight:300 }}>Join students saving smarter with Stashify.</p>
              <MagBtn className="btn-p" style={{ fontSize:"16px", padding:"16px 44px" }} onClick={() => router.push("/chat")}>
                Start saving now {Ic.arrow}
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
              <span style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"14px", color:"#eef2ff" }}>Stashify</span>
            </div>
            <div style={{ display:"flex", gap:"20px", flexWrap:"wrap" }}>
              {[
                { label:"Built on Base", color:"#60a5fa" },
                { label:"Smart contract secured", color:"#a78bfa" },
                { label:"Made in Singapore", color:"#4ade80" },
              ].map(item => (
                <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                  <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:item.color, display:"inline-block", opacity:0.8 }} />
                  <span style={{ color:"#6b7280", fontSize:"12px", fontWeight:500 }}>{item.label}</span>
                </div>
              ))}
            </div>
            <span style={{ color:"#4b5563", fontSize:"12px" }}>© 2026 Stashify</span>
          </div>
        </footer>
      </main>
    </>
  );
}