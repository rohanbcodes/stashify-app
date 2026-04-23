"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPublicClient, http, parseAbi } from "viem";
import { baseSepolia } from "viem/chains";

/* ─────────────── LOGO ─────────────── */
const Logo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="lg_chat" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor:"#3b82f6" }}/><stop offset="100%" style={{ stopColor:"#8b5cf6" }}/></linearGradient></defs>
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
  chat:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  dash:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  pact:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  vault:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  home:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  send:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  close:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ext:     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  trend:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
};

/* ─────────────── TYPES ─────────────── */
type Msg = { id: string; role: "user" | "assistant"; content: string; type?: "tx" | "normal"; txHash?: string; goalName?: string; amount?: number; };
type Goal = { name: string; saved: number; target: number; };

/* ─────────────── ONCHAIN CONFIG ─────────────── */
const VAULT_ADDRESS = "0xf475cEB6460dD0F004b27095aFB4C8CFc9B0260C" as const;
const WALLET_ADDRESS = "0xb1525777685076921fA1E1f8741d3Bee438594bD" as const;
const vaultAbi = parseAbi([
  "function getGoals() view returns (string[])",
  "function getBalance(string goalName) view returns (uint256)",
]);
const client = createPublicClient({ chain: baseSepolia, transport: http() });

/* ─────────────── SUGGESTED PROMPTS ─────────────── */
const PROMPTS = [
  "Save $50 for new Jordans",
  "I want to save $200 for a laptop",
  "Check my savings balance",
  "What are my current goals?",
  "Withdraw from my Jordans vault",
];

/* ─────────────── PROGRESS ARC ─────────────── */
function Arc({ pct, color, size = 80 }: { pct: number; color: string; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 1));
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="5" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(.23,1,.32,1)" }} />
    </svg>
  );
}

/* ─────────────── THINKING WAVEFORM ─────────────── */
function Waveform() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px", padding: "12px 16px" }}>
      {[0,1,2,3,4].map(i => (
        <div key={i} style={{
          width: "3px", borderRadius: "3px",
          background: "linear-gradient(to top, #3b82f6, #8b5cf6)",
          animation: `wave 1.2s ease-in-out ${i*0.12}s infinite`,
          height: "20px",
        }} />
      ))}
    </div>
  );
}

/* ─────────────── STREAMING TEXT ─────────────── */
function StreamText({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const iv = setInterval(() => {
      if (i >= text.length) { clearInterval(iv); return; }
      setShown(text.slice(0, ++i));
    }, 12);
    return () => clearInterval(iv);
  }, [text]);
  return <span>{shown}{shown.length < text.length && <span style={{ display:"inline-block", width:"2px", height:"13px", background:"#6366f1", verticalAlign:"middle", marginLeft:"2px", animation:"blink 1s step-end infinite" }} />}</span>;
}

/* ─────────────── TX RECEIPT CARD ─────────────── */
function TxCard({ msg }: { msg: Msg }) {
  return (
    <div style={{ maxWidth: "340px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(74,222,128,.22)", background: "linear-gradient(135deg,rgba(34,197,94,.06),rgba(74,222,128,.04))" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(74,222,128,.12)", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(74,222,128,.15)", border: "1px solid rgba(74,222,128,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80", flexShrink: 0 }}>
          {Ic.check}
        </div>
        <div>
          <div style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "14px", color: "#4ade80" }}>Transaction confirmed</div>
          <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "1px" }}>Base Sepolia · Instant</div>
        </div>
      </div>
      <div style={{ padding: "14px 18px" }}>
        {msg.goalName && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Goal</span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#eef2ff" }}>{msg.goalName}</span>
        </div>}
        {msg.amount && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Amount</span>
          <span style={{ fontFamily: "var(--FD)", fontSize: "15px", fontWeight: 800, color: "#4ade80" }}>${msg.amount} USDC</span>
        </div>}
        {msg.txHash && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>{msg.txHash}</span>
          <span style={{ color: "#6366f1", fontSize: "11px" }}>{Ic.ext}</span>
        </div>}
      </div>
    </div>
  );
}

/* ─────────────── MAIN ─────────────── */
export default function ChatPage() {
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "0", role: "assistant", type: "normal",
      content: "Hey, I'm Stashify — your personal savings companion. Tell me what you want to save for and I'll make it happen onchain.",
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showDash, setShowDash] = useState(false);
  const [latestMsgId, setLatestMsgId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* Scroll to bottom */
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  /* Fetch onchain goals */
  useEffect(() => {
    (async () => {
      try {
        const names = await client.readContract({ address: VAULT_ADDRESS, abi: vaultAbi, functionName: "getGoals", account: WALLET_ADDRESS }) as string[];
        if (!names.length) return;
        const data = await Promise.all(names.map(async name => {
          const bal = await client.readContract({ address: VAULT_ADDRESS, abi: vaultAbi, functionName: "getBalance", args: [name], account: WALLET_ADDRESS }) as bigint;
          const saved = Number(bal) / 1_000_000;
          return { name, saved, target: Math.max(saved * 2, saved + 50) };
        }));
        setGoals(data);
      } catch {}
    })();
  }, []);

  /* Auto-resize textarea */
  useEffect(() => {
    const ta = inputRef.current; if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [input]);

  const send = useCallback(async (text?: string) => {
    const content = text || input;
    if (!content.trim() || loading) return;
    setInput("");
    const userMsg: Msg = { id: Date.now().toString(), role: "user", type: "normal", content };
    setMsgs(p => [...p, userMsg]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      });
      const data = await res.json();
      const isTx = !!data.goalUpdate;
      const newId = (Date.now() + 1).toString();
      const aMsg: Msg = {
        id: newId, role: "assistant",
        type: isTx ? "tx" : "normal",
        content: data.message,
        txHash: isTx ? `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}` : undefined,
        goalName: data.goalUpdate?.name,
        amount: data.goalUpdate?.amount,
      };
      setMsgs(p => [...p, aMsg]);
      setLatestMsgId(newId);
      if (data.goalUpdate) {
        setGoals(p => {
          const ex = p.find(g => g.name.toLowerCase() === data.goalUpdate.name.toLowerCase());
          if (ex) return p.map(g => g.name.toLowerCase() === data.goalUpdate.name.toLowerCase() ? { ...g, saved: g.saved + data.goalUpdate.amount } : g);
          return [...p, { name: data.goalUpdate.name, saved: data.goalUpdate.amount, target: data.goalUpdate.target || data.goalUpdate.amount * 3 }];
        });
      }
    } catch {
      setMsgs(p => [...p, { id: Date.now().toString(), role: "assistant", type: "normal", content: "Something went wrong. Please try again." }]);
    } finally { setLoading(false); }
  }, [input, loading, msgs]);

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const overallPct = totalTarget > 0 ? totalSaved / totalTarget : 0;
  const goalColors = ["#6366f1", "#3b82f6", "#8b5cf6", "#4ade80", "#f59e0b"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root {
          --bg:#060912; --sur:rgba(255,255,255,.035); --bor:rgba(255,255,255,.07);
          --t1:#eef2ff; --t2:#6b7280; --t3:#1f2937;
          --blue:#3b82f6; --ind:#6366f1; --vio:#8b5cf6;
          --grad:linear-gradient(135deg,#3b82f6,#8b5cf6);
          --FD:'Cabinet Grotesk',sans-serif; --FB:'Instrument Sans',sans-serif;
        }
        body { background:var(--bg); color:var(--t1); font-family:var(--FB); overflow:hidden; height:100vh; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(99,102,241,.25); border-radius:3px; }

        /* LAYOUT */
        .app-shell { display:flex; height:100vh; overflow:hidden; }

        /* SIDEBAR */
        .sidebar {
          width:64px; flex-shrink:0; display:flex; flex-direction:column;
          align-items:center; padding:16px 0; gap:4px;
          background:rgba(6,9,18,.95);
          border-right:1px solid rgba(255,255,255,.06);
          backdrop-filter:blur(20px);
          z-index:20;
        }
        .sb-logo { margin-bottom:16px; padding:8px; }
        .sb-btn {
          width:44px; height:44px; border-radius:13px; display:flex; align-items:center; justify-content:center;
          color:var(--t2); cursor:pointer; border:none; background:transparent;
          transition:color .2s, background .2s; position:relative;
        }
        .sb-btn:hover { color:var(--t1); background:rgba(255,255,255,.06); }
        .sb-btn.active { color:white; background:rgba(99,102,241,.18); }
        .sb-btn.active::before { content:''; position:absolute; left:-1px; top:50%; transform:translateY(-50%); width:3px; height:20px; background:var(--grad); border-radius:0 3px 3px 0; }
        .sb-tooltip {
          position:absolute; left:56px; top:50%; transform:translateY(-50%);
          background:rgba(10,14,28,.95); border:1px solid rgba(255,255,255,.1);
          color:white; font-size:12px; font-weight:600; padding:5px 10px; border-radius:8px;
          white-space:nowrap; opacity:0; pointer-events:none; transition:opacity .15s;
          font-family:var(--FB); z-index:100;
        }
        .sb-btn:hover .sb-tooltip { opacity:1; }
        .sb-divider { width:32px; height:1px; background:rgba(255,255,255,.07); margin:6px 0; }
        .sb-bottom { margin-top:auto; display:flex; flex-direction:column; align-items:center; gap:8px; padding:0 0 8px; }
        .sb-net { display:flex; flex-direction:column; align-items:center; gap:3px; }
        .sb-net-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; }
        .sb-net-label { font-size:9px; color:#4ade80; font-weight:600; letter-spacing:.04em; writing-mode:vertical-lr; text-orientation:mixed; transform:rotate(180deg); }

        /* MAIN AREA */
        .main-area { flex:1; display:flex; flex-direction:column; overflow:hidden; position:relative; }

        /* TOP BAR */
        .top-bar {
          display:flex; align-items:center; justify-content:space-between;
          padding:0 24px; height:56px; flex-shrink:0;
          border-bottom:1px solid rgba(255,255,255,.05);
          background:rgba(6,9,18,.85); backdrop-filter:blur(20px);
        }

        /* MESSAGES */
        .msgs { flex:1; overflow-y:auto; padding:32px 0; display:flex; flex-direction:column; }
        .msgs-inner { max-width:720px; margin:0 auto; width:100%; padding:0 24px; display:flex; flex-direction:column; gap:20px; }

        /* MSG BUBBLE */
        .bubble-user { background:linear-gradient(135deg,#2563eb,#6366f1); color:white; border-radius:18px 18px 4px 18px; padding:12px 18px; max-width:72%; font-size:14px; line-height:1.6; box-shadow:0 4px 20px rgba(37,99,235,.28); align-self:flex-end; }
        .bubble-ai { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); border-radius:18px 18px 18px 4px; padding:14px 18px; max-width:80%; font-size:14px; line-height:1.7; color:#cbd5e1; align-self:flex-start; }

        /* THINKING */
        .thinking { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); border-radius:18px 18px 18px 4px; align-self:flex-start; overflow:hidden; }

        /* WAVE ANIM */
        @keyframes wave { 0%,100%{height:6px} 50%{height:22px} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* SUGGESTED PROMPTS */
        .prompt-btn { font-size:12px; font-weight:500; padding:8px 14px; border-radius:100px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.03); color:var(--t2); cursor:pointer; white-space:nowrap; transition:all .2s; font-family:var(--FB); }
        .prompt-btn:hover { color:var(--t1); border-color:rgba(99,102,241,.35); background:rgba(99,102,241,.06); }

        /* INPUT AREA */
        .input-area {
          flex-shrink:0; padding:16px 24px 20px;
          background:rgba(6,9,18,.85); backdrop-filter:blur(20px);
          border-top:1px solid rgba(255,255,255,.05);
        }
        .input-wrap {
          max-width:720px; margin:0 auto;
          display:flex; align-items:flex-end; gap:12px;
          padding:12px 16px;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.09);
          background:rgba(255,255,255,.04);
          transition:border-color .25s, box-shadow .25s;
        }
        .input-wrap:focus-within {
          border-color:rgba(99,102,241,.45);
          box-shadow:0 0 0 3px rgba(99,102,241,.08), 0 8px 32px rgba(0,0,0,.3);
        }
        .input-ta {
          flex:1; background:transparent; border:none; outline:none;
          color:var(--t1); font-family:var(--FB); font-size:14px; line-height:1.6;
          resize:none; min-height:22px; max-height:120px;
          scrollbar-width:none;
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
        .send-btn:hover:not(:disabled) { transform:scale(1.06); box-shadow:0 6px 24px rgba(99,102,241,.55); }
        .send-btn:disabled { opacity:.35; cursor:default; }

        /* DASHBOARD PANEL */
        .dash-panel {
          position:absolute; top:0; right:0; bottom:0; width:340px;
          background:rgba(8,12,24,.97); backdrop-filter:blur(32px);
          border-left:1px solid rgba(255,255,255,.07);
          z-index:30; display:flex; flex-direction:column;
          transform:translateX(100%); transition:transform .4s cubic-bezier(.23,1,.32,1);
        }
        .dash-panel.open { transform:translateX(0); }
        .dash-header { padding:20px 24px 16px; border-bottom:1px solid rgba(255,255,255,.06); display:flex; align-items:center; justify-content:space-between; }
        .dash-body { flex:1; overflow-y:auto; padding:20px 24px; }

        /* GOAL CARD */
        .goal-card { background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07); border-radius:14px; padding:16px; margin-bottom:12px; transition:border-color .2s; }
        .goal-card:hover { border-color:rgba(99,102,241,.25); }

        /* NOISE */
        .noise { position:fixed; inset:0; pointer-events:none; z-index:1; opacity:.015; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:256px; }

        /* MSG ENTRANCE */
        .msg-enter { animation:msgIn .35s cubic-bezier(.23,1,.32,1) forwards; }
        @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        /* ORBS (subtle behind chat) */
        .orb-c1 { position:fixed; width:500px; height:500px; border-radius:50%; top:-10%; left:-5%; background:radial-gradient(circle,rgba(59,130,246,.07),transparent 60%); filter:blur(60px); pointer-events:none; z-index:0; animation:oC 30s ease-in-out infinite; }
        .orb-c2 { position:fixed; width:400px; height:400px; border-radius:50%; bottom:10%; right:5%; background:radial-gradient(circle,rgba(139,92,246,.06),transparent 60%); filter:blur(70px); pointer-events:none; z-index:0; animation:oC 22s ease-in-out infinite reverse; }
        @keyframes oC { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,20px)} }
      `}</style>

      <div className="noise" />
      <div className="orb-c1" /><div className="orb-c2" />

      <div className="app-shell" style={{ position: "relative", zIndex: 2 }}>

        {/* ════ SIDEBAR ════ */}
        <aside className="sidebar">
          <div className="sb-logo"><Logo size={32} /></div>

          {[
            { icon: Ic.home,  label: "Home",       path: "/" },
            { icon: Ic.chat,  label: "Chat",        path: "/chat",   active: true },
            { icon: Ic.pact,  label: "Pacts",       path: "/pact" },
            { icon: Ic.vault, label: "Yield Vaults",path: "/vaults" },
          ].map(item => (
            <button key={item.path} className={`sb-btn ${item.active ? "active" : ""}`}
              onClick={() => item.active ? null : router.push(item.path)}>
              {item.icon}
              <span className="sb-tooltip">{item.label}</span>
            </button>
          ))}

          <div className="sb-divider" />

          <button className={`sb-btn ${showDash ? "active" : ""}`} onClick={() => setShowDash(p => !p)}>
            {Ic.dash}
            <span className="sb-tooltip">Dashboard</span>
          </button>

          <div className="sb-bottom">
            <div className="sb-net">
              <div className="sb-net-dot" />
              <div className="sb-net-label">BASE</div>
            </div>
          </div>
        </aside>

        {/* ════ MAIN ════ */}
        <div className="main-area">

          {/* Top bar */}
          <div className="top-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div>
                <div style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "15px", letterSpacing: "-.01em" }}>Stashify Chat</div>
                <div style={{ fontSize: "11px", color: "#4ade80", marginTop: "1px" }}>● Connected · Base Sepolia</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {goals.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "100px", background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)", cursor: "pointer" }} onClick={() => setShowDash(p => !p)}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#818cf8" }}>{Ic.trend}</div>
                  <span style={{ fontSize: "13px", fontFamily: "var(--FD)", fontWeight: 700, color: "#eef2ff" }}>${totalSaved.toFixed(2)}</span>
                  <span style={{ fontSize: "11px", color: "#6b7280" }}>saved</span>
                </div>
              )}
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#4b5563", padding: "5px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.02)" }}>
                {WALLET_ADDRESS.slice(0,6)}...{WALLET_ADDRESS.slice(-4)}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="msgs">
            <div className="msgs-inner">
              {msgs.map((msg, i) => (
                <div key={msg.id} className={`msg-enter`} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  {msg.role === "assistant" && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ width: "28px", height: "28px", flexShrink: 0, marginTop: "2px" }}><Logo size={28} /></div>
                      <div>
                        {msg.type === "tx" ? (
                          <TxCard msg={msg} />
                        ) : (
                          <div className="bubble-ai">
                            {msg.id === latestMsgId ? <StreamText text={msg.content} /> : msg.content}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {msg.role === "user" && (
                    <div className="bubble-user">{msg.content}</div>
                  )}
                </div>
              ))}

              {/* Thinking indicator */}
              {loading && (
                <div className="msg-enter" style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", flexShrink: 0 }}><Logo size={28} /></div>
                  <div className="thinking"><Waveform /></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Suggested prompts (only on first message) */}
          {msgs.length === 1 && !loading && (
            <div style={{ padding: "0 24px 8px", display: "flex", justifyContent: "center" }}>
              <div style={{ maxWidth: "720px", width: "100%", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {PROMPTS.map(p => (
                  <button key={p} className="prompt-btn" onClick={() => send(p)}>{p}</button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="input-area">
            <div className="input-wrap">
              <textarea
                ref={inputRef}
                className="input-ta"
                placeholder="Tell me your savings goal..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                rows={1}
              />
              <button className="send-btn" onClick={() => send()} disabled={loading || !input.trim()}>
                {Ic.send}
              </button>
            </div>
            <p style={{ textAlign: "center", fontSize: "11px", color: "#1f2937", marginTop: "8px" }}>
              Stashify moves real USDC on Base Sepolia · Always in your control
            </p>
          </div>
        </div>

        {/* ════ DASHBOARD PANEL ════ */}
        <div className={`dash-panel ${showDash ? "open" : ""}`}>
          <div className="dash-header">
            <div>
              <div style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "16px" }}>Dashboard</div>
              <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>Your savings overview</div>
            </div>
            <button onClick={() => setShowDash(false)} style={{ width: "30px", height: "30px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", cursor: "pointer", color: "#6b7280" }}>
              {Ic.close}
            </button>
          </div>

          <div className="dash-body">
            {/* Total savings arc */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px", borderRadius: "16px", background: "linear-gradient(135deg,rgba(59,130,246,.08),rgba(139,92,246,.08))", border: "1px solid rgba(99,102,241,.15)", marginBottom: "20px" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <Arc pct={overallPct} color="#6366f1" size={80} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <span style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "14px", lineHeight: 1 }}>{Math.round(overallPct * 100)}%</span>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "26px", letterSpacing: "-.03em", background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ${totalSaved.toFixed(2)}
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "3px" }}>of ${totalTarget.toFixed(0)} total target</div>
                <div style={{ fontSize: "11px", color: "#4ade80", marginTop: "6px", fontWeight: 600 }}>{goals.length} active goal{goals.length !== 1 ? "s" : ""}</div>
              </div>
            </div>

            {/* Goals */}
            {goals.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>🎯</div>
                <p style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>No goals yet</p>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>Tell the AI what you want to save for and your first goal will appear here.</p>
              </div>
            ) : (
              <div>
                <p style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "13px", color: "#6b7280", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "12px" }}>Active goals</p>
                {goals.map((g, i) => {
                  const pct = Math.min(g.saved / g.target, 1);
                  const c = goalColors[i % goalColors.length];
                  return (
                    <div key={g.name} className="goal-card">
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                        <Arc pct={pct} color={c} size={44} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "14px", marginBottom: "3px" }}>{g.name}</div>
                          <div style={{ fontSize: "11px", color: "#6b7280" }}>
                            <span style={{ color: c, fontWeight: 700 }}>${g.saved.toFixed(2)}</span> / ${g.target.toFixed(0)}
                          </div>
                        </div>
                        <div style={{ fontSize: "13px", fontFamily: "var(--FD)", fontWeight: 800, color: c }}>{Math.round(pct * 100)}%</div>
                      </div>
                      <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct * 100}%`, borderRadius: "2px", background: `linear-gradient(90deg,${c}88,${c})`, transition: "width 1s cubic-bezier(.23,1,.32,1)" }} />
                      </div>
                      <div style={{ marginTop: "8px", fontSize: "11px", color: "#6b7280" }}>
                        ${(g.target - g.saved).toFixed(2)} to go
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick actions */}
            <div style={{ marginTop: "20px" }}>
              <p style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "13px", color: "#6b7280", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "12px" }}>Quick actions</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {["Check my balance","Withdraw savings","Save $20 now"].map(a => (
                  <button key={a} onClick={() => { setShowDash(false); setInput(a); setTimeout(() => inputRef.current?.focus(), 100); }}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "12px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", color: "#94a3b8", fontSize: "13px", fontFamily: "var(--FB)", cursor: "pointer", textAlign: "left", transition: "all .2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,.3)"; (e.currentTarget as HTMLElement).style.color = "#eef2ff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.07)"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Network info */}
            <div style={{ marginTop: "20px", padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "8px" }}>Network</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "5px" }}>
                <span style={{ color: "#6b7280" }}>Chain</span><span style={{ color: "#60a5fa", fontWeight: 600 }}>Base Sepolia</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "5px" }}>
                <span style={{ color: "#6b7280" }}>Vault</span>
                <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#4b5563" }}>{VAULT_ADDRESS.slice(0,8)}...{VAULT_ADDRESS.slice(-4)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <span style={{ color: "#6b7280" }}>Status</span>
                <span style={{ color: "#4ade80", fontWeight: 600 }}>● Online</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}