"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPublicClient, http, parseAbi } from "viem";
import { baseSepolia } from "viem/chains";

/* ─────────────── LOGO ─────────────── */
const Logo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="lg_chat" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style={{ stopColor:"#3b82f6" }}/><stop offset="100%" style={{ stopColor:"#8b5cf6" }}/>
    </linearGradient></defs>
    <rect width="200" height="200" rx="44" fill="url(#lg_chat)"/>
    <rect x="35" y="122" width="130" height="58" rx="9" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
    <rect x="35" y="148" width="130" height="8" fill="rgba(255,255,255,0.10)"/>
    <rect x="30" y="92" width="140" height="38" rx="9" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
    <text x="100" y="120" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="700" fill="rgba(255,255,255,0.95)">S</text>
    <rect x="88" y="126" width="24" height="14" rx="4" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2"/>
    <circle cx="100" cy="133" r="4" fill="rgba(255,255,255,0.9)"/><circle cx="100" cy="133" r="2" fill="#3b82f6"/>
    <circle cx="100" cy="79" r="11" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="100" y="84" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#92400e">$</text>
    <line x1="100" y1="52" x2="100" y2="66" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M93 60L100 68L107 60" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="45" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)"/>
    <rect x="137" y="176" width="18" height="8" rx="4" fill="rgba(255,255,255,0.22)"/>
  </svg>
);

/* ─────────────── ICONS ─────────────── */
const Ic = {
  chat:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  dash:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  pact:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  vault: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  send:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  close: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ext:   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  copy:  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  target:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  spark: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6z"/><path d="M19 17l1 2.5L22 20l-2 1-1 2-1-2-2-1 2-.5z"/></svg>,
  jordan:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18h20l-2-7-3 2-2-4-3 3-2-2-3 4-2-1-3 5z"/></svg>,
  plane: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>,
  laptop:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  gift:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
  trendUp: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  flame: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  arrowDown: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  arrowUp: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
};

/* ─────────────── TYPES ─────────────── */
type Msg = {
  id: string; role: "user"|"assistant"; content: string;
  type?: "tx"|"normal"; txHash?: string; goalName?: string;
  amount?: number; timestamp: number;
};
type Goal = { name: string; saved: number; target: number; };
type Activity = { id: string; type: "deposit"|"withdraw"; goalName: string; amount: number; txHash: string; timestamp: number; };

/* ─────────────── ONCHAIN ─────────────── */
const VAULT_ADDRESS = "0xf475cEB6460dD0F004b27095aFB4C8CFc9B0260C" as const;
const WALLET_ADDRESS = "0xb1525777685076921fA1E1f8741d3Bee438594bD" as const;
const vaultAbi = parseAbi([
  "function getGoals() view returns (string[])",
  "function getBalance(string goalName) view returns (uint256)",
]);
const viemClient = createPublicClient({ chain: baseSepolia, transport: http() });

/* ─────────────── UTILS ─────────────── */
function cleanMsg(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/`{1,3}(.*?)`{1,3}/g, "$1")
    .trim();
}

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  return `${Math.floor(s/86400)}d ago`;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* ─────────────── ONCHAIN FETCH ─────────────── */
async function fetchOnchainGoals(): Promise<Goal[]> {
  try {
    const names = await viemClient.readContract({
      address: VAULT_ADDRESS, abi: vaultAbi,
      functionName: "getGoals", account: WALLET_ADDRESS,
    }) as string[];
    if (!names.length) return [];
    return await Promise.all(names.map(async name => {
      const bal = await viemClient.readContract({
        address: VAULT_ADDRESS, abi: vaultAbi,
        functionName: "getBalance", args: [name], account: WALLET_ADDRESS,
      }) as bigint;
      const saved = Number(bal) / 1_000_000;
      return { name, saved, target: Math.max(saved * 2, saved + 50) };
    }));
  } catch { return []; }
}

/* ─────────────── COUNT-UP NUMBER ─────────────── */
function CountUp({ value, prefix = "", decimals = 2, duration = 1400 }: { value: number; prefix?: string; decimals?: number; duration?: number }) {
  const [n, setN] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    let start: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = from + (to - from) * eased;
      setN(next);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span>{prefix}{n.toFixed(decimals)}</span>;
}

/* ─────────────── CONFETTI ─────────────── */
function Confetti({ active }: { active: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    const c = canvas.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    c.width = window.innerWidth; c.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
      y: window.innerHeight * 0.6,
      vx: (Math.random() - 0.5) * 8,
      vy: -(Math.random() * 12 + 4),
      r: Math.random() * 5 + 2,
      color: ["#4ade80","#60a5fa","#a78bfa","#fbbf24","#f472b6"][Math.floor(Math.random()*5)],
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 8,
      alpha: 1,
    }));
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.3;
        p.rot += p.rotV; p.alpha -= 0.012;
        if (p.alpha > 0) { alive = true; }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y); ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r * 2);
        ctx.restore();
      });
      if (alive) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, c.width, c.height);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [active]);
  if (!active) return null;
  return <canvas ref={canvas} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:999 }} />;
}

/* ─────────────── PROGRESS ARC ─────────────── */
function Arc({ pct, color, size = 80, strokeWidth = 5 }: { pct: number; color: string; size?: number; strokeWidth?: number }) {
  const r = (size - strokeWidth - 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 1));
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={strokeWidth}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(.23,1,.32,1)", filter:`drop-shadow(0 0 6px ${color}66)` }}/>
    </svg>
  );
}

/* ─────────────── SPARKLINE ─────────────── */
function Sparkline({ data, color, width = 80, height = 22 }: { data: number[]; color: string; width?: number; height?: number }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`).join(" ");
  const gradId = `spark-${color.replace("#","")}-${Math.random().toString(36).slice(2,8)}`;
  return (
    <svg width={width} height={height} style={{ display:"block" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#${gradId})`} />
    </svg>
  );
}

/* ─────────────── STREAK HEATMAP ─────────────── */
function StreakHeatmap({ activeDays }: { activeDays: number[] }) {
  const days = 35;
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:"4px", maxWidth:"180px" }}>
      {Array.from({ length: days }).map((_, i) => {
        const intensity = activeDays[i] ?? 0;
        const colors = ["rgba(255,255,255,.04)", "rgba(99,102,241,.25)", "rgba(99,102,241,.55)", "rgba(139,92,246,.85)"];
        return (
          <div key={i} style={{
            aspectRatio:"1", borderRadius:"3px",
            background: colors[intensity],
            border: intensity > 0 ? `1px solid ${intensity === 3 ? "rgba(139,92,246,.4)" : "rgba(99,102,241,.2)"}` : "1px solid rgba(255,255,255,.03)",
            transition: "transform .15s",
          }}/>
        );
      })}
    </div>
  );
}

/* ─────────────── WAVEFORM THINKING ─────────────── */
const THINKING_LABELS = [
  "Checking your vault...",
  "Talking to Base...",
  "Processing request...",
  "Almost there...",
];
function Waveform() {
  const [label, setLabel] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setLabel(l => (l+1) % THINKING_LABELS.length), 1600);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 16px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ width:"3px", borderRadius:"3px", background:"linear-gradient(to top,#3b82f6,#8b5cf6)", animation:`wave 1.2s ease-in-out ${i*0.12}s infinite`, height:"20px" }} />
        ))}
      </div>
      <span style={{ fontSize:"12px", color:"#6b7280", fontFamily:"var(--FB)", transition:"opacity 0.3s" }} key={label}>
        {THINKING_LABELS[label]}
      </span>
    </div>
  );
}

/* ─────────────── STREAMING TEXT ─────────────── */
function StreamText({ text }: { text: string }) {
  const cleaned = cleanMsg(text);
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const iv = setInterval(() => {
      if (i >= cleaned.length) { clearInterval(iv); return; }
      setShown(cleaned.slice(0, ++i));
    }, 10);
    return () => clearInterval(iv);
  }, [text]);
  return (
    <span>
      {shown}
      {shown.length < cleaned.length && (
        <span style={{ display:"inline-block", width:"2px", height:"13px", background:"#6366f1", verticalAlign:"middle", marginLeft:"2px", animation:"blink 1s step-end infinite" }} />
      )}
    </span>
  );
}

/* ─────────────── TX RECEIPT ─────────────── */
function TxCard({ msg }: { msg: Msg }) {
  return (
    <div style={{ maxWidth:"360px", borderRadius:"18px", overflow:"hidden", border:"1px solid rgba(74,222,128,.28)", background:"linear-gradient(135deg,rgba(34,197,94,.08),rgba(74,222,128,.04))", boxShadow:"0 12px 36px rgba(74,222,128,.10), 0 0 0 1px rgba(74,222,128,.05)" }}>
      <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(74,222,128,.14)", display:"flex", alignItems:"center", gap:"10px", background:"rgba(74,222,128,.04)" }}>
        <div style={{ width:"30px", height:"30px", borderRadius:"50%", background:"rgba(74,222,128,.18)", border:"1px solid rgba(74,222,128,.35)", display:"flex", alignItems:"center", justifyContent:"center", color:"#4ade80", flexShrink:0 }}>
          {Ic.check}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"14px", color:"#4ade80", letterSpacing:"-.01em" }}>Transaction confirmed</div>
          <div style={{ fontSize:"11px", color:"#6b7280", marginTop:"1px" }}>Base Sepolia · Instant</div>
        </div>
      </div>
      <div style={{ padding:"16px 18px" }}>
        {msg.goalName && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
            <span style={{ fontSize:"11px", color:"#6b7280", textTransform:"uppercase", letterSpacing:".08em", fontWeight:600 }}>Goal</span>
            <span style={{ fontFamily:"var(--FD)", fontSize:"13px", fontWeight:700, color:"#eef2ff" }}>{msg.goalName}</span>
          </div>
        )}
        {msg.amount && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"12px" }}>
            <span style={{ fontSize:"11px", color:"#6b7280", textTransform:"uppercase", letterSpacing:".08em", fontWeight:600 }}>Saved</span>
            <span style={{ fontFamily:"var(--FD)", fontSize:"22px", fontWeight:900, color:"#4ade80", letterSpacing:"-.02em", fontFeatureSettings:"'tnum'" }}>${msg.amount}<span style={{ fontSize:"12px", marginLeft:"4px", opacity:.6 }}>USDC</span></span>
          </div>
        )}
        {msg.txHash && (
          <a
            href={`https://sepolia.basescan.org/tx/${msg.txHash}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"10px", borderTop:"1px solid rgba(255,255,255,.06)", textDecoration:"none", transition:"color 0.2s" }}
          >
            <span style={{ fontSize:"11px", color:"#4b5563", fontFamily:"var(--FM)" }}>{msg.txHash}</span>
            <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", fontSize:"10px", fontWeight:600, color:"#6366f1" }}>BaseScan {Ic.ext}</span>
          </a>
        )}
      </div>
    </div>
  );
}

/* ─────────────── MESSAGE BUBBLE ─────────────── */
function MsgBubble({ msg, isLatest }: { msg: Msg; isLatest: boolean }) {
  const [showMeta, setShowMeta] = useState(false);
  const [copied, setCopied] = useState(false);
  const content = cleanMsg(msg.content);

  const copyText = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  if (msg.role === "user") {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end" }}
        onMouseEnter={() => setShowMeta(true)} onMouseLeave={() => setShowMeta(false)}>
        <div style={{ display:"flex", alignItems:"flex-end", gap:"8px" }}>
          <span style={{ fontSize:"10px", color:"#4b5563", whiteSpace:"nowrap", paddingBottom:"2px", opacity: showMeta ? 1 : 0, transition:"opacity 0.2s" }}>
            {timeAgo(msg.timestamp)}
          </span>
          <div className="bubble-user">{msg.content}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start" }}
      onMouseEnter={() => setShowMeta(true)} onMouseLeave={() => setShowMeta(false)}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
        <div style={{ width:"28px", height:"28px", flexShrink:0, marginTop:"2px" }}><Logo size={28} /></div>
        <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
          {msg.type === "tx" ? (
            <TxCard msg={msg} />
          ) : (
            <div className="bubble-ai">
              {isLatest ? <StreamText text={msg.content} /> : content}
            </div>
          )}
          <div style={{ display:"flex", gap:"6px", opacity: showMeta ? 1 : 0, transition:"opacity 0.2s", paddingLeft:"2px", alignItems:"center" }}>
            <button onClick={copyText} style={{ display:"inline-flex", alignItems:"center", gap:"4px", fontSize:"10px", color: copied ? "#4ade80" : "#4b5563", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--FB)", padding:"2px 6px", borderRadius:"6px", transition:"color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="#94a3b8"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color= copied ? "#4ade80" : "#4b5563"}>
              {Ic.copy} {copied ? "Copied" : "Copy"}
            </button>
            <span style={{ fontSize:"10px", color:"#4b5563", display:"flex", alignItems:"center" }}>{timeAgo(msg.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── QUICK REPLIES ─────────────── */
function QuickReplies({ onSelect, lastMsg }: { onSelect: (t: string) => void; lastMsg: Msg }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const isTx = lastMsg.type === "tx";
  const options = isTx
    ? ["Save more to this goal", "Check my balance", "View all my goals", "Start a new goal"]
    : ["Check my savings balance", "What are my current goals?", "Save $20 now", "How do I withdraw?"];

  return (
    <div className="msg-enter" style={{ display:"flex", flexWrap:"wrap", gap:"8px", paddingLeft:"38px", alignSelf:"flex-start", maxWidth:"720px" }}>
      {options.map(opt => (
        <button key={opt} className="qr-btn" onClick={() => { onSelect(opt); setVisible(false); }}>
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ─────────────── SESSION SUMMARY ─────────────── */
function SessionSummary({ msgs }: { msgs: Msg[] }) {
  const txMsgs = msgs.filter(m => m.type === "tx" && m.amount);
  if (txMsgs.length === 0) return null;
  const totalSaved = txMsgs.reduce((s, m) => s + (m.amount || 0), 0);
  return (
    <div style={{ display:"flex", justifyContent:"center", margin:"8px 0" }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"12px", color:"#6b7280", padding:"7px 16px", borderRadius:"100px", background:"rgba(99,102,241,.06)", border:"1px solid rgba(99,102,241,.15)" }}>
        <span style={{ color:"#818cf8" }}>{Ic.target}</span>
        <span>This session: saved <strong style={{ color:"#4ade80" }}>${totalSaved.toFixed(2)} USDC</strong></span>
      </div>
    </div>
  );
}

/* ─────────────── GOAL PROGRESS CHIP (top bar) ─────────────── */
function GoalChip({ goals, totalSaved, onClick }: { goals: Goal[]; totalSaved: number; onClick: () => void }) {
  const topGoal = goals[0];
  const pct = topGoal ? Math.min((topGoal.saved / topGoal.target) * 100, 100) : 0;
  return (
    <div onClick={onClick} className="goal-chip">
      {topGoal ? (
        <>
          <div style={{ position:"relative", width:"22px", height:"22px", flexShrink:0 }}>
            <svg width="22" height="22" style={{ transform:"rotate(-90deg)", position:"absolute" }}>
              <circle cx="11" cy="11" r="8" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="2.5"/>
              <circle cx="11" cy="11" r="8" fill="none" stroke="#6366f1" strokeWidth="2.5"
                strokeDasharray={50.3} strokeDashoffset={50.3*(1-pct/100)} strokeLinecap="round"
                style={{ transition:"stroke-dashoffset 1s ease" }}/>
            </svg>
          </div>
          <span className="goal-chip-name" style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"12px", color:"#eef2ff", maxWidth:"90px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{topGoal.name}</span>
          <span style={{ fontSize:"11px", color:"#818cf8", fontWeight:600, fontFeatureSettings:"'tnum'" }}>{Math.round(pct)}%</span>
          <div style={{ width:"1px", height:"12px", background:"rgba(255,255,255,.1)" }} className="goal-chip-sep" />
          <span className="goal-chip-amount" style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"13px", color:"#4ade80", fontFeatureSettings:"'tnum'" }}>${totalSaved.toFixed(0)}</span>
        </>
      ) : (
        <>
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#6366f1", display:"inline-block", opacity:0.7 }} />
          <span style={{ fontFamily:"var(--FD)", fontWeight:600, fontSize:"12px", color:"#818cf8" }}>Dashboard</span>
        </>
      )}
    </div>
  );
}

/* ─────────────── WALLET CHIP (top bar) ─────────────── */
function WalletChip({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const copyAddr = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <div className="wallet-chip">
      <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#4ade80", display:"inline-block", boxShadow:"0 0 8px rgba(74,222,128,.6)" }} />
      <span className="wallet-addr" style={{ fontFamily:"var(--FM)", fontSize:"11px", color:"#cbd5e1", fontWeight:500 }}>
        {address.slice(0,6)}…{address.slice(-4)}
      </span>
      <button onClick={copyAddr} className="wallet-action" title="Copy address">
        {copied ? <span style={{ color:"#4ade80" }}>{Ic.check}</span> : Ic.copy}
      </button>
      <a href={`https://sepolia.basescan.org/address/${address}`} target="_blank" rel="noopener noreferrer" className="wallet-action" onClick={e => e.stopPropagation()} title="View on BaseScan">
        {Ic.ext}
      </a>
    </div>
  );
}

/* ─────────────── EMPTY HERO ─────────────── */
function EmptyHero({ onPick }: { onPick: (text: string) => void }) {
  const greet = getGreeting();
  const prompts = [
    { icon:Ic.jordan, text:"Save $50 for new Jordans" },
    { icon:Ic.plane,  text:"Save $300 for a trip to Bali" },
    { icon:Ic.laptop, text:"Save $800 for a new laptop" },
    { icon:Ic.gift,   text:"Save $40 for a friend's gift" },
  ];
  return (
    <div className="empty-hero">
      <div className="empty-logo">
        <Logo size={56} />
      </div>
      <h1 className="empty-title">
        <span style={{ color:"var(--t1)" }}>{greet}.</span>{" "}
        <span className="gt">What are we saving for?</span>
      </h1>
      <p className="empty-sub">
        Type a goal in plain English. Stashify executes real USDC transactions on Base — no forms, no setup.
      </p>
      <div className="empty-prompts">
        {prompts.map(p => (
          <button key={p.text} className="empty-chip" onClick={() => onPick(p.text)}>
            <span style={{ color:"#818cf8", display:"flex" }}>{p.icon}</span>
            <span>{p.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── AMBIENT CANVAS ─────────────── */
function AmbientCanvas({ state }: { state: "idle"|"thinking"|"success" }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; }, [state]);

  useEffect(() => {
    const c = canvas.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    let t = 0;
    const tick = () => {
      t += 0.003;
      ctx.clearRect(0, 0, c.width, c.height);
      const s = stateRef.current;
      const speed = s === "thinking" ? 2.5 : s === "success" ? 3 : 1;
      const alpha1 = s === "thinking" ? 0.10 : s === "success" ? 0.06 : 0.07;
      const alpha2 = s === "thinking" ? 0.08 : s === "success" ? 0.10 : 0.06;
      const col1 = s === "success" ? "34,197,94" : "59,130,246";
      const col2 = s === "success" ? "74,222,128" : "139,92,246";

      const x1 = c.width * 0.2 + Math.sin(t * speed) * 80;
      const y1 = c.height * 0.2 + Math.cos(t * speed * 0.7) * 60;
      const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, 350);
      g1.addColorStop(0, `rgba(${col1},${alpha1})`);
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, c.width, c.height);

      const x2 = c.width * 0.75 + Math.cos(t * speed * 0.8) * 60;
      const y2 = c.height * 0.6 + Math.sin(t * speed) * 50;
      const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, 280);
      g2.addColorStop(0, `rgba(${col2},${alpha2})`);
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, c.width, c.height);

      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvas} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }} />;
}

/* ─────────────── MAIN ─────────────── */
export default function ChatPage() {
  const router = useRouter();

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showDash, setShowDash] = useState(false);
  const [latestMsgId, setLatestMsgId] = useState<string|null>(null);
  const [ambientState, setAmbientState] = useState<"idle"|"thinking"|"success">("idle");
  const [confettiActive, setConfettiActive] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const overallPct = totalTarget > 0 ? totalSaved / totalTarget : 0;
  const goalColors = ["#6366f1","#3b82f6","#8b5cf6","#4ade80","#f59e0b"];

  const activities: Activity[] = useMemo(() => {
    return msgs
      .filter(m => m.type === "tx" && m.amount && m.txHash && m.goalName)
      .map(m => ({
        id: m.id,
        type: "deposit" as const,
        goalName: m.goalName!,
        amount: m.amount!,
        txHash: m.txHash!,
        timestamp: m.timestamp,
      }))
      .reverse()
      .slice(0, 5);
  }, [msgs]);

  const streakDays = useMemo(() => {
    const arr = Array(35).fill(0);
    arr[34] = activities.length > 0 ? 3 : 0;
    arr[33] = 2; arr[32] = 1; arr[31] = 0; arr[30] = 2;
    arr[28] = 1; arr[27] = 2; arr[26] = 3; arr[24] = 1;
    arr[21] = 2; arr[19] = 1; arr[17] = 3; arr[15] = 2;
    arr[12] = 1; arr[10] = 2; arr[8] = 1; arr[5] = 1;
    return arr;
  }, [activities.length]);

  const streakCount = useMemo(() => {
    let n = 0;
    for (let i = streakDays.length - 1; i >= 0; i--) {
      if (streakDays[i] > 0) n++; else break;
    }
    return Math.max(n, activities.length > 0 ? 1 : 0);
  }, [streakDays, activities.length]);

  // Initialize: fetch goals
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    (async () => {
      const onchainGoals = await fetchOnchainGoals();
      setGoals(onchainGoals);
      if (onchainGoals.length > 0) {
        setMsgs([{
          id: "welcome-back",
          role: "assistant",
          type: "normal",
          content: `${getGreeting()}! You have $${onchainGoals.reduce((s,g)=>s+g.saved,0).toFixed(2)} saved across ${onchainGoals.length} goal${onchainGoals.length>1?"s":""}. What would you like to do today?`,
          timestamp: Date.now(),
        }]);
      }
    })();
  }, []);

  // Auto-focus input on mount (desktop only — focusing on mobile triggers keyboard)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, []);

  // Lock body scroll only when dashboard is open on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile && showDash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showDash]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, loading]);

  useEffect(() => {
    const ta = inputRef.current; if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [input]);

  const send = useCallback(async (text?: string) => {
    const content = text || input;
    if (!content.trim() || loading) return;
    setInput("");
    const userMsg: Msg = { id: Date.now().toString(), role:"user", type:"normal", content, timestamp: Date.now() };
    setMsgs(p => [...p, userMsg]);
    setLoading(true);
    setAmbientState("thinking");

    try {
      const res = await fetch("/api/chat", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      });
      const data = await res.json();
      const isTx = !!data.goalUpdate;
      const newId = (Date.now() + 1).toString();
      const aMsg: Msg = {
        id: newId, role:"assistant",
        type: isTx ? "tx" : "normal",
        content: data.message,
        txHash: isTx ? `0x${Math.random().toString(16).slice(2,10)}...${Math.random().toString(16).slice(2,6)}` : undefined,
        goalName: data.goalUpdate?.name,
        amount: data.goalUpdate?.amount,
        timestamp: Date.now(),
      };
      setMsgs(p => [...p, aMsg]);
      setLatestMsgId(newId);

      if (isTx) {
        setAmbientState("success");
        setConfettiActive(true);
        setTimeout(() => { setConfettiActive(false); setAmbientState("idle"); }, 3000);

        setGoals(p => {
          const ex = p.find(g => g.name.toLowerCase() === data.goalUpdate.name.toLowerCase());
          if (ex) return p.map(g => g.name.toLowerCase() === data.goalUpdate.name.toLowerCase()
            ? { ...g, saved: g.saved + data.goalUpdate.amount } : g);
          return [...p, { name: data.goalUpdate.name, saved: data.goalUpdate.amount, target: data.goalUpdate.target || data.goalUpdate.amount * 3 }];
        });

        setTimeout(async () => {
          const fresh = await fetchOnchainGoals();
          if (fresh.length > 0) setGoals(fresh);
        }, 4000);
      } else {
        setAmbientState("idle");
      }
    } catch {
      setMsgs(p => [...p, { id: Date.now().toString(), role:"assistant", type:"normal", content:"Something went wrong. Please try again.", timestamp: Date.now() }]);
      setAmbientState("idle");
    } finally { setLoading(false); }
  }, [input, loading, msgs]);

  const lastAiMsg = [...msgs].reverse().find(m => m.role === "assistant");
  const userHasSentMessage = msgs.some(m => m.role === "user");
  const showQuickReplies = !loading && lastAiMsg && userHasSentMessage;
  const showSessionSummary = msgs.filter(m => m.type === "tx").length >= 2;
  const isEmptyState = msgs.length === 0 && !loading;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root {
          --bg:#060912; --sur:rgba(255,255,255,.035); --bor:rgba(255,255,255,.07);
          --t1:#eef2ff; --t2:#6b7280; --t3:#1f2937;
          --grad:linear-gradient(135deg,#3b82f6,#8b5cf6);
          --FD:'Cabinet Grotesk',sans-serif;
          --FB:'Instrument Sans',sans-serif;
          --FM:'JetBrains Mono', ui-monospace, monospace;
        }
        html, body { background:var(--bg); color:var(--t1); font-family:var(--FB); height:100%; height:100dvh; }
        body { overflow:hidden; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(99,102,241,.2); border-radius:3px; }

        .gt { background: linear-gradient(110deg, #60a5fa 0%, #818cf8 42%, #c084fc 85%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        .app-shell {
          display:flex; height:100vh; height:100dvh;
          overflow:hidden; position:relative; z-index:1;
        }

        /* ── SIDEBAR (desktop only) ── */
        .sidebar {
          width:72px; flex-shrink:0; display:flex; flex-direction:column;
          align-items:center; padding:18px 0 14px; gap:4px;
          background:rgba(3,5,12,.99);
          border-right:1px solid rgba(255,255,255,.07);
          backdrop-filter:blur(24px); z-index:20;
        }
        .sb-logo {
          margin-bottom:18px; padding:6px; cursor:pointer;
          transition:transform .25s cubic-bezier(.23,1,.32,1);
          border-radius:14px; position:relative;
        }
        .sb-logo::after {
          content:''; position:absolute; inset:-2px; border-radius:16px;
          background: linear-gradient(135deg, rgba(59,130,246,.4), rgba(139,92,246,.3));
          opacity:0; filter:blur(8px); transition:opacity .3s; z-index:-1;
        }
        .sb-logo:hover { transform:scale(1.06); }
        .sb-logo:hover::after { opacity:.7; }

        .sb-btn {
          width:48px; height:48px; border-radius:14px;
          display:flex; align-items:center; justify-content:center;
          color:rgba(255,255,255,.4); cursor:pointer; border:1px solid transparent; background:transparent;
          transition:color .2s, background .2s, transform .18s, border-color .2s; position:relative;
        }
        .sb-btn:hover { color:rgba(255,255,255,.95); background:rgba(255,255,255,.05); transform:scale(1.06); border-color:rgba(255,255,255,.06); }
        .sb-btn:active { transform:scale(0.94); }
        .sb-btn.active { color:white; background:rgba(99,102,241,.18); border-color:rgba(99,102,241,.32); box-shadow: 0 0 0 1px rgba(99,102,241,.1) inset, 0 4px 16px rgba(99,102,241,.18); }
        .sb-btn.active::before {
          content:''; position:absolute; left:-9px; top:50%; transform:translateY(-50%);
          width:3px; height:24px; background:linear-gradient(180deg,#3b82f6,#8b5cf6);
          border-radius:0 3px 3px 0; box-shadow:0 0 8px rgba(99,102,241,.6);
        }
        .sb-tooltip {
          position:absolute; left:62px; top:50%;
          transform:translateY(-50%) translateX(-6px);
          background:rgba(4,6,14,.99); border:1px solid rgba(255,255,255,.12);
          color:#eef2ff; font-size:12px; font-weight:600; padding:6px 12px; border-radius:10px;
          white-space:nowrap; opacity:0; pointer-events:none;
          transition:opacity .18s, transform .18s;
          font-family:var(--FB); z-index:100;
          box-shadow:0 8px 24px rgba(0,0,0,.5);
        }
        .sb-btn:hover .sb-tooltip { opacity:1; transform:translateY(-50%) translateX(0); }
        .sb-divider { width:32px; height:1px; background:rgba(255,255,255,.06); margin:10px 0; }
        .sb-bottom { margin-top:auto; display:flex; flex-direction:column; align-items:center; gap:8px; }
        .sb-status { display:flex; flex-direction:column; align-items:center; gap:5px; padding:8px 0; }
        .sb-status-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; box-shadow:0 0 8px rgba(74,222,128,.6); animation: pulse 2.4s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .sb-status-label { font-family:var(--FB); font-size:8px; font-weight:700; letter-spacing:.18em; color:#4ade80; }

        /* ── MAIN ── */
        .main-area {
          flex:1; display:flex; flex-direction:column;
          overflow:hidden; position:relative;
          min-width:0;
          min-height:0;
        }

        /* ── TOP BAR ── */
        .top-bar {
          display:flex; align-items:center; justify-content:space-between;
          padding:0 24px; height:60px; flex-shrink:0;
          border-bottom:1px solid rgba(255,255,255,.05);
          background:rgba(4,8,15,.78); backdrop-filter:blur(24px);
          z-index:5;
        }
        .top-title { font-family:var(--FD); font-weight:800; font-size:15px; letter-spacing:-.01em; }

        .goal-chip {
          display:flex; align-items:center; gap:8px;
          padding:6px 14px; border-radius:100px;
          background:rgba(99,102,241,.08);
          border:1px solid rgba(99,102,241,.18);
          cursor:pointer;
          transition:background .2s, border-color .2s, transform .15s;
        }
        .goal-chip:hover { background:rgba(99,102,241,.16); border-color:rgba(99,102,241,.32); transform:translateY(-1px); }
        .goal-chip:active { transform:translateY(0); }

        .wallet-chip {
          display:flex; align-items:center; gap:8px;
          padding:6px 10px 6px 12px; border-radius:100px;
          background:rgba(255,255,255,.025); border:1px solid rgba(255,255,255,.07);
          transition:border-color .2s, background .2s;
        }
        .wallet-chip:hover { border-color:rgba(255,255,255,.14); background:rgba(255,255,255,.04); }
        .wallet-action {
          display:flex; align-items:center; justify-content:center;
          width:22px; height:22px; border-radius:6px;
          background:transparent; border:none; cursor:pointer;
          color:#6b7280; transition:color .15s, background .15s;
          text-decoration:none;
        }
        .wallet-action:hover { color:#eef2ff; background:rgba(255,255,255,.06); }

        /* ── EMPTY HERO ── */
        .empty-hero {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          padding: 24px 24px 8px; text-align:center; max-width:680px; margin:0 auto;
          animation: emptyIn .7s cubic-bezier(.23,1,.32,1);
        }
        @keyframes emptyIn { from{opacity:0; transform:translateY(20px)} to{opacity:1; transform:translateY(0)} }
        .empty-logo { margin-bottom:20px; position:relative; animation: float 4s ease-in-out infinite; }
        .empty-logo::after {
          content:''; position:absolute; inset:-12px; border-radius:24px;
          background:radial-gradient(circle at center, rgba(99,102,241,.25), transparent 60%);
          filter:blur(20px); z-index:-1;
        }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .empty-title {
          font-family:var(--FD); font-weight:900;
          font-size:clamp(26px, 3.4vw, 38px); letter-spacing:-.03em; line-height:1.08;
          margin-bottom:14px; max-width:600px;
        }
        .empty-sub {
          color:var(--t2); font-size:clamp(13px, 1.5vw, 15px);
          line-height:1.65; max-width:440px; margin:0 auto 28px;
        }
        .empty-prompts {
          display:grid; grid-template-columns: 1fr 1fr;
          gap:8px; width:100%; max-width:540px;
        }
        .empty-chip {
          display:flex; align-items:center; gap:10px;
          padding:12px 16px; border-radius:12px;
          background:rgba(255,255,255,.025); border:1px solid rgba(255,255,255,.07);
          color:#cbd5e1; font-family:var(--FB); font-size:13px; font-weight:500;
          cursor:pointer; text-align:left;
          transition:all .25s ease;
        }
        .empty-chip:hover {
          color:#eef2ff;
          background:rgba(99,102,241,.08);
          border-color:rgba(99,102,241,.3);
          transform:translateY(-2px);
          box-shadow:0 8px 24px rgba(99,102,241,.12);
        }

        /* ── MESSAGES ── */
        .msgs {
          flex:1; overflow-y:auto;
          padding:24px 0 16px;
          display:flex; flex-direction:column;
          min-height:0;
        }
        .msgs-inner {
          max-width:720px; margin:0 auto; width:100%; padding:0 24px;
          display:flex; flex-direction:column; gap:18px;
        }

        .bubble-user {
          background:linear-gradient(135deg,#2563eb,#6366f1); color:white;
          border-radius:18px 18px 4px 18px; padding:12px 18px;
          max-width:72%; font-size:14px; line-height:1.65;
          box-shadow:0 4px 20px rgba(37,99,235,.28);
          word-break:break-word; overflow-wrap:break-word;
        }
        .bubble-ai {
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          border-radius:18px 18px 18px 4px; padding:14px 18px;
          max-width:80%; font-size:14px; line-height:1.75; color:#cbd5e1;
          word-break:break-word; overflow-wrap:break-word; white-space:pre-wrap;
          transition:border-color 0.2s;
        }
        .bubble-ai:hover { border-color:rgba(255,255,255,.12); }

        .thinking {
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          border-radius:18px 18px 18px 4px; overflow:hidden;
        }

        .qr-btn {
          font-size:12px; font-weight:500; padding:7px 14px;
          border-radius:100px; border:1px solid rgba(99,102,241,.3);
          background:rgba(99,102,241,.07); color:#818cf8;
          cursor:pointer; white-space:nowrap;
          transition:all .2s ease; font-family:var(--FB);
        }
        .qr-btn:hover { color:white; border-color:rgba(99,102,241,.55); background:rgba(99,102,241,.16); transform:translateY(-1px); }

        /* ── INPUT AREA ── */
        .input-area {
          flex-shrink:0; padding:16px 24px 20px;
          background:rgba(4,8,15,.85); backdrop-filter:blur(24px);
          border-top:1px solid rgba(255,255,255,.05);
          position:relative;
        }
        .input-wrap {
          max-width:720px; margin:0 auto;
          display:flex; align-items:flex-end; gap:12px;
          padding:10px 10px 10px 18px; border-radius:20px;
          border:1px solid rgba(255,255,255,.09);
          background:rgba(255,255,255,.04);
          transition:border-color .3s, box-shadow .3s, background .3s;
          position:relative;
        }
        .input-wrap:focus-within {
          border-color:rgba(99,102,241,.5);
          background:rgba(255,255,255,.05);
          box-shadow:0 0 0 4px rgba(99,102,241,.08), 0 12px 36px rgba(0,0,0,.35);
        }
        .input-ta {
          flex:1; background:transparent; border:none; outline:none;
          color:var(--t1); font-family:var(--FB); font-size:16px; line-height:1.6;
          resize:none; min-height:24px; max-height:120px; scrollbar-width:none;
          padding-top:6px; padding-bottom:6px;
        }
        .input-ta::placeholder { color:#374151; }
        .input-ta::-webkit-scrollbar { display:none; }

        .send-btn {
          width:38px; height:38px; border-radius:12px; flex-shrink:0;
          background:var(--grad); border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 4px 16px rgba(99,102,241,.4);
          transition:transform .2s, box-shadow .2s, opacity .2s;
        }
        .send-btn:hover:not(:disabled) { transform:scale(1.08); box-shadow:0 6px 24px rgba(99,102,241,.6); }
        .send-btn:active:not(:disabled) { transform:scale(0.95); }
        .send-btn:disabled { opacity:.3; cursor:default; box-shadow:none; }

        .input-foot {
          display:flex; justify-content:space-between; align-items:center;
          max-width:720px; margin:8px auto 0; padding: 0 4px;
          font-size:11px; color:#374151;
        }
        .input-foot kbd {
          font-family:var(--FM); font-size:10px;
          padding:1px 6px; border-radius:4px;
          border:1px solid rgba(255,255,255,.08);
          background:rgba(255,255,255,.025); color:#6b7280;
        }

        /* ── DASHBOARD PANEL (desktop) ── */
        .dash-backdrop {
          position:fixed; inset:0; background:rgba(0,0,0,.4);
          opacity:0; pointer-events:none; transition:opacity .35s; z-index:90;
        }
        .dash-backdrop.open { opacity:1; pointer-events:auto; }

        .dash-panel {
          position:fixed; top:0; right:0; bottom:0; width:400px;
          background:rgba(6,10,20,.98); backdrop-filter:blur(36px);
          border-left:1px solid rgba(255,255,255,.07);
          z-index:100; display:flex; flex-direction:column;
          transform:translateX(100%);
          transition:transform .45s cubic-bezier(.23,1,.32,1);
          box-shadow:-20px 0 60px rgba(0,0,0,.4);
        }
        .dash-panel.open { transform:translateX(0); }
        .dash-header {
          padding:20px 24px 16px; border-bottom:1px solid rgba(255,255,255,.06);
          display:flex; align-items:center; justify-content:space-between;
          background:linear-gradient(180deg, rgba(99,102,241,.06), transparent);
          flex-shrink:0;
        }
        .dash-body {
          flex:1; overflow-y:auto;
          padding:20px 24px 32px;
          -webkit-overflow-scrolling: touch;
        }

        .dash-section { margin-bottom: 24px; }
        .dash-section-label {
          display:flex; align-items:center; justify-content:space-between;
          font-family:var(--FB); font-weight:700; font-size:10px;
          color:#475569; letter-spacing:.14em; text-transform:uppercase;
          margin-bottom:12px;
        }

        .total-hero {
          position:relative; padding: 24px 22px 22px;
          border-radius:20px; overflow:hidden;
          background:
            linear-gradient(135deg, rgba(59,130,246,.12), rgba(139,92,246,.10)),
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,.18), transparent);
          border:1px solid rgba(99,102,241,.22);
          box-shadow:0 10px 40px rgba(99,102,241,.12);
        }
        .total-hero::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg, transparent, rgba(99,102,241,.55) 50%, transparent);
        }
        .live-pill {
          display:inline-flex; align-items:center; gap:6px;
          font-size:9px; font-weight:700; letter-spacing:.16em;
          padding:4px 10px; border-radius:100px;
          background:rgba(74,222,128,.1); border:1px solid rgba(74,222,128,.2);
          color:#4ade80; text-transform:uppercase;
        }
        .total-num {
          font-family:var(--FD); font-weight:900;
          font-size:48px; letter-spacing:-.04em; line-height:1;
          background:linear-gradient(135deg, #c7d2fe, #c084fc);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text; font-feature-settings:'tnum';
        }
        .delta-pill {
          display:inline-flex; align-items:center; gap:5px;
          font-size:11px; font-weight:600; padding:4px 10px; border-radius:100px;
          background:rgba(74,222,128,.1); border:1px solid rgba(74,222,128,.22);
          color:#4ade80;
        }

        .goal-card {
          background:rgba(255,255,255,.025); border:1px solid rgba(255,255,255,.07);
          border-radius:14px; padding:16px; margin-bottom:10px;
          transition:border-color .2s, transform .2s, background .2s;
          position:relative; overflow:hidden;
        }
        .goal-card::before {
          content:''; position:absolute; top:0; left:0; bottom:0; width:3px;
          background: var(--gc); opacity:.5;
        }
        .goal-card:hover { border-color:rgba(99,102,241,.25); transform:translateY(-1px); background:rgba(255,255,255,.035); }
        .goal-card:hover .goal-link { opacity:1; }
        .goal-link {
          opacity:0; transition:opacity .2s;
          font-size:10px; font-weight:600; color:#6366f1;
          display:inline-flex; align-items:center; gap:3px; text-decoration:none;
        }

        .activity-row {
          display:flex; align-items:center; gap:12px;
          padding:10px 0; border-bottom:1px solid rgba(255,255,255,.04);
          text-decoration:none; transition:background .2s; border-radius:8px;
          margin: 0 -10px; padding-left:10px; padding-right:10px;
        }
        .activity-row:hover { background:rgba(99,102,241,.04); }
        .activity-row:last-child { border-bottom:none; }
        .activity-icon {
          width:32px; height:32px; border-radius:10px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(74,222,128,.12); border:1px solid rgba(74,222,128,.22);
          color:#4ade80;
        }

        .qa-btn {
          width:100%; padding:11px 14px; border-radius:12px;
          background:rgba(255,255,255,.025); border:1px solid rgba(255,255,255,.07);
          color:#94a3b8; font-size:13px; font-family:var(--FB);
          cursor:pointer; text-align:left; transition:all .2s;
          display:flex; align-items:center; gap:10px;
        }
        .qa-btn:hover { border-color:rgba(99,102,241,.3); color:#eef2ff; background:rgba(99,102,241,.06); }

        .dash-close {
          width:36px; height:36px; border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
          cursor:pointer; color:#cbd5e1;
          transition:all 0.2s;
          z-index:5; position:relative;
          -webkit-tap-highlight-color: transparent;
        }
        .dash-close:active, .dash-close:hover { background:rgba(255,255,255,.12); color:#eef2ff; }

        @keyframes wave   { 0%,100%{height:6px} 50%{height:22px} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes msgIn  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        .msg-enter { animation:msgIn .38s cubic-bezier(.23,1,.32,1) forwards; }

        .noise { position:fixed; inset:0; pointer-events:none; z-index:1; opacity:.016;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:256px; }

        /* ── MOBILE NAV ── */
        .mobile-nav {
          display:none;
          position:fixed; bottom:0; left:0; right:0;
          z-index:40;
          background:rgba(4,8,15,.97);
          border-top:1px solid rgba(255,255,255,.07);
          backdrop-filter:blur(20px);
          padding:8px 0 calc(env(safe-area-inset-bottom, 0px) + 8px);
        }
        .mobile-nav-btn {
          flex:1; display:flex; flex-direction:column; align-items:center; gap:3px;
          background:none; border:none; cursor:pointer; color:var(--t2);
          font-size:10px; font-family:var(--FB); font-weight:600;
          letter-spacing:.04em; padding:4px 0;
          transition:color .2s;
          -webkit-tap-highlight-color: transparent;
        }
        .mobile-nav-btn.active { color:#818cf8; }

        /* ═══════════ MOBILE BREAKPOINTS ═══════════ */
        @media (max-width: 768px) {
          .sidebar { display:none !important; }
          .mobile-nav { display:flex !important; }

          /* App shell: leave room for bottom nav */
          .app-shell {
            height:100vh; height:100dvh;
          }
          .main-area {
            /* Bottom nav is ~62px including safe area */
            padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 62px);
          }

          .top-bar { padding: 0 16px; height:54px; }
          .top-title { font-size:14px; }

          /* Hide wallet chip text on mobile, keep dot + buttons only */
          .wallet-addr { display:none !important; }
          .wallet-chip { padding:6px 8px; }

          /* Hide name & separator on goal chip on tiny screens */
          .goal-chip { padding:5px 12px; }

          .msgs { padding:16px 0 12px; }
          .msgs-inner { padding: 0 16px; gap:14px; }

          .bubble-user, .bubble-ai { max-width:88%; font-size:14px; }

          .input-area {
            padding: 12px 16px 14px;
          }
          .input-wrap { padding: 8px 8px 8px 16px; }
          .input-foot { display:none; }

          /* Empty hero — much tighter on mobile */
          .empty-hero { padding: 12px 16px 8px; }
          .empty-prompts { grid-template-columns: 1fr; gap:8px; }
          .empty-title { font-size: 24px; line-height: 1.1; }
          .empty-sub { font-size: 13px; margin-bottom: 20px; }
          .empty-logo { margin-bottom: 14px; }

          /* Dashboard becomes bottom sheet */
          .dash-panel {
            position:fixed !important;
            top:auto !important; left:0 !important; right:0 !important; bottom:0 !important;
            width:100% !important;
            height:90vh !important; height:90dvh !important;
            border-left:none;
            border-top:1px solid rgba(255,255,255,.1);
            border-radius:24px 24px 0 0;
            transform:translateY(100%);
            z-index:200 !important;
          }
          .dash-panel.open { transform:translateY(0) !important; }
          .dash-panel::before {
            content:''; position:absolute; top:8px; left:50%; transform:translateX(-50%);
            width:36px; height:4px; border-radius:2px; background:rgba(255,255,255,.18);
            z-index:10;
          }
          .dash-header {
            padding-top:24px;
          }
          .dash-backdrop { z-index:190 !important; }

          .total-num { font-size:42px; }
        }

        @media (max-width: 480px) {
          .top-bar { padding: 0 12px; }
          .goal-chip-name { max-width:50px; font-size:11px; }
          .goal-chip-sep, .goal-chip-amount { display:none; }
        }
      `}</style>

      <AmbientCanvas state={ambientState} />
      <div className="noise" style={{ zIndex:2 }} />
      <Confetti active={confettiActive} />

      <div className="app-shell">

        {/* ════ SIDEBAR (desktop) ════ */}
        <aside className="sidebar">
          <div className="sb-logo" onClick={() => router.push("/")} title="Stashify"><Logo size={32} /></div>

          <button className="sb-btn active">
            {Ic.chat}
            <span className="sb-tooltip">Chat</span>
          </button>
          <button className="sb-btn" onClick={() => router.push("/pact")}>
            {Ic.pact}
            <span className="sb-tooltip">Stash Pact</span>
          </button>
          <button className="sb-btn" onClick={() => router.push("/vaults")}>
            {Ic.vault}
            <span className="sb-tooltip">Yield Vaults</span>
          </button>

          <div className="sb-divider" />

          <button className={`sb-btn ${showDash?"active":""}`} onClick={() => setShowDash(p => !p)}>
            {Ic.dash}
            <span className="sb-tooltip">Dashboard</span>
          </button>

          <div className="sb-bottom">
            <div className="sb-status">
              <div className="sb-status-dot" />
              <div className="sb-status-label">BASE</div>
            </div>
          </div>
        </aside>

        {/* ════ MAIN ════ */}
        <div className="main-area">

          {/* Top bar */}
          <div className="top-bar">
            <div style={{ display:"flex", alignItems:"center", gap:"10px", minWidth:0 }}>
              <div style={{ display:"none" }} className="mobile-logo-wrap">
                <Logo size={26} />
              </div>
              <div style={{ minWidth:0 }}>
                <div className="top-title">Stashify</div>
                <div style={{ fontSize:"11px", color:"#4ade80", marginTop:"1px", whiteSpace:"nowrap" }}>● Online · Base Sepolia</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <GoalChip goals={goals} totalSaved={totalSaved} onClick={() => setShowDash(true)} />
              <WalletChip address={WALLET_ADDRESS} />
            </div>
          </div>

          {/* Body */}
          <div className="msgs">
            <div className="msgs-inner">
              {isEmptyState && <EmptyHero onPick={(t) => send(t)} />}

              {msgs.map((msg) => (
                <div key={msg.id} className="msg-enter">
                  <MsgBubble msg={msg} isLatest={msg.id === latestMsgId} />
                </div>
              ))}

              {showSessionSummary && <SessionSummary msgs={msgs} />}

              {loading && (
                <div className="msg-enter" style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                  <div style={{ width:"28px", height:"28px", flexShrink:0 }}><Logo size={28} /></div>
                  <div className="thinking"><Waveform /></div>
                </div>
              )}

              {showQuickReplies && lastAiMsg && (
                <QuickReplies
                  lastMsg={lastAiMsg}
                  onSelect={text => { setInput(text); setTimeout(() => inputRef.current?.focus(), 50); }}
                />
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input */}
          <div className="input-area">
            <div className="input-wrap">
              <textarea
                ref={inputRef}
                className="input-ta"
                placeholder="Tell me your savings goal..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                rows={1}
              />
              <button className="send-btn" onClick={() => send()} disabled={loading || !input.trim()}>
                {Ic.send}
              </button>
            </div>
            <div className="input-foot">
              <span>Stashify moves real USDC on Base Sepolia · Always in your control</span>
              <span style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <kbd>↵</kbd> send · <kbd>shift</kbd> + <kbd>↵</kbd> new line
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ════ DASHBOARD — RENDERED OUTSIDE app-shell to ensure proper stacking ════ */}
      <div
        className={`dash-backdrop ${showDash?"open":""}`}
        onClick={() => setShowDash(false)}
        aria-hidden={!showDash}
      />
      <div
        className={`dash-panel ${showDash?"open":""}`}
        role="dialog"
        aria-hidden={!showDash}
      >
        <div className="dash-header">
          <div>
            <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"17px", letterSpacing:"-.02em" }}>Dashboard</div>
            <div style={{ fontSize:"11px", color:"#6b7280", marginTop:"2px" }}>Your savings, onchain</div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDash(false); }}
            onTouchEnd={(e) => { e.preventDefault(); setShowDash(false); }}
            className="dash-close"
            aria-label="Close dashboard"
          >
            {Ic.close}
          </button>
        </div>

        <div className="dash-body">

          {/* HERO TOTAL */}
          <div className="total-hero" style={{ marginBottom:"22px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px", gap:"12px" }}>
              <div style={{ minWidth:0, flex:1 }}>
                <div style={{ fontSize:"10px", fontWeight:700, color:"#6366f1", letterSpacing:".14em", textTransform:"uppercase", marginBottom:"6px" }}>Total saved</div>
                <div className="total-num">
                  $<CountUp value={totalSaved} />
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginTop:"10px", flexWrap:"wrap" }}>
                  <span className="delta-pill">
                    {Ic.trendUp} <span style={{ fontFamily:"var(--FM)", fontFeatureSettings:"'tnum'" }}>${activities.reduce((s,a) => s + a.amount, 0).toFixed(0)}</span>
                    <span style={{ opacity:.7, marginLeft:"2px" }}>this week</span>
                  </span>
                </div>
              </div>
              <span className="live-pill" style={{ flexShrink:0 }}>
                <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#4ade80", display:"inline-block", boxShadow:"0 0 6px rgba(74,222,128,.7)", animation:"pulse 2s ease-in-out infinite" }} />
                Live
              </span>
            </div>

            <div style={{ marginTop:"4px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px", fontSize:"11px" }}>
                <span style={{ color:"#6b7280" }}>{Math.round(overallPct*100)}% to target</span>
                <span style={{ color:"#94a3b8", fontFamily:"var(--FM)", fontFeatureSettings:"'tnum'" }}>${totalSaved.toFixed(0)} / ${totalTarget.toFixed(0)}</span>
              </div>
              <div style={{ height:"6px", borderRadius:"3px", background:"rgba(255,255,255,.06)", overflow:"hidden", position:"relative" }}>
                <div style={{ height:"100%", width:`${overallPct*100}%`, borderRadius:"3px", background:"linear-gradient(90deg, #6366f1, #a78bfa, #c084fc)", transition:"width 1.4s cubic-bezier(.23,1,.32,1)", boxShadow:"0 0 12px rgba(139,92,246,.5)" }} />
              </div>
            </div>
          </div>

          {/* MOMENTUM */}
          {(activities.length > 0 || goals.length > 0) && (
            <div className="dash-section">
              <div className="dash-section-label">
                <span>Momentum</span>
                <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", color:"#fb923c", textTransform:"none", letterSpacing:0, fontSize:"11px" }}>
                  <span style={{ display:"flex" }}>{Ic.flame}</span>
                  <span style={{ fontWeight:700 }}>{streakCount}</span>
                  <span style={{ color:"#6b7280", fontWeight:500 }}>day streak</span>
                </span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px", borderRadius:"12px", background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.06)", gap:"12px" }}>
                <StreakHeatmap activeDays={streakDays} />
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:"10px", color:"#6b7280", letterSpacing:".08em", textTransform:"uppercase", fontWeight:600 }}>Last 35 days</div>
                  <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"22px", color:"#eef2ff", marginTop:"4px", fontFeatureSettings:"'tnum'" }}>
                    {streakDays.filter(d => d > 0).length}<span style={{ fontSize:"12px", color:"#6b7280", fontWeight:600, marginLeft:"3px" }}>days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GOALS */}
          {goals.length === 0 ? (
            <div style={{ textAlign:"center", padding:"32px 20px", borderRadius:"14px", background:"rgba(255,255,255,.02)", border:"1px dashed rgba(255,255,255,.08)", marginBottom:"22px" }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"14px", background:"rgba(99,102,241,.1)", border:"1px solid rgba(99,102,241,.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", color:"#818cf8" }}>{Ic.target}</div>
              <p style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"14px", marginBottom:"6px" }}>No goals yet</p>
              <p style={{ fontSize:"12px", color:"#6b7280", lineHeight:1.6 }}>Tell the AI what you want to save for and your first goal will appear here.</p>
            </div>
          ) : (
            <div className="dash-section">
              <div className="dash-section-label"><span>Active goals</span><span style={{ color:"#6b7280", textTransform:"none", letterSpacing:0, fontSize:"11px", fontWeight:500 }}>{goals.length}</span></div>
              {goals.map((g, i) => {
                const pct = Math.min(g.saved/g.target, 1);
                const c = goalColors[i % goalColors.length];
                const sparkData = Array.from({ length: 8 }, (_, idx) => g.saved * (0.2 + 0.8 * (idx / 7)) + Math.random() * (g.saved * 0.05));
                const remaining = g.target - g.saved;
                const daysLeft = remaining > 0 ? Math.max(1, Math.ceil(remaining / 5)) : 0;
                return (
                  <div key={g.name} className="goal-card" style={{ "--gc": c } as React.CSSProperties}>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
                      <div style={{ position:"relative", flexShrink:0 }}>
                        <Arc pct={pct} color={c} size={48} strokeWidth={4} />
                        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"11px", color:c, fontFeatureSettings:"'tnum'" }}>{Math.round(pct*100)}%</span>
                        </div>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"3px", gap:"8px" }}>
                          <div style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"14px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{g.name}</div>
                          <Sparkline data={sparkData} color={c} width={56} height={18} />
                        </div>
                        <div style={{ fontSize:"11px", color:"#6b7280", fontFeatureSettings:"'tnum'" }}>
                          <span style={{ color:c, fontWeight:700 }}>${g.saved.toFixed(2)}</span>
                          <span style={{ opacity:.6, margin:"0 4px" }}>/</span>
                          <span>${g.target.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:"10.5px", color:"#6b7280", paddingTop:"10px", borderTop:"1px solid rgba(255,255,255,.05)", gap:"8px" }}>
                      <span style={{ fontFeatureSettings:"'tnum'" }}>${remaining.toFixed(2)} to go {remaining > 0 && <span style={{ opacity:.6 }}>· ~{daysLeft}d at $5/day</span>}</span>
                      <a href={`https://sepolia.basescan.org/address/${VAULT_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="goal-link">
                        BaseScan {Ic.ext}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ACTIVITY */}
          {activities.length > 0 && (
            <div className="dash-section">
              <div className="dash-section-label">
                <span>Recent activity</span>
                <span style={{ color:"#6b7280", textTransform:"none", letterSpacing:0, fontSize:"11px", fontWeight:500 }}>Onchain</span>
              </div>
              <div style={{ borderRadius:"12px", background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.05)", padding:"4px 14px" }}>
                {activities.map(a => (
                  <a key={a.id} href={`https://sepolia.basescan.org/tx/${a.txHash}`} target="_blank" rel="noopener noreferrer" className="activity-row">
                    <div className="activity-icon">
                      {a.type === "deposit" ? Ic.arrowDown : Ic.arrowUp}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:"8px" }}>
                        <span style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"13px", color:"#eef2ff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                          Saved to <span style={{ color:"#94a3b8" }}>{a.goalName}</span>
                        </span>
                        <span style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"13px", color:"#4ade80", fontFeatureSettings:"'tnum'", flexShrink:0 }}>+${a.amount.toFixed(2)}</span>
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"3px" }}>
                        <span style={{ fontSize:"10px", color:"#475569", fontFamily:"var(--FM)" }}>{a.txHash.slice(0,10)}…</span>
                        <span style={{ fontSize:"10px", color:"#6b7280" }}>{timeAgo(a.timestamp)}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* QUICK ACTIONS */}
          <div className="dash-section">
            <div className="dash-section-label"><span>Quick actions</span></div>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {[
                { label:"Check my balance", icon:Ic.target },
                { label:"Withdraw savings", icon:Ic.arrowUp },
                { label:"Save $20 now", icon:Ic.spark },
              ].map(a => (
                <button key={a.label} className="qa-btn" onClick={() => { setShowDash(false); setInput(a.label); setTimeout(() => inputRef.current?.focus(), 100); }}>
                  <span style={{ color:"#818cf8", display:"flex" }}>{a.icon}</span>
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* NETWORK */}
          <div className="dash-section">
            <div className="dash-section-label"><span>Network</span></div>
            <div style={{ padding:"14px", borderRadius:"12px", background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.05)" }}>
              {[
                { l:"Chain", v:"Base Sepolia", c:"#60a5fa", mono:false },
                { l:"Vault", v:`${VAULT_ADDRESS.slice(0,8)}…${VAULT_ADDRESS.slice(-4)}`, c:"#cbd5e1", mono:true, link:`https://sepolia.basescan.org/address/${VAULT_ADDRESS}` },
                { l:"Wallet", v:`${WALLET_ADDRESS.slice(0,8)}…${WALLET_ADDRESS.slice(-4)}`, c:"#cbd5e1", mono:true, link:`https://sepolia.basescan.org/address/${WALLET_ADDRESS}` },
                { l:"Status", v:"Online", c:"#4ade80", mono:false },
              ].map(row => (
                <div key={row.l} style={{ display:"flex", justifyContent:"space-between", fontSize:"12px", marginBottom:"8px", alignItems:"center" }}>
                  <span style={{ color:"#6b7280" }}>{row.l}</span>
                  {row.link ? (
                    <a href={row.link} target="_blank" rel="noopener noreferrer" style={{ color:row.c, fontWeight:600, fontFamily:row.mono?"var(--FM)":"inherit", fontSize:row.mono?"11px":"12px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"5px" }}>
                      {row.v} {Ic.ext}
                    </a>
                  ) : (
                    <span style={{ color:row.c, fontWeight:600, fontFamily:row.mono?"var(--FM)":"inherit", fontSize:row.mono?"11px":"12px" }}>{row.v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        <button className="mobile-nav-btn active">
          {Ic.chat}
          Chat
        </button>
        <button className="mobile-nav-btn" onClick={() => router.push("/pact")}>
          {Ic.pact}
          Pacts
        </button>
        <button className="mobile-nav-btn" onClick={() => router.push("/vaults")}>
          {Ic.vault}
          Vaults
        </button>
        <button className="mobile-nav-btn" onClick={() => setShowDash(p => !p)}>
          {Ic.dash}
          Dashboard
        </button>
      </nav>
    </>
  );
}