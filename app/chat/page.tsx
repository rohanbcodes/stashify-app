"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
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
  home:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  send:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  close: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ext:   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  trend: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  copy:  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  target:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
};

/* ─────────────── TYPES ─────────────── */
type Msg = {
  id: string; role: "user"|"assistant"; content: string;
  type?: "tx"|"normal"; txHash?: string; goalName?: string;
  amount?: number; timestamp: number;
};
type Goal = { name: string; saved: number; target: number; };

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
  return `${Math.floor(s/3600)}h ago`;
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
function Arc({ pct, color, size = 80 }: { pct: number; color: string; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 1));
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(.23,1,.32,1)" }}/>
    </svg>
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
    <div style={{ maxWidth:"340px", borderRadius:"18px", overflow:"hidden", border:"1px solid rgba(74,222,128,.25)", background:"linear-gradient(135deg,rgba(34,197,94,.07),rgba(74,222,128,.04))", boxShadow:"0 8px 32px rgba(74,222,128,.08)" }}>
      <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(74,222,128,.12)", display:"flex", alignItems:"center", gap:"10px" }}>
        <div style={{ width:"30px", height:"30px", borderRadius:"50%", background:"rgba(74,222,128,.15)", border:"1px solid rgba(74,222,128,.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#4ade80", flexShrink:0 }}>
          {Ic.check}
        </div>
        <div>
          <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"14px", color:"#4ade80" }}>Transaction confirmed</div>
          <div style={{ fontSize:"11px", color:"#6b7280", marginTop:"1px" }}>Base Sepolia · Instant</div>
        </div>
      </div>
      <div style={{ padding:"14px 18px" }}>
        {msg.goalName && (
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
            <span style={{ fontSize:"12px", color:"#6b7280" }}>Goal</span>
            <span style={{ fontSize:"12px", fontWeight:600, color:"#eef2ff" }}>{msg.goalName}</span>
          </div>
        )}
        {msg.amount && (
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
            <span style={{ fontSize:"12px", color:"#6b7280" }}>Amount saved</span>
            <span style={{ fontFamily:"var(--FD)", fontSize:"17px", fontWeight:900, color:"#4ade80" }}>${msg.amount} USDC</span>
          </div>
        )}
        {msg.txHash && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"8px", borderTop:"1px solid rgba(255,255,255,.06)" }}>
            <span style={{ fontSize:"11px", color:"#4b5563", fontFamily:"monospace" }}>{msg.txHash}</span>
            <span style={{ color:"#6366f1" }}>{Ic.ext}</span>
          </div>
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
          {showMeta && (
            <span style={{ fontSize:"10px", color:"#4b5563", whiteSpace:"nowrap", paddingBottom:"2px", transition:"opacity 0.2s" }}>
              {timeAgo(msg.timestamp)}
            </span>
          )}
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
          {/* Hover actions */}
          <div style={{ display:"flex", gap:"6px", opacity: showMeta ? 1 : 0, transition:"opacity 0.2s", paddingLeft:"2px" }}>
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

/* ─────────────── GOAL PROGRESS CHIP ─────────────── */
function GoalChip({ goals, totalSaved, onClick }: { goals: Goal[]; totalSaved: number; onClick: () => void }) {
  if (goals.length === 0) return null;
  const topGoal = goals[0];
  const pct = Math.min((topGoal.saved / topGoal.target) * 100, 100);
  return (
    <div onClick={onClick} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"5px 12px", borderRadius:"100px", background:"rgba(99,102,241,.1)", border:"1px solid rgba(99,102,241,.2)", cursor:"pointer", transition:"all 0.2s" }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="rgba(99,102,241,.16)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="rgba(99,102,241,.1)"}>
      <div style={{ position:"relative", width:"22px", height:"22px" }}>
        <svg width="22" height="22" style={{ transform:"rotate(-90deg)", position:"absolute" }}>
          <circle cx="11" cy="11" r="8" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="2.5"/>
          <circle cx="11" cy="11" r="8" fill="none" stroke="#6366f1" strokeWidth="2.5"
            strokeDasharray={50.3} strokeDashoffset={50.3 * (1 - pct/100)} strokeLinecap="round"/>
        </svg>
      </div>
      <span style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"12px", color:"#eef2ff", maxWidth:"100px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{topGoal.name}</span>
      <span style={{ fontSize:"11px", color:"#818cf8", fontWeight:600 }}>{Math.round(pct)}%</span>
      <div style={{ width:"1px", height:"12px", background:"rgba(255,255,255,.1)" }} />
      <span style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"12px", color:"#4ade80" }}>${totalSaved.toFixed(0)}</span>
    </div>
  );
}

/* ─────────────── ONBOARDING SEQUENCE ─────────────── */
const ONBOARDING: Msg[] = [
  { id:"o1", role:"assistant", type:"normal", content:"Good to meet you. I'm Stashify.", timestamp: Date.now() - 4000 },
  { id:"o2", role:"assistant", type:"normal", content:"I move real USDC onchain the moment you tell me to save. No banks. No forms. Just you and Base.", timestamp: Date.now() - 2000 },
  { id:"o3", role:"assistant", type:"normal", content:`${getGreeting()}. What's the first thing you want to save for?`, timestamp: Date.now() },
];

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

  // Determine if returning user (has goals onchain)
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showDash, setShowDash] = useState(false);
  const [latestMsgId, setLatestMsgId] = useState<string|null>(null);
  const [ambientState, setAmbientState] = useState<"idle"|"thinking"|"success">("idle");
  const [confettiActive, setConfettiActive] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const overallPct = totalTarget > 0 ? totalSaved / totalTarget : 0;
  const goalColors = ["#6366f1","#3b82f6","#8b5cf6","#4ade80","#f59e0b"];

  // Initialize: fetch goals first, then show appropriate greeting
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    (async () => {
      const onchainGoals = await fetchOnchainGoals();
      setGoals(onchainGoals);
      if (onchainGoals.length > 0) {
        // Returning user
        setMsgs([{
          id: "welcome-back",
          role: "assistant",
          type: "normal",
          content: `${getGreeting()}! You have $${onchainGoals.reduce((s,g)=>s+g.saved,0).toFixed(2)} saved across ${onchainGoals.length} goal${onchainGoals.length>1?"s":""}. What would you like to do today?`,
          timestamp: Date.now(),
        }]);
      } else {
        // New user — staggered onboarding sequence
        setTimeout(() => setMsgs([ONBOARDING[0]]), 300);
        setTimeout(() => setMsgs(p => [...p, ONBOARDING[1]]), 1800);
        setTimeout(() => setMsgs(p => [...p, ONBOARDING[2]]), 3400);
      }
    })();
  }, []);

  // Scroll to bottom
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, loading]);

  // Auto-resize textarea
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
        setSessionSaved(s => s + (data.goalUpdate?.amount || 0));
        setTimeout(() => { setConfettiActive(false); setAmbientState("idle"); }, 3000);

        // Optimistic update
        setGoals(p => {
          const ex = p.find(g => g.name.toLowerCase() === data.goalUpdate.name.toLowerCase());
          if (ex) return p.map(g => g.name.toLowerCase() === data.goalUpdate.name.toLowerCase()
            ? { ...g, saved: g.saved + data.goalUpdate.amount } : g);
          return [...p, { name: data.goalUpdate.name, saved: data.goalUpdate.amount, target: data.goalUpdate.target || data.goalUpdate.amount * 3 }];
        });

        // Re-sync with chain after 4s
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
  const showQuickReplies = !loading && lastAiMsg && msgs.length > 2;
  const showSessionSummary = msgs.filter(m => m.type === "tx").length >= 2;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root {
          --bg:#060912; --sur:rgba(255,255,255,.035); --bor:rgba(255,255,255,.07);
          --t1:#eef2ff; --t2:#6b7280; --t3:#1f2937;
          --grad:linear-gradient(135deg,#3b82f6,#8b5cf6);
          --FD:'Cabinet Grotesk',sans-serif; --FB:'Instrument Sans',sans-serif;
        }
        body { background:var(--bg); color:var(--t1); font-family:var(--FB); overflow:hidden; height:100vh; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(99,102,241,.2); border-radius:3px; }

        .app-shell { display:flex; height:100vh; overflow:hidden; position:relative; z-index:2; }

        /* ── SIDEBAR ── */
        .sidebar {
          width:64px; flex-shrink:0; display:flex; flex-direction:column;
          align-items:center; padding:16px 0; gap:4px;
          background:rgba(4,8,15,.96);
          border-right:1px solid rgba(255,255,255,.06);
          backdrop-filter:blur(24px); z-index:20;
        }
        .sb-logo { margin-bottom:16px; padding:8px; cursor:pointer; }
        .sb-logo:hover { opacity:0.8; }
        .sb-btn {
          width:44px; height:44px; border-radius:13px;
          display:flex; align-items:center; justify-content:center;
          color:var(--t2); cursor:pointer; border:none; background:transparent;
          transition:color .2s, background .2s, transform .2s; position:relative;
        }
        .sb-btn:hover { color:var(--t1); background:rgba(255,255,255,.06); transform:scale(1.08); }
        .sb-btn:active { transform:scale(0.95); }
        .sb-btn.active { color:white; background:rgba(99,102,241,.18); }
        .sb-btn.active::before {
          content:''; position:absolute; left:-1px; top:50%; transform:translateY(-50%);
          width:3px; height:20px; background:var(--grad); border-radius:0 3px 3px 0;
          animation:sidebarPill 0.3s ease forwards;
        }
        @keyframes sidebarPill { from{height:0;opacity:0} to{height:20px;opacity:1} }
        .sb-tooltip {
          position:absolute; left:58px; top:50%; transform:translateY(-50%);
          background:rgba(8,12,24,.98); border:1px solid rgba(255,255,255,.1);
          color:white; font-size:12px; font-weight:600; padding:5px 11px; border-radius:9px;
          white-space:nowrap; opacity:0; pointer-events:none;
          transition:opacity .15s, transform .15s;
          transform:translateY(-50%) translateX(-4px);
          font-family:var(--FB); z-index:100;
        }
        .sb-btn:hover .sb-tooltip { opacity:1; transform:translateY(-50%) translateX(0); }
        .sb-divider { width:32px; height:1px; background:rgba(255,255,255,.06); margin:6px 0; }
        .sb-bottom { margin-top:auto; display:flex; flex-direction:column; align-items:center; gap:8px; padding:0 0 8px; }

        /* ── MAIN ── */
        .main-area { flex:1; display:flex; flex-direction:column; overflow:hidden; position:relative; }

        /* ── TOP BAR ── */
        .top-bar {
          display:flex; align-items:center; justify-content:space-between;
          padding:0 24px; height:56px; flex-shrink:0;
          border-bottom:1px solid rgba(255,255,255,.05);
          background:rgba(4,8,15,.88); backdrop-filter:blur(24px);
        }

        /* ── MESSAGES ── */
        .msgs { flex:1; overflow-y:auto; padding:32px 0 16px; display:flex; flex-direction:column; }
        .msgs-inner {
          max-width:720px; margin:0 auto; width:100%; padding:0 24px;
          display:flex; flex-direction:column; gap:18px;
        }

        /* ── BUBBLES ── */
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

        /* ── THINKING ── */
        .thinking {
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          border-radius:18px 18px 18px 4px; overflow:hidden;
        }

        /* ── QUICK REPLY BUTTONS ── */
        .qr-btn {
          font-size:12px; font-weight:500; padding:7px 14px;
          border-radius:100px; border:1px solid rgba(99,102,241,.3);
          background:rgba(99,102,241,.07); color:#818cf8;
          cursor:pointer; white-space:nowrap;
          transition:all .2s ease; font-family:var(--FB);
        }
        .qr-btn:hover { color:white; border-color:rgba(99,102,241,.55); background:rgba(99,102,241,.16); transform:translateY(-1px); }

        /* ── SUGGESTED PROMPTS ── */
        .prompt-btn {
          font-size:12px; font-weight:500; padding:8px 16px;
          border-radius:100px; border:1px solid rgba(255,255,255,.09);
          background:rgba(255,255,255,.03); color:var(--t2);
          cursor:pointer; white-space:nowrap; transition:all .2s; font-family:var(--FB);
        }
        .prompt-btn:hover { color:var(--t1); border-color:rgba(99,102,241,.35); background:rgba(99,102,241,.07); transform:translateY(-1px); }

        /* ── INPUT AREA ── */
        .input-area {
          flex-shrink:0; padding:14px 24px 18px;
          background:rgba(4,8,15,.9); backdrop-filter:blur(24px);
          border-top:1px solid rgba(255,255,255,.05);
        }
        .input-wrap {
          max-width:720px; margin:0 auto;
          display:flex; align-items:center; gap:12px;
          padding:12px 16px; border-radius:20px;
          border:1px solid rgba(255,255,255,.09);
          background:rgba(255,255,255,.04);
          transition:border-color .3s, box-shadow .3s;
          position:relative;
        }
        .input-wrap:focus-within {
          border-color:rgba(99,102,241,.5);
          box-shadow:0 0 0 3px rgba(99,102,241,.09), 0 8px 32px rgba(0,0,0,.3);
        }
        .input-ta {
          flex:1; background:transparent; border:none; outline:none;
          color:var(--t1); font-family:var(--FB); font-size:14px; line-height:1.6;
          resize:none; min-height:22px; max-height:120px; scrollbar-width:none;
        }
        .input-ta::placeholder { color:#2d3748; }
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
        .send-btn:disabled { opacity:.3; cursor:default; }

        /* ── DASHBOARD PANEL ── */
        .dash-panel {
          position:absolute; top:0; right:0; bottom:0; width:340px;
          background:rgba(6,10,20,.97); backdrop-filter:blur(36px);
          border-left:1px solid rgba(255,255,255,.07);
          z-index:30; display:flex; flex-direction:column;
          transform:translateX(100%);
          transition:transform .45s cubic-bezier(.23,1,.32,1);
          box-shadow:-20px 0 60px rgba(0,0,0,.4);
        }
        .dash-panel.open { transform:translateX(0); }
        .dash-header { padding:20px 24px 16px; border-bottom:1px solid rgba(255,255,255,.06); display:flex; align-items:center; justify-content:space-between; }
        .dash-body { flex:1; overflow-y:auto; padding:20px 24px; }
        .goal-card { background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07); border-radius:14px; padding:16px; margin-bottom:12px; transition:border-color .2s, transform .2s; }
        .goal-card:hover { border-color:rgba(99,102,241,.25); transform:translateY(-1px); }
        .qa-btn {
          width:100%; padding:11px 14px; border-radius:12px;
          background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07);
          color:#94a3b8; font-size:13px; font-family:var(--FB);
          cursor:pointer; text-align:left; transition:all .2s;
        }
        .qa-btn:hover { border-color:rgba(99,102,241,.3); color:#eef2ff; background:rgba(99,102,241,.06); }

        /* ── ANIMATIONS ── */
        @keyframes wave   { 0%,100%{height:6px} 50%{height:22px} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes msgIn  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }

        .msg-enter { animation:msgIn .38s cubic-bezier(.23,1,.32,1) forwards; }
        .fade-in   { animation:fadeIn .4s ease forwards; }

        /* ── NOISE ── */
        .noise { position:fixed; inset:0; pointer-events:none; z-index:1; opacity:.016;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:256px; }

        /* ── MOBILE BOTTOM NAV ── */
        @media (max-width:640px) {
          .sidebar { display:none; }
          .mobile-nav { display:flex !important; }
          body { overflow:auto; }
        }
        .mobile-nav {
          display:none; position:fixed; bottom:0; left:0; right:0; z-index:50;
          background:rgba(4,8,15,.96); border-top:1px solid rgba(255,255,255,.07);
          backdrop-filter:blur(20px); padding:8px 0 env(safe-area-inset-bottom,8px);
        }
        .mobile-nav-btn {
          flex:1; display:flex; flex-direction:column; align-items:center; gap:3px;
          background:none; border:none; cursor:pointer; color:var(--t2);
          font-size:9px; font-family:var(--FB); font-weight:600;
          letter-spacing:.06em; text-transform:uppercase; padding:6px 0;
          transition:color .2s;
        }
        .mobile-nav-btn.active { color:#818cf8; }
      `}</style>

      <AmbientCanvas state={ambientState} />
      <div className="noise" />
      <Confetti active={confettiActive} />

      <div className="app-shell">

        {/* ════ SIDEBAR ════ */}
        <aside className="sidebar">
          <div className="sb-logo" onClick={() => router.push("/")}><Logo size={32} /></div>

          {[
            { icon:Ic.home,  label:"Home",        path:"/",       active:false },
            { icon:Ic.chat,  label:"Chat",         path:"/chat",   active:true },
            { icon:Ic.pact,  label:"Pacts",        path:"/pact",   active:false },
            { icon:Ic.vault, label:"Yield Vaults", path:"/vaults", active:false },
          ].map(item => (
            <button key={item.path} className={`sb-btn ${item.active?"active":""}`}
              onClick={() => !item.active && router.push(item.path)}>
              {item.icon}
              <span className="sb-tooltip">{item.label}</span>
            </button>
          ))}

          <div className="sb-divider" />

          <button className={`sb-btn ${showDash?"active":""}`} onClick={() => setShowDash(p => !p)}>
            {Ic.dash}
            <span className="sb-tooltip">Dashboard</span>
          </button>

          <div className="sb-bottom">
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"3px" }}>
              <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade80" }} />
              <div style={{ fontSize:"9px", color:"#4ade80", fontWeight:600, letterSpacing:".04em", writingMode:"vertical-lr", transform:"rotate(180deg)" }}>BASE</div>
            </div>
          </div>
        </aside>

        {/* ════ MAIN ════ */}
        <div className="main-area">

          {/* Top bar */}
          <div className="top-bar">
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <div>
                <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"15px", letterSpacing:"-.01em" }}>Stashify Chat</div>
                <div style={{ fontSize:"11px", color:"#4ade80", marginTop:"1px" }}>● Connected · Base Sepolia</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              {/* Goal progress chip */}
              <GoalChip goals={goals} totalSaved={totalSaved} onClick={() => setShowDash(p => !p)} />

              <div style={{ fontFamily:"monospace", fontSize:"10px", color:"#374151", padding:"5px 10px", borderRadius:"8px", border:"1px solid rgba(255,255,255,.05)", background:"rgba(255,255,255,.02)" }}>
                {WALLET_ADDRESS.slice(0,6)}...{WALLET_ADDRESS.slice(-4)}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="msgs">
            <div className="msgs-inner">

              {msgs.map((msg, i) => (
                <div key={msg.id} className="msg-enter">
                  <MsgBubble msg={msg} isLatest={msg.id === latestMsgId} />
                </div>
              ))}

              {/* Session summary after 2+ transactions */}
              {showSessionSummary && <SessionSummary msgs={msgs} />}

              {/* Thinking */}
              {loading && (
                <div className="msg-enter" style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                  <div style={{ width:"28px", height:"28px", flexShrink:0 }}><Logo size={28} /></div>
                  <div className="thinking"><Waveform /></div>
                </div>
              )}

              {/* Context-aware quick replies */}
              {showQuickReplies && lastAiMsg && (
                <QuickReplies
                  lastMsg={lastAiMsg}
                  onSelect={text => { setInput(text); setTimeout(() => inputRef.current?.focus(), 50); }}
                />
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Suggested prompts — only on fresh session */}
          {msgs.length <= 3 && !loading && (
            <div style={{ padding:"0 24px 10px", display:"flex", justifyContent:"center" }}>
              <div style={{ maxWidth:"720px", width:"100%", display:"flex", flexWrap:"wrap", gap:"8px" }}>
                {[
                  "Save $50 for new Jordans",
                  "Save $200 for a laptop",
                  "Check my savings balance",
                  "What are my current goals?",
                ].map(p => (
                  <button key={p} className="prompt-btn" onClick={() => send(p)}>{p}</button>
                ))}
              </div>
            </div>
          )}

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
            <p style={{ textAlign:"center", fontSize:"11px", color:"#1f2937", marginTop:"8px" }}>
              Stashify moves real USDC on Base Sepolia · Always in your control
            </p>
          </div>
        </div>

        {/* ════ DASHBOARD PANEL ════ */}
        <div className={`dash-panel ${showDash?"open":""}`}>
          <div className="dash-header">
            <div>
              <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"16px" }}>Dashboard</div>
              <div style={{ fontSize:"12px", color:"#6b7280", marginTop:"2px" }}>Your savings overview</div>
            </div>
            <button onClick={() => setShowDash(false)} style={{ width:"30px", height:"30px", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)", cursor:"pointer", color:"#6b7280", transition:"all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.1)"; (e.currentTarget as HTMLElement).style.color="#eef2ff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.05)"; (e.currentTarget as HTMLElement).style.color="#6b7280"; }}>
              {Ic.close}
            </button>
          </div>

          <div className="dash-body">
            {/* Total arc card */}
            <div style={{ display:"flex", alignItems:"center", gap:"20px", padding:"20px", borderRadius:"18px", background:"linear-gradient(135deg,rgba(59,130,246,.08),rgba(139,92,246,.08))", border:"1px solid rgba(99,102,241,.15)", marginBottom:"20px" }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <Arc pct={overallPct} color="#6366f1" size={80} />
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"14px" }}>{Math.round(overallPct*100)}%</span>
                </div>
              </div>
              <div>
                <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"28px", letterSpacing:"-.03em", background:"linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  ${totalSaved.toFixed(2)}
                </div>
                <div style={{ fontSize:"12px", color:"#6b7280", marginTop:"3px" }}>of ${totalTarget.toFixed(0)} target</div>
                <div style={{ fontSize:"11px", color:"#4ade80", marginTop:"6px", fontWeight:600 }}>{goals.length} active goal{goals.length!==1?"s":""}</div>
              </div>
            </div>

            {/* Goals list */}
            {goals.length === 0 ? (
              <div style={{ textAlign:"center", padding:"40px 20px" }}>
                <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:"rgba(99,102,241,.1)", border:"1px solid rgba(99,102,241,.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", color:"#818cf8" }}>{Ic.target}</div>
                <p style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"15px", marginBottom:"8px" }}>No goals yet</p>
                <p style={{ fontSize:"13px", color:"#6b7280", lineHeight:1.6 }}>Tell the AI what you want to save for and your first goal will appear here.</p>
              </div>
            ) : (
              <div>
                <p style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"11px", color:"#6b7280", letterSpacing:".1em", textTransform:"uppercase", marginBottom:"12px" }}>Active goals</p>
                {goals.map((g, i) => {
                  const pct = Math.min(g.saved/g.target, 1);
                  const c = goalColors[i % goalColors.length];
                  return (
                    <div key={g.name} className="goal-card">
                      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
                        <div style={{ position:"relative", flexShrink:0 }}>
                          <Arc pct={pct} color={c} size={44} />
                          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <span style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"10px", color:c }}>{Math.round(pct*100)}%</span>
                          </div>
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"14px", marginBottom:"3px" }}>{g.name}</div>
                          <div style={{ fontSize:"11px", color:"#6b7280" }}>
                            <span style={{ color:c, fontWeight:700 }}>${g.saved.toFixed(2)}</span> / ${g.target.toFixed(0)}
                          </div>
                        </div>
                      </div>
                      <div style={{ height:"4px", borderRadius:"2px", background:"rgba(255,255,255,.06)", overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${pct*100}%`, borderRadius:"2px", background:`linear-gradient(90deg,${c}88,${c})`, transition:"width 1.2s cubic-bezier(.23,1,.32,1)" }} />
                      </div>
                      <div style={{ marginTop:"8px", fontSize:"11px", color:"#6b7280" }}>${(g.target-g.saved).toFixed(2)} to go</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick actions */}
            <div style={{ marginTop:"20px" }}>
              <p style={{ fontFamily:"var(--FD)", fontWeight:700, fontSize:"11px", color:"#6b7280", letterSpacing:".1em", textTransform:"uppercase", marginBottom:"12px" }}>Quick actions</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                {["Check my balance","Withdraw savings","Save $20 now"].map(a => (
                  <button key={a} className="qa-btn" onClick={() => { setShowDash(false); setInput(a); setTimeout(() => inputRef.current?.focus(), 100); }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Network */}
            <div style={{ marginTop:"20px", padding:"14px", borderRadius:"12px", background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.05)" }}>
              <p style={{ fontSize:"11px", color:"#6b7280", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", marginBottom:"10px" }}>Network</p>
              {[
                { l:"Chain", v:"Base Sepolia", c:"#60a5fa" },
                { l:"Vault", v:`${VAULT_ADDRESS.slice(0,8)}...${VAULT_ADDRESS.slice(-4)}`, c:"#4b5563", mono:true },
                { l:"Status", v:"● Online", c:"#4ade80" },
              ].map(row => (
                <div key={row.l} style={{ display:"flex", justifyContent:"space-between", fontSize:"12px", marginBottom:"6px" }}>
                  <span style={{ color:"#6b7280" }}>{row.l}</span>
                  <span style={{ color:row.c, fontWeight:600, fontFamily:row.mono?"monospace":"inherit", fontSize:row.mono?"11px":"12px" }}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        {[
          { icon:Ic.home,  label:"Home",    path:"/" },
          { icon:Ic.chat,  label:"Chat",    path:"/chat",   active:true },
          { icon:Ic.pact,  label:"Pacts",   path:"/pact" },
          { icon:Ic.vault, label:"Vaults",  path:"/vaults" },
        ].map(item => (
          <button key={item.path} className={`mobile-nav-btn ${item.active?"active":""}`}
            onClick={() => !item.active && router.push(item.path)}>
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
}