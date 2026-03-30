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
  emoji: string;
};

const INSPIRATION = [
  {
    emoji: "🐶",
    title: "First dog together",
    desc: "Maya & James are saving for their first puppy — vet bills, food, and all.",
    avatars: ["M", "J"],
    colors: ["#f59e0b", "#10b981"],
    saved: 340,
    target: 500,
    tag: "Couple",
    tagColor: "rgba(245,158,11,0.15)",
    tagText: "#f59e0b",
    bg: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(16,185,129,0.08))",
    border: "rgba(245,158,11,0.2)",
  },
  {
    emoji: "🇮🇹",
    title: "Italy with the squad",
    desc: "Four friends. Rome, Florence, Amalfi. Each saving $800 to make it real.",
    avatars: ["A", "R", "K", "D"],
    colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"],
    saved: 2100,
    target: 3200,
    tag: "Friend group",
    tagColor: "rgba(59,130,246,0.15)",
    tagText: "#60a5fa",
    bg: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))",
    border: "rgba(99,102,241,0.2)",
  },
  {
    emoji: "🎮",
    title: "Gaming setup upgrade",
    desc: "Roommates splitting the cost of a new PS5 and monitor for their dorm.",
    avatars: ["T", "S"],
    colors: ["#8b5cf6", "#06b6d4"],
    saved: 180,
    target: 300,
    tag: "Roommates",
    tagColor: "rgba(139,92,246,0.15)",
    tagText: "#a78bfa",
    bg: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))",
    border: "rgba(139,92,246,0.2)",
  },
  {
    emoji: "🎓",
    title: "Graduation trip",
    desc: "Two best friends saving for a Bali trip after finals. Almost there.",
    avatars: ["N", "P"],
    colors: ["#10b981", "#f43f5e"],
    saved: 620,
    target: 700,
    tag: "Best friends",
    tagColor: "rgba(16,185,129,0.15)",
    tagText: "#34d399",
    bg: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(244,63,94,0.08))",
    border: "rgba(16,185,129,0.2)",
  },
];

export default function PactPage() {
  const router = useRouter();
  const [pacts, setPacts] = useState<Pact[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ goalName: "", partner: "", targetEach: "" });
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

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
      emoji: "🤝",
    };
    setPacts([...pacts, newPact]);
    setCreating(false);
    setCreated(true);
    setShowCreate(false);
    setForm({ goalName: "", partner: "", targetEach: "" });
    setTimeout(() => setCreated(false), 4000);
  };

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "#080d1a", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Ambient glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[30%] w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.10), transparent 65%)" }} />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 65%)" }} />
        <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.05), transparent 65%)" }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.06]" style={{ backdropFilter: "blur(12px)", background: "rgba(8,13,26,0.9)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/chat")} className="text-gray-600 hover:text-gray-400 transition-colors text-lg mr-1">←</button>
          <StashifyLogo size={30} />
          <div>
            <p className="text-sm font-semibold leading-none">Stash Pact</p>
            <p className="text-xs text-purple-400 mt-0.5">● Powered by Base blockchain</p>
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
      <section className="relative z-10 text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8 border border-purple-500/20" style={{ background: "rgba(124,58,237,0.08)" }}>
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
          The world&apos;s first onchain social savings protocol
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-3xl mx-auto mb-6">
          Save together.
          <br />
          <span style={{ background: "linear-gradient(90deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Stay accountable.
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
          Create a Stash Pact with anyone. Both of you save toward a shared goal — neither can bail. The blockchain makes sure of it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setShowCreate(true)}
            className="text-white font-semibold py-4 px-10 rounded-2xl text-base transition-all"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 0 32px rgba(124,58,237,0.35)" }}
          >
            Start your first pact →
          </button>
          <button className="text-gray-400 hover:text-white text-sm font-medium py-4 px-7 rounded-2xl transition-all border border-white/[0.08] hover:border-white/20">
            See how it works ↓
          </button>
        </div>
        <p className="text-gray-600 text-xs">Secured by smart contracts · No middleman · Funds always yours</p>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "✍️", step: "01", title: "Make the pact", desc: "Enter your friend's wallet, name your goal, and set how much each person needs to save." },
            { icon: "💸", step: "02", title: "Both save onchain", desc: "You and your friend each deposit USDC into the shared vault at your own pace." },
            { icon: "🔓", step: "03", title: "Unlock together", desc: "Once both of you hit the target, the smart contract releases your funds. No one can pull out early." },
          ].map((s) => (
            <div key={s.step} className="group p-6 rounded-2xl border border-white/[0.07] hover:border-purple-500/30 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-4xl font-bold text-white/[0.04] group-hover:text-white/[0.07] transition-colors">{s.step}</span>
              </div>
              <h3 className="font-semibold text-base mb-2 group-hover:text-purple-400 transition-colors">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INSPIRATION SECTION ── */}
      <section className="relative z-10 px-6 pb-24" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-16 mb-4">
            <p className="text-purple-400 text-sm font-medium tracking-widest mb-4 uppercase">Inspiration</p>
            <h2 className="text-4xl font-bold tracking-tight mb-4">What are people saving for?</h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">Real goals from students and friends around the world using Stash Pact.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {INSPIRATION.map((item) => {
              const pct = Math.round((item.saved / item.target) * 100);
              return (
                <div
                  key={item.title}
                  className="group relative p-6 rounded-3xl border cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: item.bg, borderColor: item.border }}
                  onClick={() => {
                    setForm({ goalName: item.title, partner: "", targetEach: (item.target / item.avatars.length).toString() });
                    setShowCreate(true);
                  }}
                >
                  {/* Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: item.tagColor, color: item.tagText }}>
                      {item.tag}
                    </span>
                    <span className="text-2xl">{item.emoji}</span>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{item.desc}</p>

                  {/* Avatars */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      {item.avatars.map((a, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold"
                          style={{ background: item.colors[i] }}
                        >
                          {a}
                        </div>
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs">{item.avatars.length} people · ${item.target} total goal</span>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-400">${item.saved} saved</span>
                      <span style={{ color: item.tagText }}>{pct}% there</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${item.colors[0]}, ${item.colors[item.colors.length - 1]})` }}
                      />
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className="absolute inset-0 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
                    <span className="text-white font-semibold text-sm px-5 py-2.5 rounded-xl" style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
                      Use this as inspiration →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── YOUR PACTS ── */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        {/* Success toast */}
        {created && (
          <div className="mb-6 px-5 py-4 rounded-2xl border border-green-500/20 text-green-400 text-sm font-medium flex items-center gap-3" style={{ background: "rgba(34,197,94,0.08)" }}>
            <span className="text-xl">🎉</span>
            <div>
              <p className="font-semibold">Pact created onchain!</p>
              <p className="text-green-400/60 text-xs mt-0.5">Your friend will receive an invitation to join.</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Your pacts</h2>
          {pacts.length > 0 && (
            <button onClick={() => setShowCreate(true)} className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">
              + New pact
            </button>
          )}
        </div>

        {pacts.length === 0 ? (
          <div className="text-center py-20 border border-white/[0.07] rounded-3xl" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="font-semibold text-lg mb-2">No pacts yet</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">Create your first pact with a friend and start saving toward something meaningful together.</p>
            <button
              onClick={() => setShowCreate(true)}
              className="text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
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
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pact.emoji}</span>
                      <div>
                        <p className="font-semibold">{pact.goalName}</p>
                        <p className="text-gray-600 text-xs">with {pact.partner}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      pact.status === "Active" ? "text-blue-400 bg-blue-400/10" :
                      pact.status === "Completed" ? "text-green-400 bg-green-400/10" :
                      pact.status === "Pending" ? "text-yellow-400 bg-yellow-400/10" :
                      "text-gray-400 bg-gray-400/10"
                    }`}>
                      {pact.status}
                    </span>
                  </div>
                  <div className="space-y-3">
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
                  <button
                    onClick={() => router.push("/chat")}
                    className="mt-4 w-full py-2.5 rounded-xl text-sm font-medium text-purple-400 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                    style={{ background: "rgba(124,58,237,0.06)" }}
                  >
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
        <div className="max-w-2xl mx-auto rounded-3xl p-14 border border-purple-500/15 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.08))" }}>
          <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.08), transparent 70%)" }} />
          <div className="relative">
            <div className="text-5xl mb-6">🤝</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Who are you saving<br />with today?
            </h2>
            <p className="text-gray-500 mb-8 text-base">A partner. A best friend. A roommate. Anyone with a wallet and a dream.</p>
            <button
              onClick={() => setShowCreate(true)}
              className="text-white font-semibold py-4 px-10 rounded-2xl text-base transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 0 32px rgba(124,58,237,0.3)" }}
            >
              Create a Stash Pact →
            </button>
          </div>
        </div>
      </section>

      {/* ── CREATE PACT MODAL ── */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}>
          <div className="w-full max-w-md rounded-3xl border border-white/[0.08] overflow-hidden" style={{ background: "#0d1424" }}>
            {/* Modal header */}
            <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-bold">Create a Stash Pact</h2>
                <button onClick={() => setShowCreate(false)} className="text-gray-600 hover:text-gray-400 text-2xl leading-none">×</button>
              </div>
              <p className="text-gray-500 text-sm">The blockchain will hold both parties accountable.</p>
            </div>

            {/* Form */}
            <div className="px-8 py-6 space-y-5">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-2 block uppercase tracking-wide">What are you saving for?</label>
                <input
                  type="text"
                  placeholder="e.g. Japan Trip, First Dog, Festival Tickets..."
                  value={form.goalName}
                  onChange={(e) => setForm({ ...form, goalName: e.target.value })}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none px-4 py-3.5 rounded-xl border border-white/[0.08] focus:border-purple-500/40 transition-colors"
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
                  className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none px-4 py-3.5 rounded-xl border border-white/[0.08] focus:border-purple-500/40 transition-colors font-mono"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium mb-2 block uppercase tracking-wide">Target amount per person (USDC)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    placeholder="500"
                    value={form.targetEach}
                    onChange={(e) => setForm({ ...form, targetEach: e.target.value })}
                    className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none pl-8 pr-4 py-3.5 rounded-xl border border-white/[0.08] focus:border-purple-500/40 transition-colors"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  />
                </div>
                <p className="text-gray-600 text-xs mt-1.5">Each person saves this amount independently toward the shared goal.</p>
              </div>

              {/* Summary */}
              {form.goalName && form.targetEach && (
                <div className="p-4 rounded-xl border border-purple-500/20" style={{ background: "rgba(124,58,237,0.08)" }}>
                  <p className="text-purple-400 text-xs font-medium mb-1">Pact summary</p>
                  <p className="text-sm text-gray-300">
                    You and your friend will each save <span className="text-white font-semibold">${form.targetEach} USDC</span> toward <span className="text-white font-semibold">{form.goalName}</span>. Neither can withdraw until both hit the target.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-8 pb-8 space-y-3">
              <button
                onClick={handleCreate}
                disabled={creating || !form.goalName || !form.partner || !form.targetEach}
                className="w-full py-4 rounded-2xl text-sm font-semibold text-white transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: creating ? "none" : "0 0 20px rgba(124,58,237,0.3)" }}
              >
                {creating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating pact onchain...
                  </>
                ) : (
                  "Create Stash Pact 🤝"
                )}
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="w-full py-3 rounded-2xl text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}