"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const StashifyLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="icongrad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2563eb" }} />
        <stop offset="100%" style={{ stopColor: "#7c3aed" }} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#icongrad4)" />
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

const VAULTS = [
  {
    id: "coinbase-usdc",
    name: "Coinbase USDC Rewards",
    protocol: "Coinbase",
    protocolLogo: "🔵",
    apy: "4.70",
    apyLabel: "APY",
    risk: "Lowest",
    riskLevel: 1,
    riskColor: "#10b981",
    riskBg: "rgba(16,185,129,0.1)",
    tvl: "$80B+",
    asset: "USDC",
    chain: "Base",
    type: "Rewards Program",
    typeBg: "rgba(59,130,246,0.1)",
    typeColor: "#60a5fa",
    description: "Earn passive rewards simply by holding USDC in Coinbase Wallet. Rewards are paid monthly directly to your wallet on Base.",
    highlights: ["Backed by Coinbase directly", "Paid monthly on Base", "No lockup period", "Available globally", "Instant access anytime"],
    howItWorks: "Coinbase funds these rewards from their own balance sheet as a loyalty program. Your USDC is not lent out — it simply sits in your wallet and earns.",
    link: "https://www.coinbase.com/usdc",
    badge: "Most trusted",
    badgeBg: "rgba(16,185,129,0.15)",
    badgeColor: "#34d399",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(16,185,129,0.08))",
    border: "rgba(59,130,246,0.2)",
  },
  {
    id: "moonwell-usdc",
    name: "Moonwell USDC Lending",
    protocol: "Moonwell",
    protocolLogo: "🌕",
    apy: "8.62",
    apyLabel: "APY",
    risk: "Low",
    riskLevel: 2,
    riskColor: "#60a5fa",
    riskBg: "rgba(96,165,250,0.1)",
    tvl: "$83M+",
    asset: "USDC",
    chain: "Base",
    type: "Lending Protocol",
    typeBg: "rgba(96,165,250,0.1)",
    typeColor: "#60a5fa",
    description: "Lend your USDC to borrowers via overcollateralized loans on Moonwell — the leading lending protocol on Base with an independent risk rating of B.",
    highlights: ["Built on Base natively", "Overcollateralized loans only", "Risk rating: B (Good)", "Withdraw anytime", "Battle-tested smart contracts"],
    howItWorks: "Your USDC is lent to borrowers who must post more collateral than they borrow. Interest paid by borrowers flows to you as yield. Rate adjusts with market demand.",
    link: "https://moonwell.fi",
    badge: "Highest yield",
    badgeBg: "rgba(96,165,250,0.15)",
    badgeColor: "#60a5fa",
    gradient: "linear-gradient(135deg, rgba(96,165,250,0.08), rgba(139,92,246,0.08))",
    border: "rgba(96,165,250,0.2)",
  },
  {
    id: "morpho-usdc",
    name: "Morpho Flagship USDC",
    protocol: "Morpho",
    protocolLogo: "🟣",
    apy: "10.80",
    apyLabel: "APY",
    risk: "Low-Medium",
    riskLevel: 2,
    riskColor: "#a78bfa",
    riskBg: "rgba(167,139,250,0.1)",
    tvl: "$500M+",
    asset: "USDC",
    chain: "Base",
    type: "Optimized Vault",
    typeBg: "rgba(167,139,250,0.1)",
    typeColor: "#a78bfa",
    description: "The same protocol Coinbase uses for their onchain USDC lending. Morpho optimizes yield across multiple lending markets automatically via curated vaults.",
    highlights: ["Used by Coinbase directly", "Coinbase Ventures portfolio", "Auto-optimized yield", "Curated by Steakhouse Financial", "Instant deposit & withdraw"],
    howItWorks: "Morpho allocates your USDC across multiple lending markets to maximize returns. A smart contract wallet routes funds automatically. Rates vary with market conditions.",
    link: "https://app.morpho.org",
    badge: "Coinbase-backed",
    badgeBg: "rgba(167,139,250,0.15)",
    badgeColor: "#a78bfa",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.08))",
    border: "rgba(167,139,250,0.2)",
  },
];

const RISK_EXPLAINERS = [
  { level: "Lowest", icon: "🟢", desc: "Funds stay in your wallet. No smart contract risk. Backed by Coinbase directly." },
  { level: "Low", icon: "🔵", desc: "Audited smart contracts. Overcollateralized loans. Established protocol with years of track record." },
  { level: "Low-Medium", icon: "🟣", desc: "Optimized DeFi vaults. Variable rates. Slightly more complex but used by Coinbase for their own product." },
];

export default function VaultsPage() {
  const router = useRouter();
  const [selectedVault, setSelectedVault] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const selected = VAULTS.find(v => v.id === selectedVault);

  const yearlyEarnings = (vault: typeof VAULTS[0]) => {
    if (!amount || isNaN(parseFloat(amount))) return null;
    return (parseFloat(amount) * parseFloat(vault.apy) / 100).toFixed(2);
  };

  const monthlyEarnings = (vault: typeof VAULTS[0]) => {
    if (!amount || isNaN(parseFloat(amount))) return null;
    return (parseFloat(amount) * parseFloat(vault.apy) / 100 / 12).toFixed(2);
  };

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "#080d1a", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Ambient glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[20%] w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08), transparent 65%)" }} />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 65%)" }} />
      </div>

      {/* ── NAV ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.06]" style={{ backdropFilter: "blur(12px)", background: "rgba(8,13,26,0.92)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/chat")} className="text-gray-600 hover:text-gray-400 transition-colors text-xl mr-1">←</button>
          <StashifyLogo size={30} />
          <div>
            <p className="text-sm font-semibold leading-none">Yield Vaults</p>
            <p className="text-xs text-green-400 mt-0.5">● Live rates · Base ecosystem</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.07] text-xs text-gray-500" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Rates updated live
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 text-green-400 text-xs font-medium px-4 py-2 rounded-full mb-8 border border-green-500/20" style={{ background: "rgba(16,185,129,0.08)" }}>
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          USDC on Base · Zero volatility · Earn while you save
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl mx-auto mb-6">
          Put your savings
          <br />
          <span style={{ background: "linear-gradient(90deg, #34d399 0%, #60a5fa 50%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            to work.
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-6 leading-relaxed">
          Your saved USDC doesn&apos;t have to sit idle. Move it into a yield vault and earn up to <span className="text-white font-semibold">10.8% APY</span> — all onchain, all on Base, all risk-free relative to market alternatives.
        </p>

        <p className="text-gray-600 text-sm mb-10">No minimums · Withdraw anytime · Powered by Base ecosystem protocols</p>

        {/* Quick calculator */}
        <div className="max-w-sm mx-auto">
          <div className="p-5 rounded-2xl border border-white/[0.08]" style={{ background: "rgba(255,255,255,0.03)" }}>
            <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wide">Quick earnings calculator</p>
            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input
                type="number"
                placeholder="Enter your savings amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-600 outline-none pl-8 pr-4 py-3 rounded-xl border border-white/[0.08] text-sm focus:border-green-500/40 transition-colors"
                style={{ background: "rgba(255,255,255,0.03)" }}
              />
            </div>
            {amount && !isNaN(parseFloat(amount)) && (
              <div className="grid grid-cols-3 gap-3">
                {VAULTS.map(v => (
                  <div key={v.id} className="text-center p-3 rounded-xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <p className="text-xs text-gray-600 mb-1">{v.protocol}</p>
                    <p className="font-bold text-sm" style={{ color: v.riskColor }}>${monthlyEarnings(v)}</p>
                    <p className="text-gray-600 text-xs">per month</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="relative z-10 border-y border-white/[0.05] py-4" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-gray-600 font-medium px-8">
          {["🔵 All protocols on Base", "💵 USDC only — no volatility", "🔒 Smart contract secured", "⚡ Instant withdrawals", "🏦 Used by Coinbase itself"].map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── VAULT CARDS ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">Available vaults</h2>
            <p className="text-gray-500 text-sm">All vaults accept USDC on Base. Rates update with market conditions.</p>
          </div>
          <div className="flex gap-2">
            {["all", "lowest risk", "highest yield"].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all capitalize"
                style={{
                  background: activeFilter === f ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                  color: activeFilter === f ? "white" : "#6b7280",
                  border: `1px solid ${activeFilter === f ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {VAULTS.map((vault, i) => (
            <div
              key={vault.id}
              className="group relative rounded-3xl border cursor-pointer transition-all duration-300 hover:scale-[1.005]"
              style={{
                background: vault.gradient,
                borderColor: selectedVault === vault.id ? vault.riskColor : vault.border,
                boxShadow: selectedVault === vault.id ? `0 0 40px ${vault.riskColor}20` : "none",
              }}
              onClick={() => setSelectedVault(selectedVault === vault.id ? null : vault.id)}
            >
              <div className="p-6 md:p-8">
                {/* Top row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-white/[0.08]" style={{ background: "rgba(255,255,255,0.05)" }}>
                      {vault.protocolLogo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-lg">{vault.name}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: vault.badgeBg, color: vault.badgeColor }}>
                          {vault.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: vault.typeBg, color: vault.typeColor }}>{vault.type}</span>
                        <span className="text-gray-600 text-xs">·</span>
                        <span className="text-gray-500 text-xs">{vault.chain}</span>
                        <span className="text-gray-600 text-xs">·</span>
                        <span className="text-gray-500 text-xs">TVL {vault.tvl}</span>
                      </div>
                    </div>
                  </div>

                  {/* APY + Risk */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold" style={{ color: vault.riskColor }}>{vault.apy}%</p>
                      <p className="text-gray-500 text-xs mt-0.5">{vault.apyLabel}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center mb-0.5">
                        {[1,2,3,4,5].map(n => (
                          <div key={n} className="w-2 h-5 rounded-sm" style={{ background: n <= vault.riskLevel ? vault.riskColor : "rgba(255,255,255,0.08)" }} />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: vault.riskColor }}>{vault.risk} risk</p>
                    </div>
                    <div className="text-gray-400 transition-transform" style={{ transform: selectedVault === vault.id ? "rotate(180deg)" : "rotate(0deg)" }}>
                      ↓
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{vault.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {vault.highlights.map(h => (
                    <span key={h} className="text-xs px-3 py-1 rounded-full border border-white/[0.07] text-gray-400" style={{ background: "rgba(255,255,255,0.03)" }}>
                      ✓ {h}
                    </span>
                  ))}
                </div>

                {/* Earnings preview if amount entered */}
                {amount && !isNaN(parseFloat(amount)) && (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] mb-4" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">With ${parseFloat(amount).toLocaleString()} in this vault</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="font-bold text-lg" style={{ color: vault.riskColor }}>${monthlyEarnings(vault)}</span>
                          <span className="text-gray-600 text-xs ml-1">/ month</span>
                        </div>
                        <div>
                          <span className="font-bold text-lg" style={{ color: vault.riskColor }}>${yearlyEarnings(vault)}</span>
                          <span className="text-gray-600 text-xs ml-1">/ year</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Expanded details */}
                {selectedVault === vault.id && (
                  <div className="border-t border-white/[0.06] pt-6 mt-2">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">How it works</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{vault.howItWorks}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">Risk breakdown</p>
                        <div className="space-y-2">
                          {[
                            { label: "Smart contract risk", value: vault.riskLevel <= 1 ? "None" : vault.riskLevel <= 2 ? "Low" : "Medium" },
                            { label: "Liquidity risk", value: "Low" },
                            { label: "Protocol risk", value: vault.riskLevel <= 1 ? "None" : "Low" },
                            { label: "Rate volatility", value: vault.riskLevel <= 1 ? "Fixed-ish" : "Variable" },
                          ].map(r => (
                            <div key={r.label} className="flex justify-between text-xs">
                              <span className="text-gray-500">{r.label}</span>
                              <span style={{ color: vault.riskColor }}>{r.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <a
                      href={vault.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                      style={{ background: `linear-gradient(135deg, ${vault.riskColor}33, ${vault.riskColor}22)`, border: `1px solid ${vault.riskColor}40`, color: vault.riskColor }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Open {vault.protocol} →
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RISK EXPLAINER ── */}
      <section className="relative z-10 px-6 py-16" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-400 text-sm font-medium tracking-widest mb-4 uppercase">Understanding risk</p>
            <h2 className="text-3xl font-bold tracking-tight mb-3">All vaults are low risk.<br />Here&apos;s what that means.</h2>
            <p className="text-gray-500 text-base max-w-md mx-auto">We only show vaults that meet our safety criteria — USDC only, Base ecosystem, established protocols.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {RISK_EXPLAINERS.map(r => (
              <div key={r.level} className="p-6 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className="font-semibold text-base mb-2">{r.level} risk</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-2xl border border-yellow-500/20 flex gap-4" style={{ background: "rgba(234,179,8,0.05)" }}>
            <span className="text-xl flex-shrink-0">⚠️</span>
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-yellow-400 font-medium">Important disclaimer:</span> APY rates shown are approximate and change with market conditions. DeFi protocols carry smart contract risk. Only deposit what you can afford to lock for a period. Always do your own research before depositing. This is not financial advice.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">Quick answers</h2>
        <div className="space-y-4">
          {[
            { q: "Is my USDC safe in these vaults?", a: "All vaults listed are audited protocols on Base with significant TVL. Coinbase Rewards carries the lowest risk as funds stay in your wallet. Lending protocols carry low but non-zero smart contract risk." },
            { q: "Can I withdraw my money at any time?", a: "Yes for all three vaults. Coinbase Rewards — instantly. Moonwell and Morpho — withdraw when liquidity is available, which is almost always." },
            { q: "Why are the rates so much higher than a bank?", a: "DeFi lending rates reflect actual market demand for borrowing. When many people want to borrow USDC, lenders earn more. Traditional banks capture this spread for themselves." },
            { q: "How is this different from my Stashify savings vault?", a: "Your Stashify vault holds your savings securely onchain. These yield vaults are optional next steps — once you've saved up, you can move your USDC here to put it to work." },
          ].map(item => (
            <div key={item.q} className="p-6 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h3 className="font-semibold text-sm mb-2">{item.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative z-10 text-center px-6 pb-28">
        <div className="max-w-2xl mx-auto rounded-3xl p-14 border border-green-500/15 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(37,99,235,0.06))" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(16,185,129,0.06), transparent 70%)" }} />
          <div className="relative">
            <div className="text-5xl mb-6">📈</div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to grow<br />your savings?</h2>
            <p className="text-gray-500 mb-10 text-base max-w-sm mx-auto">Start saving first. Then when you&apos;re ready, move your USDC into a vault and watch it compound.</p>
            <button
              onClick={() => router.push("/chat")}
              className="text-white font-semibold py-4 px-12 rounded-2xl text-base transition-all"
              style={{ background: "linear-gradient(135deg, #10b981, #2563eb)", boxShadow: "0 0 32px rgba(16,185,129,0.2)" }}
            >
              Start saving with Stashify →
            </button>
            <p className="text-gray-700 text-xs mt-5">Save first · Grow later · Always your money</p>
          </div>
        </div>
      </section>
    </main>
  );
}