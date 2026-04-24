"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

/* ─── LOGO ─── */
const Logo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="lg_p3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor:"#3b82f6" }}/><stop offset="100%" style={{ stopColor:"#8b5cf6" }}/></linearGradient></defs>
    <rect width="200" height="200" rx="44" fill="url(#lg_p3)"/>
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

/* ─── SIDEBAR ICONS ─── */
const Ic = {
  home:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  chat:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  pact:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  vault: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  dash:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  plus:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  lock:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  check: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  info:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  close: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  shield:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};

/* ─── TYPES ─── */
type PactStatus = "active" | "pending" | "completed";
type Pact = { id: string; goalName: string; target: number; myAddress: string; myContrib: number; partnerAddress: string; partnerContrib: number; status: PactStatus; createdAt: string; };

/* ─── INSPIRATION DATA ─── */
const INSPO = [
  {
    id: "italy",
    title: "Italy with the squad",
    story: "Rome, Florence, Amalfi Coast. Four friends locked in — none of us bail on this one.",
    photo: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=85",
    avatars: ["A","R","K","D"],
    colors: ["#3b82f6","#8b5cf6","#ec4899","#f59e0b"],
    saved: 2100, target: 3200,
    tag: "Friend group · 4 people",
    accent: "#60a5fa",
    gradFrom: "rgba(59,130,246,0.5)",
    goalName: "Italy Trip Fund",
    targetEach: "800",
  },
  {
    id: "dog",
    title: "Our first dog together",
    story: "Vet bills, food, a crate, toys. Maya & James are building the fund before the puppy arrives.",
    photo: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=900&q=85",
    avatars: ["M","J"],
    colors: ["#f59e0b","#10b981"],
    saved: 340, target: 500,
    tag: "Couple · 2 people",
    accent: "#fbbf24",
    gradFrom: "rgba(245,158,11,0.5)",
    goalName: "First Dog Fund",
    targetEach: "250",
  },
  {
    id: "bali",
    title: "Graduation trip to Bali",
    story: "One week in Bali after finals. The countdown starts the moment exams end.",
    photo: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
    avatars: ["N","P"],
    colors: ["#10b981","#f43f5e"],
    saved: 620, target: 700,
    tag: "Best friends · 2 people",
    accent: "#34d399",
    gradFrom: "rgba(16,185,129,0.5)",
    goalName: "Bali Grad Trip",
    targetEach: "350",
  },
  {
    id: "gaming",
    title: "The ultimate dorm setup",
    story: "PS5, 4K monitor, proper headset. Roommates splitting it so it happens this semester.",
    photo: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=900&q=85",
    avatars: ["T","S"],
    colors: ["#8b5cf6","#06b6d4"],
    saved: 180, target: 300,
    tag: "Roommates · 2 people",
    accent: "#a78bfa",
    gradFrom: "rgba(139,92,246,0.5)",
    goalName: "Gaming Setup",
    targetEach: "150",
  },
];

/* ─── DEMO PACTS ─── */
const DEMO_PACTS: Pact[] = [
  { id:"1", goalName:"Italy Trip Fund", target:800, myAddress:"0xb152...594B", myContrib:480, partnerAddress:"0x9dF4...2a11", partnerContrib:320, status:"active", createdAt:"Apr 10, 2026" },
  { id:"2", goalName:"Gaming Setup", target:150, myAddress:"0xb152...594B", myContrib:150, partnerAddress:"0x3aE7...c08f", partnerContrib:150, status:"completed", createdAt:"Mar 2, 2026" },
];

/* ─── SCROLL REVEAL ─── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          setTimeout(() => el.classList.add("in"), parseInt(el.dataset.delay||"0"));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll("[data-reveal]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── 3D TILT ─── */
function useTilt(ref: React.RefObject<HTMLDivElement | null>, strength = 10) {
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(12px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateZ(0)"; };
  return { onMouseMove: onMove, onMouseLeave: onLeave };
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
    const pts = Array.from({ length: 40 }, () => ({ x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight, vx:(Math.random()-.5)*.18, vy:(Math.random()-.5)*.18, r:Math.random()*1.2+.3, o:Math.random()*.28+.05 }));
    const tick = () => {
      ctx.clearRect(0,0,c.width,c.height);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=c.width; if(p.x>c.width)p.x=0;
        if(p.y<0)p.y=c.height; if(p.y>c.height)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(139,92,246,${p.o})`; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++) {
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(139,92,246,${.04*(1-d/90)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }
      raf=requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", opacity:.7 }} />;
}

/* ─── INSPIRATION CARD ─── */
function InspoCard({ item, onUse }: { item: typeof INSPO[0]; onUse: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const tilt = useTilt(ref, 8);
  const pct = Math.round((item.saved / item.target) * 100);

  return (
    <div ref={ref} style={{ position:"relative", borderRadius:"22px", overflow:"hidden", cursor:"pointer", height:"360px", transition:"transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease", transformStyle:"preserve-3d", boxShadow: hovered ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${item.accent}44` : "0 8px 32px rgba(0,0,0,0.4)" }}
      {...tilt}
      onMouseEnter={e => { setHovered(true); tilt.onMouseMove(e); }}
      onMouseLeave={() => { setHovered(false); tilt.onMouseLeave(); }}
      onClick={onUse}>

      {/* Photo */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`url(${item.photo})`, backgroundSize:"cover", backgroundPosition:"center", transform: hovered ? "scale(1.08)" : "scale(1)", transition:"transform 0.7s cubic-bezier(0.23,1,0.32,1)" }} />

      {/* Gradient overlays */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(4,8,15,0.96) 0%, rgba(4,8,15,0.55) 50%, rgba(4,8,15,0.15) 100%)" }} />
      <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, ${item.gradFrom} 0%, transparent 60%)`, opacity: hovered ? 0.6 : 0.3, transition:"opacity 0.4s ease" }} />

      {/* Shimmer on hover */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)", opacity: hovered ? 1 : 0, transition:"opacity 0.3s" }} />

      {/* Content */}
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"20px" }}>
        {/* Top */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:"11px", fontWeight:600, padding:"5px 12px", borderRadius:"100px", backdropFilter:"blur(12px)", background:"rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.14)", color:item.accent, letterSpacing:".04em" }}>
            {item.tag}
          </span>
          <div style={{ display:"flex" }}>
            {item.avatars.map((a,j) => (
              <div key={j} style={{ width:"30px", height:"30px", borderRadius:"50%", background:item.colors[j], border:"2px solid rgba(4,8,15,0.8)", marginLeft:j===0?"0":"-8px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--FD)", fontWeight:800, fontSize:"11px", color:"white", zIndex:item.avatars.length-j }}>
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div>
          <h3 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(20px,2.5vw,26px)", letterSpacing:"-.03em", lineHeight:1.1, marginBottom:"8px" }}>{item.title}</h3>
          <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.65)", lineHeight:1.65, marginBottom:"16px", fontWeight:300 }}>{item.story}</p>

          {/* Progress */}
          <div style={{ marginBottom:"14px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"11px", marginBottom:"6px" }}>
              <span style={{ color:"rgba(255,255,255,0.45)" }}>${item.saved.toLocaleString()} saved together</span>
              <span style={{ color:item.accent, fontWeight:700 }}>{pct}%</span>
            </div>
            <div style={{ height:"3px", borderRadius:"2px", background:"rgba(255,255,255,0.12)", overflow:"hidden" }}>
              <div style={{ height:"100%", width:hovered?`${pct}%`:`${pct - 8}%`, background:`linear-gradient(90deg,${item.colors[0]},${item.colors[item.colors.length-1]})`, borderRadius:"2px", transition:"width 0.8s cubic-bezier(0.23,1,0.32,1)" }} />
            </div>
          </div>

          {/* CTA — slides up on hover */}
          <div style={{ transform: hovered ? "translateY(0)" : "translateY(8px)", opacity: hovered ? 1 : 0, transition:"transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease" }}>
            <div style={{ width:"100%", padding:"11px 0", borderRadius:"12px", background:`linear-gradient(135deg,${item.gradFrom},rgba(139,92,246,0.6))`, border:"1px solid rgba(255,255,255,0.15)", textAlign:"center", fontSize:"13px", fontWeight:700, fontFamily:"var(--FD)", backdropFilter:"blur(8px)" }}>
              Use as starting point {Ic.arrow}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CREATE MODAL ─── */
function CreateModal({ initial, onClose, onCreate }: { initial: { goalName:string; targetEach:string } | null; onClose:()=>void; onCreate:(p:Pact)=>void }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState(initial?.goalName || "");
  const [target, setTarget] = useState(initial?.targetEach || "");
  const [partner, setPartner] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [done, setDone] = useState(false);

  const valid1 = goal.trim().length > 0 && parseFloat(target) > 0;
  const valid2 = partner.trim().length >= 10;

  const deploy = async () => {
    setDeploying(true);
    await new Promise(r => setTimeout(r, 2200));
    setDeploying(false);
    setDone(true);
    setTimeout(() => {
      onCreate({ id: Date.now().toString(), goalName: goal, target: parseFloat(target), myAddress:"0xb152...594B", myContrib:0, partnerAddress:`${partner.slice(0,6)}...${partner.slice(-4)}`, partnerContrib:0, status:"pending", createdAt: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) });
      onClose();
    }, 1400);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.82)", backdropFilter:"blur(16px)" }} onClick={e => { if(e.target===e.currentTarget) onClose(); }}>
      <div style={{ width:"100%", maxWidth:"460px", margin:"24px", background:"rgba(8,12,24,0.98)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"24px", overflow:"hidden", boxShadow:"0 48px 120px rgba(0,0,0,0.85), 0 1px 0 rgba(255,255,255,0.06) inset" }}>

        {/* Header */}
        <div style={{ padding:"24px 28px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"19px", letterSpacing:"-.02em" }}>Create a Stash Pact</div>
            <div style={{ fontSize:"12px", color:"#6b7280", marginTop:"3px" }}>Blockchain-enforced savings commitment</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            {/* Step dots */}
            <div style={{ display:"flex", gap:"5px" }}>
              {[1,2,3].map(s => (
                <div key={s} style={{ width: s<=step ? "20px":"8px", height:"4px", borderRadius:"2px", background: s<=step ? "linear-gradient(90deg,#3b82f6,#8b5cf6)" : "rgba(255,255,255,0.1)", transition:"all 0.3s ease" }} />
              ))}
            </div>
            <button onClick={onClose} style={{ width:"28px", height:"28px", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", cursor:"pointer", color:"#6b7280" }}>{Ic.close}</button>
          </div>
        </div>

        <div style={{ padding:"28px" }}>
          {!done && step === 1 && (
            <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
              <div>
                <label style={{ fontSize:"11px", fontWeight:600, color:"#6b7280", letterSpacing:".1em", textTransform:"uppercase", display:"block", marginBottom:"8px" }}>What are you saving for?</label>
                <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="Italy trip, First dog, Festival tickets..." style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", padding:"13px 16px", color:"#eef2ff", fontSize:"15px", fontFamily:"var(--FB)", outline:"none", transition:"border-color 0.2s" }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor="rgba(139,92,246,0.55)"}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor="rgba(255,255,255,0.1)"} />
              </div>
              <div>
                <label style={{ fontSize:"11px", fontWeight:600, color:"#6b7280", letterSpacing:".1em", textTransform:"uppercase", display:"block", marginBottom:"8px" }}>Each person saves (USDC)</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"#6b7280", fontSize:"18px", fontFamily:"var(--FD)", fontWeight:900, pointerEvents:"none" }}>$</span>
                  <input type="number" value={target} onChange={e => setTarget(e.target.value)} placeholder="500" style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", padding:"13px 16px 13px 38px", color:"#eef2ff", fontSize:"18px", fontFamily:"var(--FD)", fontWeight:900, letterSpacing:"-.02em", outline:"none", transition:"border-color 0.2s" }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor="rgba(139,92,246,0.55)"}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor="rgba(255,255,255,0.1)"} />
                </div>
              </div>
              {valid1 && (
                <div style={{ padding:"14px 18px", borderRadius:"12px", background:"rgba(139,92,246,0.08)", border:"1px solid rgba(139,92,246,0.2)", fontSize:"13px", color:"#c4b5fd", lineHeight:1.7 }}>
                  You and your partner will each save <strong style={{ color:"#a78bfa" }}>${target}</strong> — combined total of <strong style={{ color:"#a78bfa" }}>${(parseFloat(target)*2).toFixed(0)}</strong> toward <strong style={{ color:"#a78bfa" }}>{goal}</strong>.
                </div>
              )}
            </div>
          )}

          {!done && step === 2 && (
            <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
              <div style={{ padding:"16px 20px", borderRadius:"14px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"20px", letterSpacing:"-.02em", marginBottom:"4px" }}>{goal}</div>
                <div style={{ fontSize:"13px", color:"#a78bfa" }}>${target} each · ${(parseFloat(target)*2).toFixed(0)} combined</div>
              </div>
              <div>
                <label style={{ fontSize:"11px", fontWeight:600, color:"#6b7280", letterSpacing:".1em", textTransform:"uppercase", display:"block", marginBottom:"8px" }}>Partner's wallet address</label>
                <input value={partner} onChange={e => setPartner(e.target.value)} placeholder="0x..." style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", padding:"13px 16px", color:"#eef2ff", fontSize:"14px", fontFamily:"monospace", outline:"none", transition:"border-color 0.2s" }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor="rgba(139,92,246,0.55)"}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor="rgba(255,255,255,0.1)"} />
                <p style={{ fontSize:"12px", color:"#4b5563", marginTop:"8px" }}>They'll receive an invite. Both must accept before the pact activates.</p>
              </div>
            </div>
          )}

          {!done && step === 3 && !deploying && (
            <div>
              <p style={{ fontSize:"14px", color:"#94a3b8", lineHeight:1.8, marginBottom:"22px" }}>
                A <strong style={{ color:"#a78bfa" }}>StashPact smart contract</strong> will be deployed on Base Sepolia. Neither party can withdraw until both reach <strong style={{ color:"#eef2ff" }}>${target} USDC</strong>.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"9px", padding:"18px 20px", borderRadius:"14px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", marginBottom:"8px" }}>
                {[["Goal", goal],["Each saves", `$${target} USDC`],["Combined", `$${(parseFloat(target)*2).toFixed(0)} USDC`],["Partner", `${partner.slice(0,10)}...`],["Network", "Base Sepolia"]].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:"13px" }}>
                    <span style={{ color:"#6b7280" }}>{k}</span><span style={{ color:"#eef2ff", fontWeight:500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!done && deploying && (
            <div style={{ textAlign:"center", padding:"32px 0" }}>
              <div style={{ width:"52px", height:"52px", border:"3px solid rgba(139,92,246,0.2)", borderTop:"3px solid #8b5cf6", borderRadius:"50%", margin:"0 auto 20px", animation:"spin 1s linear infinite" }} />
              <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"17px", marginBottom:"8px" }}>Deploying contract...</div>
              <div style={{ fontSize:"13px", color:"#6b7280" }}>Broadcasting to Base Sepolia</div>
              <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
            </div>
          )}

          {done && (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ width:"60px", height:"60px", borderRadius:"50%", background:"rgba(74,222,128,0.12)", border:"1px solid rgba(74,222,128,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", color:"#4ade80" }}>{Ic.check}</div>
              <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"19px", color:"#4ade80", marginBottom:"8px" }}>Pact deployed</div>
              <div style={{ fontSize:"13px", color:"#6b7280" }}>Invite sent to your partner</div>
            </div>
          )}
        </div>

        {!done && !deploying && (
          <div style={{ padding:"0 28px 28px", display:"flex", gap:"10px" }}>
            {step > 1 && <button onClick={() => setStep(s => s-1)} style={{ flex:1, padding:"13px", borderRadius:"12px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"#6b7280", fontSize:"14px", fontWeight:600, cursor:"pointer", fontFamily:"var(--FB)" }}>Back</button>}
            {step < 3 && <button disabled={step===1?!valid1:!valid2} onClick={() => setStep(s => s+1)} style={{ flex:1, padding:"13px", borderRadius:"12px", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", border:"none", color:"white", fontSize:"14px", fontWeight:600, cursor:"pointer", fontFamily:"var(--FB)", opacity:(step===1?!valid1:!valid2)?0.4:1, transition:"opacity 0.2s" }}>Continue</button>}
            {step === 3 && <button onClick={deploy} style={{ flex:1, padding:"13px", borderRadius:"12px", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", border:"none", color:"white", fontSize:"14px", fontWeight:600, cursor:"pointer", fontFamily:"var(--FB)", boxShadow:"0 4px 20px rgba(99,102,241,0.35)" }}>Deploy Pact {Ic.arrow}</button>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PACT CARD (active pacts list) ─── */
function MyPactCard({ pact }: { pact: Pact }) {
  const myPct = Math.min(pact.myContrib/pact.target, 1);
  const themPct = Math.min(pact.partnerContrib/pact.target, 1);
  const bothDone = myPct>=1 && themPct>=1;
  const sc = { active:{ l:"Active", c:"#60a5fa", bg:"rgba(96,165,250,0.1)", b:"rgba(96,165,250,0.2)" }, pending:{ l:"Pending", c:"#fbbf24", bg:"rgba(251,191,36,0.08)", b:"rgba(251,191,36,0.2)" }, completed:{ l:"Complete", c:"#4ade80", bg:"rgba(74,222,128,0.08)", b:"rgba(74,222,128,0.2)" } }[pact.status];
  return (
    <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"20px", padding:"24px 28px", transition:"border-color 0.3s" }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor="rgba(99,102,241,0.28)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)"}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px" }}>
        <div>
          <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"17px", letterSpacing:"-.02em", marginBottom:"4px" }}>{pact.goalName}</div>
          <div style={{ fontSize:"12px", color:"#6b7280" }}>Pact with {pact.partnerAddress} · {pact.createdAt}</div>
        </div>
        <span style={{ fontSize:"11px", fontWeight:700, padding:"4px 11px", borderRadius:"100px", color:sc.c, background:sc.bg, border:`1px solid ${sc.b}` }}>{sc.l}</span>
      </div>
      <div style={{ display:"flex", gap:"16px", marginBottom:"18px" }}>
        {[{ label:"You", contrib:pact.myContrib, pct:myPct, c:"#6366f1" },{ label:"Partner", contrib:pact.partnerContrib, pct:themPct, c:"#8b5cf6" }].map(p => (
          <div key={p.label} style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <span style={{ fontSize:"12px", color:"#6b7280" }}>{p.label}</span>
              <span style={{ fontSize:"12px", fontFamily:"var(--FD)", fontWeight:700, color:p.c }}>${p.contrib} / ${pact.target}</span>
            </div>
            <div style={{ height:"5px", borderRadius:"3px", background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${p.pct*100}%`, background:`linear-gradient(90deg,${p.c}88,${p.c})`, borderRadius:"3px", transition:"width 1s ease" }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"11px 16px", borderRadius:"10px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:"8px" }}>
        <span style={{ color:bothDone?"#4ade80":"#fbbf24" }}>{Ic.lock}</span>
        <p style={{ fontSize:"12px", color:"#6b7280" }}>{bothDone ? <span style={{ color:"#4ade80", fontWeight:600 }}>Both targets hit — funds unlockable</span> : "Funds locked until both parties reach their target"}</p>
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function PactPage() {
  const router = useRouter();
  const [pacts, setPacts] = useState<Pact[]>(DEMO_PACTS);
  const [showCreate, setShowCreate] = useState(false);
  const [createInitial, setCreateInitial] = useState<{ goalName:string; targetEach:string }|null>(null);
  useReveal();

  const openWithInspo = (item: typeof INSPO[0]) => {
    setCreateInitial({ goalName: item.goalName, targetEach: item.targetEach });
    setShowCreate(true);
  };

  const openFresh = () => {
    setCreateInitial(null);
    setShowCreate(true);
  };

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
        body { background:var(--bg); color:var(--t1); font-family:var(--FB); }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:rgba(139,92,246,.3); border-radius:4px; }

        .app-shell { display:flex; min-height:100vh; }

        /* SIDEBAR */
        .sidebar { width:64px; flex-shrink:0; display:flex; flex-direction:column; align-items:center; padding:16px 0; gap:4px; background:rgba(6,9,18,.95); border-right:1px solid rgba(255,255,255,.06); backdrop-filter:blur(20px); position:sticky; top:0; height:100vh; z-index:20; }
        .sb-btn { width:44px; height:44px; border-radius:13px; display:flex; align-items:center; justify-content:center; color:var(--t2); cursor:pointer; border:none; background:transparent; transition:color .2s,background .2s; position:relative; }
        .sb-btn:hover { color:var(--t1); background:rgba(255,255,255,.06); }
        .sb-btn.active { color:white; background:rgba(139,92,246,.18); }
        .sb-btn.active::before { content:''; position:absolute; left:-1px; top:50%; transform:translateY(-50%); width:3px; height:20px; background:linear-gradient(135deg,#8b5cf6,#6366f1); border-radius:0 3px 3px 0; }
        .sb-tooltip { position:absolute; left:56px; top:50%; transform:translateY(-50%); background:rgba(10,14,28,.95); border:1px solid rgba(255,255,255,.1); color:white; font-size:12px; font-weight:600; padding:5px 10px; border-radius:8px; white-space:nowrap; opacity:0; pointer-events:none; transition:opacity .15s; font-family:var(--FB); z-index:100; }
        .sb-btn:hover .sb-tooltip { opacity:1; }
        .sb-divider { width:32px; height:1px; background:rgba(255,255,255,.07); margin:6px 0; }
        .sb-bottom { margin-top:auto; padding-bottom:8px; }

        /* REVEALS */
        [data-reveal] { opacity:0; transform:translateY(24px); transition:opacity .75s cubic-bezier(.23,1,.32,1),transform .75s cubic-bezier(.23,1,.32,1); }
        [data-reveal].in { opacity:1; transform:translateY(0); }

        /* HERO */
        .ph0,.ph1,.ph2,.ph3 { opacity:0; transform:translateY(12px); }
        .ph0 { animation:phU .55s ease .06s forwards; }
        .ph1 { animation:phU .7s ease .2s  forwards; }
        .ph2 { animation:phU .7s ease .36s forwards; }
        .ph3 { animation:phU .6s ease .52s forwards; }
        @keyframes phU { to { opacity:1; transform:translateY(0); } }

        /* GRAD TEXT */
        .gt { background:linear-gradient(110deg,#a78bfa 0%,#818cf8 45%,#60a5fa 90%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* ORBS */
        .op1 { position:fixed; width:700px; height:700px; border-radius:50%; top:-20%; left:-8%; background:radial-gradient(circle,rgba(139,92,246,.1),transparent 60%); filter:blur(80px); pointer-events:none; z-index:0; animation:opa 28s ease-in-out infinite; }
        .op2 { position:fixed; width:500px; height:500px; border-radius:50%; bottom:5%; right:-5%; background:radial-gradient(circle,rgba(59,130,246,.09),transparent 60%); filter:blur(90px); pointer-events:none; z-index:0; animation:opb 22s ease-in-out infinite; }
        @keyframes opa { 0%,100%{transform:translate(0,0)} 50%{transform:translate(45px,55px) scale(1.05)} }
        @keyframes opb { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,-30px)} }

        /* NOISE */
        .noise { position:fixed; inset:0; pointer-events:none; z-index:1; opacity:.016; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:256px; }

        /* CREATE BTN */
        .create-btn { display:inline-flex; align-items:center; gap:8px; padding:11px 22px; border-radius:100px; background:linear-gradient(135deg,#8b5cf6,#6366f1); border:none; color:white; font-family:var(--FB); font-weight:600; font-size:13px; cursor:pointer; box-shadow:0 4px 20px rgba(139,92,246,.35); transition:transform .2s,box-shadow .2s; }
        .create-btn:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 8px 32px rgba(139,92,246,.52); }

        /* WHY GRID */
        .why-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }

        /* INSPO GRID */
        .inspo-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        @media(max-width:680px) { .inspo-grid { grid-template-columns:1fr; } }

        /* GLOW LINE */
        .gline { height:1px; background:linear-gradient(90deg,transparent,rgba(139,92,246,.45) 50%,transparent); margin:0 auto; }
      `}</style>

      <div className="op1" style={{ zIndex:0 }} /><div className="op2" style={{ zIndex:0 }} />
      <div className="noise" />
      <Particles />

      <div className="app-shell" style={{ position:"relative", zIndex:2 }}>

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div style={{ marginBottom:"16px", padding:"8px" }}><Logo size={32} /></div>
          {[
            { icon:Ic.home,  label:"Home",         path:"/",       active:false },
            { icon:Ic.chat,  label:"Chat",          path:"/chat",   active:false },
            { icon:Ic.pact,  label:"Pacts",         path:"/pact",   active:true  },
            { icon:Ic.vault, label:"Yield Vaults",  path:"/vaults", active:false },
          ].map(item => (
            <button key={item.path} className={`sb-btn ${item.active?"active":""}`} onClick={() => !item.active && router.push(item.path)}>
              {item.icon}<span className="sb-tooltip">{item.label}</span>
            </button>
          ))}
          <div className="sb-divider" />
          <button className="sb-btn" onClick={() => router.push("/chat")}>{Ic.dash}<span className="sb-tooltip">Dashboard</span></button>
          <div className="sb-bottom">
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"3px" }}>
              <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#8b5cf6" }} />
              <div style={{ fontSize:"9px", color:"#8b5cf6", fontWeight:600, letterSpacing:".04em", writingMode:"vertical-lr", textOrientation:"mixed", transform:"rotate(180deg)" }}>BASE</div>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <div style={{ flex:1, overflowY:"auto" }}>

          {/* Top bar */}
          <div style={{ position:"sticky", top:0, zIndex:10, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 36px", height:"56px", borderBottom:"1px solid rgba(255,255,255,.05)", backdropFilter:"blur(20px)", background:"rgba(6,9,18,.82)" }}>
            <div>
              <div style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"15px" }}>Stash Pacts</div>
              <div style={{ fontSize:"11px", color:"#6b7280" }}>Blockchain-enforced savings with someone you trust</div>
            </div>
            <button className="create-btn" onClick={openFresh}>{Ic.plus} New Pact</button>
          </div>

          <div style={{ maxWidth:"960px", margin:"0 auto", padding:"60px 36px 100px" }}>

            {/* HERO */}
            <div style={{ marginBottom:"80px" }}>
              <div className="ph0" style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"11px", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", color:"#a78bfa", padding:"6px 14px", borderRadius:"100px", border:"1px solid rgba(139,92,246,.22)", background:"rgba(139,92,246,.07)", marginBottom:"24px" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#8b5cf6", display:"inline-block" }} />
                StashPact · Live on Base Sepolia
              </div>
              <h1 style={{ marginBottom:"20px" }}>
                <div className="ph1" style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(48px,7vw,82px)", letterSpacing:"-.04em", lineHeight:.96, color:"var(--t1)" }}>
                  Save together,
                </div>
                <div className="ph2 gt" style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(48px,7vw,82px)", letterSpacing:"-.04em", lineHeight:.96 }}>
                  unlock together.
                </div>
              </h1>
              <p className="ph3" style={{ color:"var(--t2)", fontSize:"18px", lineHeight:1.72, maxWidth:"520px", fontWeight:400, marginBottom:"32px" }}>
                Create a savings commitment with anyone on Earth. A smart contract makes sure neither of you can back out until both hit the target — no exceptions, no excuses.
              </p>
              {/* Feature pills */}
              <div className="ph3" style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                {[
                  { label:"No early withdrawal", c:"#4ade80" },
                  { label:"Both must commit",     c:"#fbbf24" },
                  { label:"USDC on Base",          c:"#60a5fa" },
                  { label:"Works across borders",  c:"#a78bfa" },
                ].map(f => (
                  <div key={f.label} style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"12px", fontWeight:500, padding:"6px 14px", borderRadius:"100px", border:"1px solid rgba(255,255,255,.08)", color:f.c, background:"rgba(255,255,255,.02)" }}>
                    <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:f.c, display:"inline-block" }} />
                    {f.label}
                  </div>
                ))}
              </div>
            </div>

            {/* YOUR PACTS */}
            {pacts.length > 0 && (
              <div style={{ marginBottom:"64px" }} data-reveal>
                <p style={{ fontFamily:"var(--FB)", fontSize:"11px", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#818cf8", marginBottom:"20px" }}>Your pacts</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                  {pacts.map((p,i) => (
                    <div key={p.id} data-reveal data-delay={String(i*90)}><MyPactCard pact={p} /></div>
                  ))}
                </div>
              </div>
            )}

            {/* WHY IT WORKS */}
            <div style={{ marginBottom:"80px" }} data-reveal>
              <div style={{ marginBottom:"36px" }}>
                <p style={{ fontFamily:"var(--FB)", fontSize:"11px", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#a78bfa", marginBottom:"14px" }}>Why it works</p>
                <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(34px,4.5vw,52px)", letterSpacing:"-.04em", lineHeight:1.04, marginBottom:"14px" }}>
                  Saving alone is hard.<br />Together is different.
                </h2>
                <p style={{ color:"var(--t2)", fontSize:"16px", maxWidth:"420px", lineHeight:1.7 }}>
                  Psychology shows we follow through on commitments when someone else is counting on us. Stash Pact puts that accountability on-chain.
                </p>
              </div>
              <div className="why-grid">
                {[
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title:"No one can bail", desc:"The smart contract locks both parties' funds until the goal is hit. Your friend can't pull out — and neither can you.", c:"#818cf8" },
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title:"Save at your pace", desc:"Deposit whenever — weekly, monthly, or all at once. There's no schedule. Just a shared finish line.", c:"#fbbf24" },
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title:"Works across borders", desc:"Your pact partner can be anywhere in the world. USDC on Base works the same in Singapore or São Paulo.", c:"#4ade80" },
                  { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, title:"Zero fees, zero middlemen", desc:"No bank takes a cut. No platform fee. The only cost is a tiny Base gas fee — usually less than a cent.", c:"#34d399" },
                ].map((item,i) => (
                  <div key={item.title} data-reveal data-delay={String(i*80)} style={{ padding:"28px", borderRadius:"18px", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", transition:"border-color .3s, box-shadow .3s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`${item.c}33`; (e.currentTarget as HTMLElement).style.boxShadow=`0 0 30px ${item.c}0a`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.07)"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}>
                    <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:`${item.c}15`, border:`1px solid ${item.c}28`, display:"flex", alignItems:"center", justifyContent:"center", color:item.c, marginBottom:"18px" }}>{item.icon}</div>
                    <h3 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"17px", letterSpacing:"-.02em", marginBottom:"8px" }}>{item.title}</h3>
                    <p style={{ color:"var(--t2)", fontSize:"13px", lineHeight:1.75 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="gline" style={{ maxWidth:"500px", marginBottom:"80px" }} />

            {/* INSPIRATION — PHOTO CARDS */}
            <div data-reveal style={{ marginBottom:"80px" }}>
              <div style={{ marginBottom:"40px" }}>
                <p style={{ fontFamily:"var(--FB)", fontSize:"11px", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#a78bfa", marginBottom:"14px" }}>What will you save for?</p>
                <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(34px,4.5vw,52px)", letterSpacing:"-.04em", lineHeight:1.04, marginBottom:"14px" }}>
                  Real goals.<br />Real people.
                </h2>
                <p style={{ color:"var(--t2)", fontSize:"16px", maxWidth:"400px", lineHeight:1.7 }}>
                  Click any card below to use it as a starting point for your own pact.
                </p>
              </div>
              <div className="inspo-grid">
                {INSPO.map(item => (
                  <div key={item.id} data-reveal data-delay={INSPO.indexOf(item)*90 + ""}>
                    <InspoCard item={item} onUse={() => openWithInspo(item)} />
                  </div>
                ))}
              </div>
            </div>

            {/* HOW IT WORKS — steps */}
            <div data-reveal style={{ padding:"48px", borderRadius:"24px", background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.06)", marginBottom:"48px" }}>
              <p style={{ fontFamily:"var(--FB)", fontSize:"11px", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#6b7280", marginBottom:"32px" }}>How pacts work</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"32px" }}>
                {[
                  { n:"01", title:"Create", desc:"Set a goal name and how much each person saves." },
                  { n:"02", title:"Invite", desc:"Send your partner's wallet address. They accept onchain." },
                  { n:"03", title:"Both save", desc:"Contribute at any pace. The contract tracks both balances." },
                  { n:"04", title:"Unlock", desc:"Once both hit target, either can withdraw. Not a second before." },
                ].map(s => (
                  <div key={s.n}>
                    <div style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"42px", letterSpacing:"-.04em", color:"transparent", WebkitTextStroke:"1px rgba(139,92,246,.18)", marginBottom:"10px", lineHeight:1 }}>{s.n}</div>
                    <h4 style={{ fontFamily:"var(--FD)", fontWeight:800, fontSize:"15px", letterSpacing:"-.02em", marginBottom:"6px" }}>{s.title}</h4>
                    <p style={{ fontSize:"13px", color:"var(--t2)", lineHeight:1.75 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract info */}
            <div data-reveal style={{ display:"flex", gap:"14px", padding:"18px 22px", borderRadius:"14px", background:"rgba(251,191,36,.04)", border:"1px solid rgba(251,191,36,.14)" }}>
              <span style={{ color:"#fbbf24", flexShrink:0, marginTop:"1px" }}>{Ic.info}</span>
              <p style={{ fontSize:"13px", color:"#94a3b8", lineHeight:1.75 }}>
                <strong style={{ color:"#fbbf24", fontWeight:700 }}>Smart contract: </strong>
                StashPact.sol is deployed on Base Sepolia at{" "}
                <code style={{ fontFamily:"monospace", color:"#a78bfa" }}>0xcABcbbfA91B10df707d6f56ccBb7adA64161d5D9</code>. Neither party can withdraw until both reach target.
              </p>
            </div>

            {/* Final CTA */}
            <div data-reveal style={{ marginTop:"64px", borderRadius:"26px", padding:"72px 48px", textAlign:"center", position:"relative", overflow:"hidden", background:"linear-gradient(160deg,rgba(139,92,246,.1),rgba(99,102,241,.07))", border:"1px solid rgba(139,92,246,.2)" }}>
              <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 50% at 50% 0%,rgba(139,92,246,.15),transparent)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(139,92,246,.7) 50%,transparent)" }} />
              <div style={{ position:"relative" }}>
                <h2 style={{ fontFamily:"var(--FD)", fontWeight:900, fontSize:"clamp(32px,4vw,50px)", letterSpacing:"-.04em", lineHeight:1.05, marginBottom:"16px" }}>
                  Who are you saving<br />with today?
                </h2>
                <p style={{ color:"var(--t2)", fontSize:"17px", marginBottom:"36px", fontWeight:300 }}>A partner. A best friend. A roommate. Anyone with a wallet and a goal worth chasing.</p>
                <button className="create-btn" style={{ fontSize:"15px", padding:"14px 40px" }} onClick={openFresh}>
                  Create a Stash Pact {Ic.arrow}
                </button>
                <p style={{ color:"var(--t3)", fontSize:"12px", marginTop:"16px" }}>Secured by Base blockchain · Free forever · No signup required</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {showCreate && (
        <CreateModal
          initial={createInitial}
          onClose={() => setShowCreate(false)}
          onCreate={p => setPacts(prev => [p, ...prev])}
        />
      )}
    </>
  );
}