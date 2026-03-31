"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const StashifyLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="icongrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2563eb" }} />
        <stop offset="100%" style={{ stopColor: "#7c3aed" }} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#icongrad3)" />
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

type Pact = {
  id: number;
  goalName: string;
  partner: string;
  targetEach: number;
  mySaved: number;
  partnerSaved: number;
  status: "Pending" | "Active" | "Completed" | "Cancelled";
};

const INSPIRATION = [
  {
    title: "Italy with the squad",
    story: "Four friends. Rome, Florence, Amalfi Coast. Each saving $800 to make it happen.",
    photo: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
    avatars: ["A", "R", "K", "D"],
    colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"],
    saved: 2100,
    target: 3200,
    tag: "Friend group · 4 people",
    accentColor: "#60a5fa",
    goalName: "Italy Trip",
    targetEach: "800",
  },
  {
    title: "Our first dog together",
    story: "Maya & James are saving for their first puppy — vet bills, food, toys, and all the love.",
    photo: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80",
    avatars: ["M", "J"],
    colors: ["#f59e0b", "#10b981"],
    saved: 340,
    target: 500,
    tag: "Couple · 2 people",
    accentColor: "#fbbf24",
    goalName: "First Dog Fund",
    targetEach: "250",
  },
  {
    title: "Graduation trip to Bali",
    story: "Two best friends, one week in Bali after finals. The countdown starts now.",
    photo: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    avatars: ["N", "P"],
    colors: ["#10b981", "#f43f5e"],
    saved: 620,
    target: 700,
    tag: "Best friends · 2 people",
    accentColor: "#34d399",
    goalName: "Bali Grad Trip",
    targetEach: "350",
  },
  {
    title: "New gaming setup",
    story: "Roommates splitting the cost of a PS5, monitor, and decent headset for the dorm.",
    photo: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
    avatars: ["T", "S"],
    colors: ["#8b5cf6", "#06b6d4"],
    saved: 180,
    target: 300,
    tag: "Roommates · 2 people",
    accentColor: "#a78bfa",
    goalName: "Gaming Setup",
    targetEach: "150",
  },
];

const WHY_ITEMS = [
  {
    icon: "🔒",
    title: "No one can bail",
    desc: "The smart contract locks both parties' funds until the goal is hit. Your friend can't pull out — and neither can you.",
    highlight: "Commitment enforced by code",
  },
  {
    icon: "⚡",
    title: "Save at your own pace",
    desc: "Deposit whenever you want — weekly, monthly, or all at once. There's no schedule, just a shared finish line.",
    highlight: "Fully flexible",
  },
  {
    icon: "🌍",
    title: "Works across borders",
    desc: "Your pact partner can be anywhere in the world. USDC on Base works the same whether you're in Singapore or São Paulo.",
    highlight: "Global by default",
  },
  {
    icon: "💸",
    title: "Zero fees, zero middlemen",
    desc: "No bank takes a cut. No platform fee. The only cost is a tiny Base gas fee — usually less than a cent.",
    highlight: "Keep every dollar",
  },
];

export default function PactPage() {
  const router = useRouter();
  const [pacts, setPacts] = useState<Pact[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ goalName: "", partner: "", targetEach: "" });
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCreate = async () => {
    if (!form.goalName || !form.partner || !form.targetEach) return;
    setCreating(true);
    await new Promise((r) => setTimeout(r, 1800));
    const newPact: Pact = {
      id: pacts.length + 1,
      goalName: form.goalName,
      partner: form.partner.slice(0, 6) + "..." + form.partner.slice(-4),
      targetEach: parseFloat(form.targetEach),
      mySaved: 0,
      partnerSaved: 0,
      status: "Pending",
    };
    setPacts([...pacts, newPact]);
    setCreating(false);
    setCreated(true);
    setShowCreate(false);
    setForm({ goalName: "", partner: "", targetEach: "" });
    setTimeout(() => setCreated(false), 5000);
  };

  const useInspo = (item: typeof INSPIRATION[0]) => {
    setForm({ goalName: item.goalName, partner: "", targetEach: item.targetEach });
    setShowCreate(true);
  };

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "#080d1a", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Ambient glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[30%] w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.10), transparent 65%)" }} />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 65%)" }} />
        <div className="absolute top-[50%] left-[-5%] w-[300px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.05), transparent 65%)" }} />
      </div>

      {/* ── NAV ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.06]" style={{ backdropFilter: "blur(12px)", background: "rgba(8,13,26,0.92)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/chat")} className="text-gray-600 hover:text-gray-400 transition-colors text-xl mr-1">←</button>
          <StashifyLogo size={30} />
          <div>
            <p className="text-sm font-semibold leading-none">Stash Pact</p>
            <p className="text-xs text-purple-400 mt-0.5">● Onchain social savings</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition-all"
          style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
        >
          + Create a Pact
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 text-center px-6 pt-20 pb-16 overflow-hidden">
        {/* Large handshake behind headline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] text-[320px]">
          🤝
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-medium px-4 py-2 rounded-full mb-8 border border-purple-500/20" style={{ background: "rgba(124,58,237,0.08)" }}>
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            The world&apos;s first onchain social savings protocol
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl mx-auto mb-6">
            Some goals are better
            <br />
            <span style={{ background: "linear-gradient(90deg, #a78bfa 0%, #818cf8 40%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              saved together.
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-4 leading-relaxed">
            Create a Stash Pact with anyone. Both of you commit, both of you save — and the blockchain makes sure neither of you can back out.
          </p>

          <p className="text-gray-600 text-sm mb-10 max-w-md mx-auto">
            No spreadsheets. No awkward reminders. No broken promises. Just two people and a smart contract.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setShowCreate(true)}
              className="text-white font-semibold py-4 px-10 rounded-2xl text-base transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}
            >
              Start a pact now →
            </button>
            <a href="#inspiration" className="text-gray-400 hover:text-white text-sm font-medium py-4 px-7 rounded-2xl transition-all border border-white/[0.08] hover:border-white/20">
              See examples ↓
            </a>
          </div>
          <p className="text-gray-700 text-xs">Secured by smart contracts · No fees · Works with any wallet</p>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="relative z-10 border-y border-white/[0.05] py-4" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-gray-600 font-medium px-8">
          {["🤝 Save with anyone, anywhere", "🔒 Smart contract enforced commitment", "💵 USDC — stable, borderless money", "⚡ Instant deposits on Base", "🌍 No bank account required"].map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── WHY STASH PACT ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm font-medium tracking-widest mb-4 uppercase">Why it works</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Saving alone is hard.<br />Saving together is different.
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Psychology says we follow through on commitments when someone else is counting on us. Stash Pact puts that on the blockchain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {WHY_ITEMS.map((item) => (
            <div key={item.title} className="group flex gap-5 p-6 rounded-2xl border border-white/[0.07] hover:border-purple-500/30 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
              <span className="text-3xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-base mb-1.5 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">{item.desc}</p>
                <span className="text-xs text-purple-400/70 font-medium">{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-10 px-6 py-16" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-400 text-sm font-medium tracking-widest mb-4 uppercase">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Three steps to a shared goal</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "✍️", step: "01", title: "Make the pact", desc: "Enter your friend's wallet address, name your shared goal, and set how much each person needs to save." },
              { icon: "💸", step: "02", title: "Both save at your pace", desc: "Deposit USDC into the shared vault whenever you want. Weekly, monthly — whatever works for both of you." },
              { icon: "🔓", step: "03", title: "Unlock when both hit target", desc: "Once both of you reach your individual target, the smart contract releases your funds. No one can pull out early." },
            ].map((s) => (
              <div key={s.step} className="group relative p-7 rounded-2xl border border-white/[0.07] hover:border-purple-500/30 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>
                    {s.icon}
                  </div>
                  <span className="text-4xl font-bold text-white/[0.04] group-hover:text-white/[0.08] transition-colors">{s.step}</span>
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-purple-400 transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSPIRATION SECTION ── */}
      <section id="inspiration" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm font-medium tracking-widest mb-4 uppercase">Inspiration</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            What will you save for?
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Real goals from students and friends around the world. Click any card to use it as a starting point.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {INSPIRATION.map((item, i) => {
            const pct = Math.round((item.saved / item.target) * 100);
            const isHovered = hoveredCard === i;
            return (
              <div
                key={item.title}
                className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500"
                style={{
                  height: "340px",
                  transform: isHovered ? "scale(1.02)" : "scale(1)",
                  boxShadow: isHovered ? `0 0 60px rgba(124,58,237,0.2)` : "none",
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => useInspo(item)}
              >
                {/* Background photo */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${item.photo})`,
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                  }}
                />

                {/* Dark gradient overlay — stronger at bottom */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)" }} />

                {/* Purple tint on hover */}
                <div className="absolute inset-0 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), transparent)", opacity: isHovered ? 1 : 0 }} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top — tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", color: item.accentColor }}>
                      {item.tag}
                    </span>
                    {/* Avatars */}
                    <div className="flex -space-x-2">
                      {item.avatars.map((a, j) => (
                        <div
                          key={j}
                          className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold"
                          style={{ background: item.colors[j] }}
                        >
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom — content */}
                  <div>
                    <h3 className="font-bold text-2xl mb-2 leading-tight">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.story}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">${item.saved.toLocaleString()} saved together</span>
                        <span style={{ color: item.accentColor }}>{pct}% there</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: isHovered ? `${pct}%` : `${pct - 10}%`,
                            background: `linear-gradient(90deg, ${item.colors[0]}, ${item.colors[item.colors.length - 1]})`,
                          }}
                        />
                      </div>
                    </div>

                    {/* CTA — shown on hover */}
                    <div className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                      <button className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
                        Use this as my starting point →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── YOUR PACTS ── */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 pb-16">
        {created && (
          <div className="mb-6 px-5 py-4 rounded-2xl border border-green-500/20 flex items-center gap-4" style={{ background: "rgba(34,197,94,0.08)" }}>
            <span className="text-2xl">🎉</span>
            <div>
              <p className="text-green-400 font-semibold text-sm">Pact created onchain!</p>
              <p className="text-green-400/60 text-xs mt-0.5">Your friend will receive an invitation to join. The smart contract is ready.</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Your active pacts</h2>
          {pacts.length > 0 && (
            <button onClick={() => setShowCreate(true)} className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">+ New pact</button>
          )}
        </div>

        {pacts.length === 0 ? (
          <div className="text-center py-20 border border-white/[0.07] rounded-3xl" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>🤝</div>
            <h3 className="font-semibold text-lg mb-2">No pacts yet</h3>
            <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">Create your first Stash Pact and start saving toward something meaningful with someone you trust.</p>
            <button
              onClick={() => setShowCreate(true)}
              className="text-white text-sm font-semibold py-3.5 px-7 rounded-xl transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
            >
              Create your first pact
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {pacts.map((pact) => {
              const myPct = Math.min((pact.mySaved / pact.targetEach) * 100, 100);
              const partnerPct = Math.min((pact.partnerSaved / pact.targetEach) * 100, 100);
              return (
                <div key={pact.id} className="p-6 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="font-semibold text-base">{pact.goalName}</p>
                      <p className="text-gray-600 text-xs mt-0.5">Pact with {pact.partner}</p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${pact.status === "Active" ? "text-blue-400 bg-blue-400/10" : pact.status === "Completed" ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"}`}>
                      {pact.status}
                    </span>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">You</span>
                        <span className="text-blue-400">${pact.mySaved} / ${pact.targetEach}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${myPct}%`, background: "linear-gradient(90deg, #2563eb, #6366f1)" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">{pact.partner}</span>
                        <span className="text-purple-400">${pact.partnerSaved} / ${pact.targetEach}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${partnerPct}%`, background: "linear-gradient(90deg, #7c3aed, #a78bfa)" }} />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => router.push("/chat")} className="w-full py-2.5 rounded-xl text-sm font-medium text-purple-400 border border-purple-500/20 hover:border-purple-500/40 transition-all" style={{ background: "rgba(124,58,237,0.06)" }}>
                    + Add savings via chat
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative z-10 text-center px-6 pb-28">
        <div className="max-w-2xl mx-auto rounded-3xl p-16 border border-purple-500/15 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.08))" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.1), transparent 70%)" }} />
          <div className="relative">
            <div className="text-5xl mb-6">🤝</div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Who are you saving<br />with today?</h2>
            <p className="text-gray-500 mb-10 text-lg max-w-sm mx-auto">A partner. A best friend. A roommate. Anyone with a wallet and a goal worth chasing.</p>
            <button
              onClick={() => setShowCreate(true)}
              className="text-white font-semibold py-4 px-12 rounded-2xl text-base transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 0 40px rgba(124,58,237,0.3)" }}
            >
              Create a Stash Pact →
            </button>
            <p className="text-gray-700 text-xs mt-5">Secured by Base blockchain · Free forever · No signup required</p>
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(16px)" }}>
          <div className="w-full max-w-md rounded-3xl border border-white/[0.08] overflow-hidden" style={{ background: "#0d1424" }}>
            <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>🤝</div>
                  <h2 className="text-xl font-bold">Create a Stash Pact</h2>
                </div>
                <button onClick={() => setShowCreate(false)} className="text-gray-600 hover:text-gray-400 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-all">×</button>
              </div>
              <p className="text-gray-500 text-sm mt-1 ml-12">The blockchain enforces your commitment to each other.</p>
            </div>

            <div className="px-8 py-6 space-y-5">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-2 block uppercase tracking-wide">What are you saving for?</label>
                <input
                  type="text"
                  placeholder="Italy trip, First dog, Festival tickets..."
                  value={form.goalName}
                  onChange={(e) => setForm({ ...form, goalName: e.target.value })}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none px-4 py-3.5 rounded-xl border border-white/[0.08] focus:border-purple-500/50 transition-colors"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-2 block uppercase tracking-wide">Your friend&apos;s wallet address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={form.partner}
                  onChange={(e) => setForm({ ...form, partner: e.target.value })}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none px-4 py-3.5 rounded-xl border border-white/[0.08] focus:border-purple-500/50 transition-colors font-mono"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-2 block uppercase tracking-wide">Target per person (USDC)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">$</span>
                  <input
                    type="number"
                    placeholder="500"
                    value={form.targetEach}
                    onChange={(e) => setForm({ ...form, targetEach: e.target.value })}
                    className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none pl-8 pr-4 py-3.5 rounded-xl border border-white/[0.08] focus:border-purple-500/50 transition-colors"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  />
                </div>
                <p className="text-gray-600 text-xs mt-1.5">Each person saves this amount independently.</p>
              </div>

              {(form.goalName && form.targetEach) && (
                <div className="p-4 rounded-xl border border-purple-500/20" style={{ background: "rgba(124,58,237,0.08)" }}>
                  <p className="text-purple-400 text-xs font-semibold mb-1.5 uppercase tracking-wide">Pact summary</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    You and your friend will each save <span className="text-white font-semibold">${form.targetEach} USDC</span> toward <span className="text-white font-semibold">&quot;{form.goalName}&quot;</span>. Neither can withdraw until both hit the target — enforced by the Base blockchain.
                  </p>
                </div>
              )}
            </div>

            <div className="px-8 pb-8 space-y-3">
              <button
                onClick={handleCreate}
                disabled={creating || !form.goalName || !form.partner || !form.targetEach}
                className="w-full py-4 rounded-2xl text-sm font-semibold text-white transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: creating ? "none" : "0 0 20px rgba(124,58,237,0.25)" }}
              >
                {creating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating pact onchain...
                  </>
                ) : "Create Stash Pact 🤝"}
              </button>
              <button onClick={() => setShowCreate(false)} className="w-full py-3 rounded-2xl text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}