"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

/* ─── LOGO ─── */
const Logo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="lg_pact" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor:"#3b82f6" }}/><stop offset="100%" style={{ stopColor:"#8b5cf6" }}/></linearGradient></defs>
    <rect width="200" height="200" rx="44" fill="url(#lg_pact)"/>
    <rect x="35" y="122" width="130" height="58" rx="9" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
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

/* ─── ICONS ─── */
const Ic = {
  home:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  chat:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  pact:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  vault: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  dash:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  lock:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  plus:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  info:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  ext:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  shield:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  back:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
};

/* ─── TYPES ─── */
type PactStatus = "active" | "pending" | "completed";
type Pact = {
  id: string; goalName: string; target: number;
  myAddress: string; myContrib: number;
  partnerAddress: string; partnerContrib: number;
  status: PactStatus; contractAddress: string;
  createdAt: string;
};

/* ─── DEMO DATA ─── */
const DEMO_PACTS: Pact[] = [
  {
    id: "1", goalName: "Euro Trip Fund", target: 1000,
    myAddress: "0xb152...594B", myContrib: 480,
    partnerAddress: "0x9dF4...2a11", partnerContrib: 320,
    status: "active", contractAddress: "0xcABc...5D9",
    createdAt: "Apr 10, 2026",
  },
  {
    id: "2", goalName: "New MacBook Pro", target: 500,
    myAddress: "0xb152...594B", myContrib: 500,
    partnerAddress: "0x3aE7...c08f", partnerContrib: 500,
    status: "completed", contractAddress: "0xcABc...5D9",
    createdAt: "Mar 2, 2026",
  },
  {
    id: "3", goalName: "Photography Gear", target: 400,
    myAddress: "0xb152...594B", myContrib: 0,
    partnerAddress: "0x7f12...b44a", partnerContrib: 0,
    status: "pending", contractAddress: "0xcABc...5D9",
    createdAt: "Apr 20, 2026",
  },
];

/* ─── SCROLL REVEAL ─── */
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

/* ─── AVATAR ─── */
function Avatar({ address, color, size = 36 }: { address: string; color: string; size?: number }) {
  const initials = address.slice(2, 4).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `${color}22`, border: `1.5px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--FD)", fontWeight: 800, fontSize: size * 0.32, color }}>
      {initials}
    </div>
  );
}

/* ─── PACT CARD ─── */
function PactCard({ pact }: { pact: Pact }) {
  const myPct   = Math.min(pact.myContrib / pact.target, 1);
  const themPct = Math.min(pact.partnerContrib / pact.target, 1);
  const bothDone = myPct >= 1 && themPct >= 1;
  const statusConfig = {
    active:    { label: "Active",    color: "#60a5fa", bg: "rgba(96,165,250,.1)",  bord: "rgba(96,165,250,.2)"  },
    pending:   { label: "Pending",   color: "#fbbf24", bg: "rgba(251,191,36,.08)", bord: "rgba(251,191,36,.2)"  },
    completed: { label: "Complete",  color: "#4ade80", bg: "rgba(74,222,128,.08)", bord: "rgba(74,222,128,.2)"  },
  }[pact.status];

  return (
    <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "22px", overflow: "hidden", transition: "border-color .3s, box-shadow .3s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,.28)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(99,102,241,.06)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>

      {/* Header */}
      <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
          <div>
            <h3 style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "18px", letterSpacing: "-.02em", marginBottom: "5px" }}>{pact.goalName}</h3>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Created {pact.createdAt}</div>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 11px", borderRadius: "100px", color: statusConfig.color, background: statusConfig.bg, border: `1px solid ${statusConfig.bord}` }}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Two players */}
      <div style={{ padding: "24px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "16px", alignItems: "center", marginBottom: "24px" }}>

          {/* Player 1 — Me */}
          <div style={{ background: "rgba(99,102,241,.06)", border: "1px solid rgba(99,102,241,.18)", borderRadius: "16px", padding: "18px", textAlign: "center" }}>
            <Avatar address={pact.myAddress} color="#6366f1" size={40} />
            <div style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "12px", marginTop: "10px", marginBottom: "4px", color: "#818cf8" }}>You</div>
            <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#4b5563", marginBottom: "12px" }}>{pact.myAddress}</div>
            <div style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "22px", letterSpacing: "-.03em", color: "#6366f1", marginBottom: "4px" }}>
              ${pact.myContrib}
            </div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>of ${pact.target}</div>
            {/* Progress */}
            <div style={{ marginTop: "12px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${myPct * 100}%`, background: "linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius: "2px", transition: "width 1s ease" }} />
            </div>
            <div style={{ marginTop: "6px", fontSize: "11px", color: myPct >= 1 ? "#4ade80" : "#6366f1", fontWeight: 600 }}>
              {myPct >= 1 ? "✓ Complete" : `${Math.round(myPct * 100)}%`}
            </div>
          </div>

          {/* VS divider */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: bothDone ? "rgba(74,222,128,.15)" : "rgba(255,255,255,.05)", border: bothDone ? "1px solid rgba(74,222,128,.3)" : "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .4s" }}>
              {bothDone ? <span style={{ color: "#4ade80", fontSize: "14px" }}>{Ic.check}</span> : <span style={{ color: "#4b5563", fontSize: "12px", fontFamily: "var(--FD)", fontWeight: 800 }}>+</span>}
            </div>
            <div style={{ height: "1px", width: "24px", background: "rgba(255,255,255,.08)" }} />
            <div style={{ fontSize: "10px", color: "#4b5563", fontFamily: "var(--FD)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>Pact</div>
          </div>

          {/* Player 2 — Partner */}
          <div style={{ background: "rgba(139,92,246,.06)", border: "1px solid rgba(139,92,246,.18)", borderRadius: "16px", padding: "18px", textAlign: "center" }}>
            <Avatar address={pact.partnerAddress} color="#8b5cf6" size={40} />
            <div style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "12px", marginTop: "10px", marginBottom: "4px", color: "#a78bfa" }}>Partner</div>
            <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#4b5563", marginBottom: "12px" }}>{pact.partnerAddress}</div>
            <div style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "22px", letterSpacing: "-.03em", color: "#8b5cf6", marginBottom: "4px" }}>
              ${pact.partnerContrib}
            </div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>of ${pact.target}</div>
            <div style={{ marginTop: "12px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${themPct * 100}%`, background: "linear-gradient(90deg,#8b5cf6,#a78bfa)", borderRadius: "2px", transition: "width 1s ease" }} />
            </div>
            <div style={{ marginTop: "6px", fontSize: "11px", color: themPct >= 1 ? "#4ade80" : "#8b5cf6", fontWeight: 600 }}>
              {themPct >= 1 ? "✓ Complete" : `${Math.round(themPct * 100)}%`}
            </div>
          </div>
        </div>

        {/* Shared target bar */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
            <span>Combined progress</span>
            <span style={{ fontFamily: "var(--FD)", fontWeight: 700, color: "#eef2ff" }}>
              ${pact.myContrib + pact.partnerContrib} / ${pact.target * 2}
            </span>
          </div>
          <div style={{ height: "8px", borderRadius: "4px", background: "rgba(255,255,255,.06)", overflow: "hidden", position: "relative" }}>
            {/* My half */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${Math.min((pact.myContrib / (pact.target * 2)) * 100, 50)}%`, background: "linear-gradient(90deg,#6366f1,#818cf8)", transition: "width 1s ease" }} />
            {/* Partner half */}
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${Math.min((pact.partnerContrib / (pact.target * 2)) * 100, 50)}%`, background: "linear-gradient(270deg,#8b5cf6,#a78bfa)", transition: "width 1s ease" }} />
            {/* Center divider */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: "rgba(0,0,0,.4)", transform: "translateX(-50%)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "10px", color: "#4b5563" }}>
            <span style={{ color: "#6366f1" }}>Your half</span>
            <span style={{ color: "#8b5cf6" }}>Partner's half</span>
          </div>
        </div>

        {/* Unlock condition */}
        <div style={{ padding: "12px 16px", borderRadius: "12px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: bothDone ? "#4ade80" : "#fbbf24", flexShrink: 0 }}>{Ic.lock}</span>
          <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6 }}>
            {bothDone
              ? <span style={{ color: "#4ade80", fontWeight: 600 }}>Both parties hit their target — funds are now unlockable.</span>
              : pact.status === "pending"
              ? "Waiting for your partner to accept this pact."
              : "Funds unlock only when both parties reach the target. Neither can withdraw early."
            }
          </p>
        </div>

        {/* Contract + action */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#4b5563" }}>{Ic.shield}</span>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#4b5563" }}>StashPact · {pact.contractAddress}</span>
            <span style={{ color: "#4b5563" }}>{Ic.ext}</span>
          </div>
          {pact.status === "active" && (
            <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "100px", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", border: "none", color: "white", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--FB)", boxShadow: "0 4px 16px rgba(99,102,241,.3)", transition: "transform .2s, box-shadow .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px) scale(1.03)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(99,102,241,.45)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(99,102,241,.3)"; }}>
              Contribute {Ic.arrow}
            </button>
          )}
          {pact.status === "completed" && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "100px", background: "rgba(74,222,128,.1)", border: "1px solid rgba(74,222,128,.25)", color: "#4ade80", fontSize: "12px", fontWeight: 600 }}>
              {Ic.check} Completed
            </div>
          )}
          {pact.status === "pending" && (
            <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "100px", background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.25)", color: "#fbbf24", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--FB)" }}>
              Share invite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── CREATE PACT MODAL ─── */
function CreateModal({ onClose, onCreate }: { onClose: () => void; onCreate: (p: Pact) => void }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [target, setTarget] = useState("");
  const [partnerAddr, setPartnerAddr] = useState("");
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);

  const isStep1Valid = goal.trim().length > 0 && parseFloat(target) > 0;
  const isStep2Valid = partnerAddr.trim().length >= 10;

  const handleCreate = async () => {
    setCreating(true);
    await new Promise(r => setTimeout(r, 2000));
    setCreating(false);
    setDone(true);
    setTimeout(() => {
      onCreate({
        id: Date.now().toString(), goalName: goal, target: parseFloat(target),
        myAddress: "0xb152...594B", myContrib: 0,
        partnerAddress: partnerAddr.slice(0, 6) + "..." + partnerAddr.slice(-4), partnerContrib: 0,
        status: "pending", contractAddress: "0xcABc...5D9",
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      });
      onClose();
    }, 1500);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.75)", backdropFilter: "blur(12px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: "100%", maxWidth: "480px", margin: "24px", background: "rgba(10,14,28,.98)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,.8)" }}>

        {/* Modal header */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "18px" }}>Create a Pact</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "3px" }}>Blockchain-enforced savings commitment</div>
          </div>
          {/* Step indicator */}
          <div style={{ display: "flex", gap: "6px" }}>
            {[1,2,3].map(s => (
              <div key={s} style={{ width: "24px", height: "4px", borderRadius: "2px", background: s <= step ? "var(--grad, linear-gradient(135deg,#3b82f6,#8b5cf6))" : "rgba(255,255,255,.1)", transition: "background .3s" }} />
            ))}
          </div>
        </div>

        <div style={{ padding: "28px" }}>
          {!done && step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Goal name</label>
                <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g. Euro Trip Fund" style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "12px", padding: "12px 16px", color: "#eef2ff", fontSize: "15px", fontFamily: "var(--FB)", outline: "none", transition: "border-color .2s" }}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = "rgba(99,102,241,.5)"}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,.1)"} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Target amount (each person)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontSize: "16px", fontFamily: "var(--FD)", fontWeight: 800, pointerEvents: "none" }}>$</span>
                  <input type="number" value={target} onChange={e => setTarget(e.target.value)} placeholder="500" style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "12px", padding: "12px 16px 12px 36px", color: "#eef2ff", fontSize: "15px", fontFamily: "var(--FD)", fontWeight: 800, letterSpacing: "-.02em", outline: "none", transition: "border-color .2s" }}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = "rgba(99,102,241,.5)"}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,.1)"} />
                </div>
              </div>
              {target && parseFloat(target) > 0 && (
                <div style={{ padding: "12px 16px", borderRadius: "12px", background: "rgba(99,102,241,.07)", border: "1px solid rgba(99,102,241,.18)", fontSize: "13px", color: "#94a3b8" }}>
                  Both you and your partner will each save <strong style={{ color: "#818cf8" }}>${target}</strong> for a combined total of <strong style={{ color: "#818cf8" }}>${(parseFloat(target) * 2).toFixed(0)}</strong>.
                </div>
              )}
            </div>
          )}

          {!done && step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "16px 20px", borderRadius: "14px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Pact goal</div>
                <div style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "18px" }}>{goal}</div>
                <div style={{ fontSize: "13px", color: "#818cf8", marginTop: "4px" }}>${target} each · ${(parseFloat(target) * 2).toFixed(0)} combined</div>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Partner's wallet address</label>
                <input value={partnerAddr} onChange={e => setPartnerAddr(e.target.value)} placeholder="0x..." style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "12px", padding: "12px 16px", color: "#eef2ff", fontSize: "14px", fontFamily: "monospace", outline: "none", transition: "border-color .2s" }}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = "rgba(99,102,241,.5)"}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,.1)"} />
                <p style={{ fontSize: "12px", color: "#4b5563", marginTop: "8px" }}>They'll receive an invite and must accept before the pact activates.</p>
              </div>
            </div>
          )}

          {!done && step === 3 && (
            <div style={{ textAlign: "center" }}>
              {!creating ? (
                <div>
                  <div style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.7, marginBottom: "24px" }}>
                    You're about to deploy a <strong style={{ color: "#818cf8" }}>StashPact</strong> smart contract on Base Sepolia. Neither party can withdraw until both reach <strong style={{ color: "#eef2ff" }}>${target}</strong>.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left", padding: "16px 20px", borderRadius: "14px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", marginBottom: "24px" }}>
                    {[
                      ["Goal", goal],
                      ["Each saves", `$${target} USDC`],
                      ["Combined", `$${(parseFloat(target)*2).toFixed(0)} USDC`],
                      ["Partner", `${partnerAddr.slice(0,10)}...`],
                      ["Contract", "StashPact.sol · Base Sepolia"],
                    ].map(([k,v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                        <span style={{ color: "#6b7280" }}>{k}</span>
                        <span style={{ color: "#eef2ff", fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ padding: "32px 0" }}>
                  <div style={{ width: "48px", height: "48px", border: "3px solid rgba(99,102,241,.2)", borderTop: "3px solid #6366f1", borderRadius: "50%", margin: "0 auto 20px", animation: "spin 1s linear infinite" }} />
                  <div style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>Deploying contract...</div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>Broadcasting to Base Sepolia</div>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}
            </div>
          )}

          {done && (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(74,222,128,.15)", border: "1px solid rgba(74,222,128,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#4ade80", fontSize: "20px" }}>
                {Ic.check}
              </div>
              <div style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "18px", marginBottom: "8px", color: "#4ade80" }}>Pact created</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>Invite sent to your partner</div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        {!done && !creating && (
          <div style={{ padding: "0 28px 28px", display: "flex", gap: "10px" }}>
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#6b7280", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--FB)" }}>
                Back
              </button>
            )}
            {step < 3 && (
              <button disabled={step === 1 ? !isStep1Valid : !isStep2Valid} onClick={() => setStep(s => s + 1)}
                style={{ flex: 1, padding: "12px", borderRadius: "12px", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", border: "none", color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--FB)", opacity: (step === 1 ? !isStep1Valid : !isStep2Valid) ? .4 : 1, transition: "opacity .2s" }}>
                Continue {Ic.arrow}
              </button>
            )}
            {step === 3 && (
              <button onClick={handleCreate} style={{ flex: 1, padding: "12px", borderRadius: "12px", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", border: "none", color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--FB)" }}>
                Deploy Pact {Ic.arrow}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function PactsPage() {
  const router = useRouter();
  const [pacts, setPacts] = useState<Pact[]>(DEMO_PACTS);
  const [showCreate, setShowCreate] = useState(false);
  useReveal();

  const activePacts    = pacts.filter(p => p.status === "active");
  const pendingPacts   = pacts.filter(p => p.status === "pending");
  const completedPacts = pacts.filter(p => p.status === "completed");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root {
          --bg:#060912; --sur:rgba(255,255,255,.035); --bor:rgba(255,255,255,.07);
          --t1:#eef2ff; --t2:#6b7280; --t3:#1f2937;
          --FD:'Cabinet Grotesk',sans-serif; --FB:'Instrument Sans',sans-serif;
        }
        body { background:var(--bg); color:var(--t1); font-family:var(--FB); min-height:100vh; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:rgba(99,102,241,.25); border-radius:4px; }

        /* APP SHELL */
        .app-shell { display:flex; min-height:100vh; }

        /* SIDEBAR */
        .sidebar { width:64px; flex-shrink:0; display:flex; flex-direction:column; align-items:center; padding:16px 0; gap:4px; background:rgba(6,9,18,.95); border-right:1px solid rgba(255,255,255,.06); backdrop-filter:blur(20px); position:sticky; top:0; height:100vh; }
        .sb-btn { width:44px; height:44px; border-radius:13px; display:flex; align-items:center; justify-content:center; color:var(--t2); cursor:pointer; border:none; background:transparent; transition:color .2s,background .2s; position:relative; }
        .sb-btn:hover { color:var(--t1); background:rgba(255,255,255,.06); }
        .sb-btn.active { color:white; background:rgba(99,102,241,.18); }
        .sb-btn.active::before { content:''; position:absolute; left:-1px; top:50%; transform:translateY(-50%); width:3px; height:20px; background:linear-gradient(135deg,#3b82f6,#8b5cf6); border-radius:0 3px 3px 0; }
        .sb-tooltip { position:absolute; left:56px; top:50%; transform:translateY(-50%); background:rgba(10,14,28,.95); border:1px solid rgba(255,255,255,.1); color:white; font-size:12px; font-weight:600; padding:5px 10px; border-radius:8px; white-space:nowrap; opacity:0; pointer-events:none; transition:opacity .15s; font-family:var(--FB); z-index:100; }
        .sb-btn:hover .sb-tooltip { opacity:1; }
        .sb-divider { width:32px; height:1px; background:rgba(255,255,255,.07); margin:6px 0; }
        .sb-bottom { margin-top:auto; display:flex; flex-direction:column; align-items:center; gap:8px; padding:0 0 8px; }

        /* REVEALS */
        [data-reveal] { opacity:0; transform:translateY(22px); transition:opacity .7s cubic-bezier(.23,1,.32,1),transform .7s cubic-bezier(.23,1,.32,1); }
        [data-reveal].in { opacity:1; transform:translateY(0); }

        /* HERO */
        .ph0 { opacity:0; animation:phU .5s ease .08s forwards; }
        .ph1 { opacity:0; animation:phU .6s ease .22s forwards; }
        .ph2 { opacity:0; animation:phU .6s ease .38s forwards; }
        .ph3 { opacity:0; animation:phU .5s ease .52s forwards; }
        @keyframes phU { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        /* Orbs */
        .po1 { position:fixed; width:600px; height:600px; border-radius:50%; top:-15%; left:-5%; background:radial-gradient(circle,rgba(59,130,246,.09),transparent 60%); filter:blur(80px); pointer-events:none; z-index:0; animation:pd1 28s ease-in-out infinite; }
        .po2 { position:fixed; width:400px; height:400px; border-radius:50%; bottom:5%; right:5%; background:radial-gradient(circle,rgba(139,92,246,.08),transparent 60%); filter:blur(90px); pointer-events:none; z-index:0; animation:pd2 22s ease-in-out infinite; }
        @keyframes pd1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,50px)} }
        @keyframes pd2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,-30px)} }

        /* Noise */
        .noise { position:fixed; inset:0; pointer-events:none; z-index:1; opacity:.015; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:256px; }

        /* Section label */
        .slbl { font-family:var(--FB); font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; }

        /* Create btn */
        .create-btn { display:inline-flex; align-items:center; gap:8px; padding:11px 22px; border-radius:100px; background:linear-gradient(135deg,#3b82f6,#8b5cf6); border:none; color:white; font-family:var(--FB); font-weight:600; font-size:13px; cursor:pointer; box-shadow:0 4px 20px rgba(99,102,241,.32); transition:transform .2s,box-shadow .2s; }
        .create-btn:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 8px 32px rgba(99,102,241,.48); }
      `}</style>

      <div className="po1" style={{ zIndex: 0 }} /><div className="po2" style={{ zIndex: 0 }} />
      <div className="noise" />

      <div className="app-shell" style={{ position: "relative", zIndex: 2 }}>

        {/* ════ SIDEBAR ════ */}
        <aside className="sidebar">
          <div style={{ marginBottom: "16px", padding: "8px" }}><Logo size={32} /></div>
          {[
            { icon: Ic.home,  label: "Home",        path: "/" },
            { icon: Ic.chat,  label: "Chat",         path: "/chat" },
            { icon: Ic.pact,  label: "Pacts",        path: "/pact",   active: true },
            { icon: Ic.vault, label: "Yield Vaults", path: "/vaults" },
          ].map(item => (
            <button key={item.path} className={`sb-btn ${item.active ? "active" : ""}`}
              onClick={() => !item.active && router.push(item.path)}>
              {item.icon}
              <span className="sb-tooltip">{item.label}</span>
            </button>
          ))}
          <div className="sb-divider" />
          <button className="sb-btn" onClick={() => router.push("/chat")}>
            {Ic.dash}
            <span className="sb-tooltip">Dashboard</span>
          </button>
          <div className="sb-bottom">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
              <div style={{ fontSize: "9px", color: "#4ade80", fontWeight: 600, letterSpacing: ".04em", writingMode: "vertical-lr", textOrientation: "mixed", transform: "rotate(180deg)" }}>BASE</div>
            </div>
          </div>
        </aside>

        {/* ════ CONTENT ════ */}
        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* Top bar */}
          <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", height: "56px", borderBottom: "1px solid rgba(255,255,255,.05)", backdropFilter: "blur(20px)", background: "rgba(6,9,18,.8)" }}>
            <div>
              <div style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "15px" }}>Stash Pacts</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>Blockchain-enforced savings commitments</div>
            </div>
            <button className="create-btn" onClick={() => setShowCreate(true)}>
              {Ic.plus} New Pact
            </button>
          </div>

          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 36px 80px" }}>

            {/* Hero */}
            <div style={{ marginBottom: "64px" }}>
              <div className="ph0" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#818cf8", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(99,102,241,.2)", background: "rgba(99,102,241,.07)", marginBottom: "22px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />
                StashPact · Deployed on Base
              </div>
              <h1 className="ph1" style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "clamp(40px,5.5vw,68px)", letterSpacing: "-.04em", lineHeight: .98, marginBottom: "18px" }}>
                Save together,<br />
                <span style={{ background: "linear-gradient(110deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>unlock together.</span>
              </h1>
              <p className="ph2" style={{ color: "#6b7280", fontSize: "17px", lineHeight: 1.72, maxWidth: "480px", fontWeight: 400, marginBottom: "28px" }}>
                Make a savings commitment with a friend. A smart contract ensures neither of you can withdraw until both hit the target — no exceptions.
              </p>

              {/* Feature pills */}
              <div className="ph3" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {[
                  { label: "Smart contract enforced", color: "#818cf8" },
                  { label: "No early withdrawal",      color: "#4ade80" },
                  { label: "Both must commit",         color: "#fbbf24" },
                  { label: "USDC on Base",             color: "#60a5fa" },
                ].map(f => (
                  <div key={f.label} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(255,255,255,.08)", color: f.color, background: "rgba(255,255,255,.02)" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: f.color, display: "inline-block" }} />
                    {f.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Active pacts */}
            {activePacts.length > 0 && (
              <div style={{ marginBottom: "48px" }} data-reveal>
                <p className="slbl" style={{ color: "#60a5fa", marginBottom: "20px" }}>Active pacts</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {activePacts.map((p, i) => (
                    <div key={p.id} data-reveal data-delay={String(i * 100)}>
                      <PactCard pact={p} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending pacts */}
            {pendingPacts.length > 0 && (
              <div style={{ marginBottom: "48px" }} data-reveal>
                <p className="slbl" style={{ color: "#fbbf24", marginBottom: "20px" }}>Pending invites</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {pendingPacts.map((p, i) => (
                    <div key={p.id} data-reveal data-delay={String(i * 100)}>
                      <PactCard pact={p} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed pacts */}
            {completedPacts.length > 0 && (
              <div style={{ marginBottom: "48px" }} data-reveal>
                <p className="slbl" style={{ color: "#4ade80", marginBottom: "20px" }}>Completed</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {completedPacts.map((p, i) => (
                    <div key={p.id} data-reveal data-delay={String(i * 100)}>
                      <PactCard pact={p} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {pacts.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "24px", background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "#818cf8", fontSize: "32px" }}>
                  {Ic.pact}
                </div>
                <h3 style={{ fontFamily: "var(--FD)", fontWeight: 800, fontSize: "22px", marginBottom: "10px" }}>No pacts yet</h3>
                <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.7, maxWidth: "320px", margin: "0 auto 28px" }}>Create your first pact with a friend and hold each other accountable to saving.</p>
                <button className="create-btn" onClick={() => setShowCreate(true)}>{Ic.plus} Create your first pact</button>
              </div>
            )}

            {/* How it works explainer */}
            <div data-reveal style={{ marginTop: "40px", padding: "32px", borderRadius: "20px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)" }}>
              <p className="slbl" style={{ color: "#6b7280", marginBottom: "20px" }}>How pacts work</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "24px" }}>
                {[
                  { n: "01", title: "Create a pact", desc: "Set a savings goal and target amount. Both parties save the same amount." },
                  { n: "02", title: "Invite your partner", desc: "Send an invite to a friend's wallet. They must accept to activate the contract." },
                  { n: "03", title: "Both save up",  desc: "Contribute at any pace. The smart contract tracks both balances onchain." },
                  { n: "04", title: "Unlock together", desc: "Once both parties hit target, either can withdraw. Not a second before." },
                ].map(s => (
                  <div key={s.n}>
                    <div style={{ fontFamily: "var(--FD)", fontWeight: 900, fontSize: "36px", letterSpacing: "-.04em", color: "transparent", WebkitTextStroke: "1px rgba(99,102,241,.2)", marginBottom: "8px" }}>{s.n}</div>
                    <h4 style={{ fontFamily: "var(--FD)", fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>{s.title}</h4>
                    <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract info */}
            <div data-reveal style={{ marginTop: "24px", display: "flex", gap: "12px", padding: "16px 20px", borderRadius: "14px", background: "rgba(251,191,36,.04)", border: "1px solid rgba(251,191,36,.14)" }}>
              <span style={{ color: "#fbbf24", flexShrink: 0, marginTop: "1px" }}>{Ic.info}</span>
              <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.75 }}>
                <strong style={{ color: "#fbbf24", fontWeight: 700 }}>Smart contract:</strong>{" "}
                StashPact.sol is deployed on Base Sepolia at <code style={{ fontFamily: "monospace", color: "#818cf8" }}>0xcABcbbfA91B10df707d6f56ccBb7adA64161d5D9</code>. The contract enforces that neither party can withdraw until both reach the target amount.
              </p>
            </div>

          </div>
        </div>
      </div>

      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onCreate={newPact => setPacts(p => [newPact, ...p])}
        />
      )}
    </>
  );
}