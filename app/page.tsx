"use client";
import { useRouter } from "next/navigation";

const StashifyLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="icongrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2563eb" }} />
        <stop offset="100%" style={{ stopColor: "#7c3aed" }} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#icongrad)" />
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

const NavLink = ({ href, label, emoji }: { href: string; label: string; emoji: string }) => (
  <a
    href={href}
    className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-all duration-200 border border-transparent hover:border-white/10"
    style={{ background: "rgba(255,255,255,0)" }}
    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0)")}
  >
    <span className="text-base">{emoji}</span>
    <span>{label}</span>
    <span className="text-gray-700 group-hover:text-gray-400 transition-colors text-xs">↓</span>
  </a>
);

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "#080d1a", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>

      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12), transparent 65%)" }} />
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.10), transparent 65%)" }} />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 65%)" }} />
      </div>

      {/* ── NAV ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-white/[0.06]" style={{ backdropFilter: "blur(12px)", background: "rgba(8,13,26,0.8)" }}>
        {/* Brand */}
        <div className="flex items-center gap-3">
          <StashifyLogo size={34} />
          <span className="font-semibold text-lg tracking-tight">Stashify</span>
        </div>

        {/* Nav links — styled as pill tabs */}
        <div className="hidden md:flex items-center gap-1 px-2 py-2 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.03)" }}>
          <NavLink href="#how" label="How it works" emoji="⚡" />
          <div className="w-px h-5 bg-white/10" />
          <NavLink href="#why" label="Why Stashify" emoji="🔒" />
          <div className="w-px h-5 bg-white/10" />
          <NavLink href="#faq" label="FAQ" emoji="💬" />
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/chat")}
          className="text-white text-sm font-semibold py-2.5 px-5 rounded-xl transition-all"
          style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }}
        >
          Open app →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-16">

        {/* Logo — very first thing */}
        <div className="mb-6">
          <StashifyLogo size={80} />
        </div>

        {/* App name under logo */}
        <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-8">Stashify</p>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-medium px-3.5 py-1.5 rounded-full mb-10 border border-blue-500/20" style={{ background: "rgba(37,99,235,0.08)" }}>
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Live on Base · Powered by AI · Zero fees
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight max-w-3xl mb-6">
          Your money.
          <br />
          <span style={{ background: "linear-gradient(90deg, #60a5fa 0%, #818cf8 50%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Your goals.
          </span>
          <br />
          On autopilot.
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
          Tell Stashify what you want to save for. It moves real money onchain — no bank, no forms, no friction.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <button
            onClick={() => router.push("/chat")}
            className="text-white font-semibold py-4 px-9 rounded-2xl text-base transition-all"
            style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)", boxShadow: "0 0 32px rgba(99,102,241,0.35)" }}
          >
            Start saving now
          </button>
          <a href="#how" className="text-gray-400 hover:text-white text-sm font-medium py-4 px-7 rounded-2xl transition-all border border-white/[0.08] hover:border-white/20">
            See how it works ↓
          </a>
        </div>
        <p className="text-gray-600 text-xs">No wallet setup needed · Works on any device · Free forever</p>

        {/* ── CHAT MOCKUP ── */}
        <div className="relative mt-20 w-full max-w-sm mx-auto">
          <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }} />
          <div className="relative rounded-3xl border border-white/[0.08] overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}>
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
              <StashifyLogo size={28} />
              <div>
                <div className="text-sm font-semibold leading-none mb-1">Stashify</div>
                <div className="text-xs text-green-400">● Online</div>
              </div>
            </div>
            <div className="px-5 py-5 space-y-3">
              <div className="flex justify-end">
                <div className="text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] leading-relaxed" style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)" }}>
                  I want to save $50 for new Jordans 👟
                </div>
              </div>
              <div className="flex justify-start">
                <div className="text-sm px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] leading-relaxed border border-white/[0.08]" style={{ background: "rgba(255,255,255,0.05)" }}>
                  Love that goal! Saving $50 for your Jordans now... 🎉
                </div>
              </div>
              <div className="flex justify-start">
                <div className="text-sm px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed border border-green-500/20" style={{ background: "rgba(34,197,94,0.06)" }}>
                  <span className="text-green-400 font-medium">✓ Done!</span> $50 USDC locked in your Jordans vault.<br />
                  <span className="text-gray-500 text-xs">Tx: 0x89f4...3acd · Base Sepolia</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4 border-t border-white/[0.06]">
              <div className="flex-1 text-sm text-gray-600 px-4 py-2.5 rounded-xl border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.03)" }}>
                Type your savings goal...
              </div>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="relative z-10 border-y border-white/[0.06] py-5 px-8" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-gray-500 font-medium">
          {["🔵 Built on Base", "🔒 Smart contract secured", "⚡ Instant transactions", "💵 USDC powered", "🌏 Available worldwide"].map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <p className="text-blue-400 text-sm font-medium tracking-widest mb-4 uppercase">How it works</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">Saving money has never<br />been this effortless</h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">Three steps between you and your goal.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { number: "01", icon: "💬", title: "Just tell Stashify", desc: "Type your goal in plain English. No forms, no dropdowns, no confusing menus. Just talk.", highlight: "As easy as texting a friend" },
            { number: "02", icon: "⚡", title: "AI acts instantly", desc: "Stashify understands your intent and moves the exact amount of USDC into your goal vault onchain.", highlight: "Real money. Real blockchain." },
            { number: "03", icon: "🎯", title: "Watch it grow", desc: "Track every goal visually. Withdraw whenever you want. Your money never leaves your control.", highlight: "You always stay in charge" },
          ].map((step) => (
            <div key={step.number} className="group relative rounded-2xl p-7 border border-white/[0.07] hover:border-blue-500/30 transition-all duration-300" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-start justify-between mb-6">
                <span className="text-4xl">{step.icon}</span>
                <span className="text-5xl font-bold text-white/[0.04] group-hover:text-white/[0.07] transition-colors">{step.number}</span>
              </div>
              <h3 className="font-semibold text-lg mb-3 group-hover:text-blue-400 transition-colors">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.desc}</p>
              <p className="text-blue-400/70 text-xs font-medium">{step.highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY STASHIFY ── */}
      <section id="why" className="relative z-10 px-6 py-20" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 text-sm font-medium tracking-widest mb-4 uppercase">Why Stashify</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built for students.<br />By a student.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "No minimum deposit", desc: "Save $1 or $1,000. There is no barrier to entry. Every dollar counts.", icon: "💰" },
              { title: "No bank account needed", desc: "All you need is a phone. Stashify handles wallets, keys, and blockchain — invisibly.", icon: "📱" },
              { title: "Your money is always yours", desc: "Funds sit in a smart contract vault, not on our servers. Not our keys. Not our coins.", icon: "🔒" },
              { title: "Works anywhere in the world", desc: "Singapore, Nigeria, Brazil, India — Stashify works for any student, anywhere, instantly.", icon: "🌏" },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 p-6 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="text-3xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <p className="text-green-400 text-sm font-medium tracking-widest mb-4 uppercase">Early users</p>
          <h2 className="text-4xl font-bold tracking-tight">Students already saving smarter</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { quote: "I saved up for my new laptop in 6 weeks without even thinking about it. I just told Stashify my goal and it handled everything.", name: "Aisha M.", school: "NUS, Singapore", saved: "Saved $800" },
            { quote: "I have tried every savings app. None of them actually move money for me. Stashify is the first one that actually does what it says.", name: "James K.", school: "UCT, South Africa", saved: "Saved $240" },
            { quote: "The fact that it is on blockchain means I trust it more than my actual bank. My money is mine and I can see it on-chain anytime.", name: "Priya R.", school: "IIT Delhi, India", saved: "Saved $1,200" },
          ].map((t) => (
            <div key={t.name} className="flex flex-col justify-between p-6 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-600">{t.school}</p>
                </div>
                <span className="text-xs text-green-400 font-medium bg-green-400/10 px-3 py-1 rounded-full">{t.saved}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative z-10 max-w-2xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight">Questions? Answered.</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: "Do I need to know anything about crypto?", a: "Not at all. Stashify handles everything behind the scenes. You just type what you want to save for." },
            { q: "Is my money safe?", a: "Your funds are held in a smart contract on Base blockchain — not on our servers. You have full control and can withdraw at any time." },
            { q: "What currency does Stashify use?", a: "Stashify uses USDC — a dollar-pegged stablecoin. $1 USDC = $1 USD. No volatility, no surprises." },
            { q: "Are there any fees?", a: "Stashify charges zero fees. The only cost is a tiny blockchain gas fee — usually less than a cent." },
          ].map((item) => (
            <div key={item.q} className="p-6 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h3 className="font-semibold text-base mb-3">{item.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative z-10 text-center px-6 pb-32">
        <div className="max-w-2xl mx-auto rounded-3xl p-16 border border-blue-500/15 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08))" }}>
          <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.08), transparent 70%)" }} />
          <div className="relative flex flex-col items-center">
            <StashifyLogo size={56} />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-8 mb-4">
              Your first goal is<br />one message away.
            </h2>
            <p className="text-gray-500 mb-10 text-lg">Join students saving smarter with Stashify.</p>
            <button
              onClick={() => router.push("/chat")}
              className="text-white font-semibold py-4 px-12 rounded-2xl text-base transition-all"
              style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)", boxShadow: "0 0 40px rgba(99,102,241,0.3)" }}
            >
              Start saving now
            </button>
            <p className="text-gray-700 text-xs mt-5">Free forever · No credit card · No crypto knowledge needed</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-8 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2.5">
            <StashifyLogo size={22} />
            <span className="font-medium text-gray-500">Stashify</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Built on Base</span>
            <span>Secured by smart contracts</span>
            <span>Made in Singapore 🇸🇬</span>
          </div>
          <span>© 2026 Stashify</span>
        </div>
      </footer>

    </main>
  );
}