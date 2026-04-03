"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const StashifyLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="icongrad5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2563eb" }} />
        <stop offset="100%" style={{ stopColor: "#7c3aed" }} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#icongrad5)" />
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

const BADGES = [
  {
    id: "first-save",
    icon: "🌱",
    name: "First Stash",
    desc: "Made your very first save",
    earned: true,
    earnedDate: "Mar 19, 2026",
    rarity: "Common",
    rarityColor: "#6b7280",
    bg: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
    border: "rgba(16,185,129,0.3)",
    glow: "rgba(16,185,129,0.2)",
  },
  {
    id: "week-warrior",
    icon: "🔥",
    name: "Week Warrior",
    desc: "7-day saving streak",
    earned: true,
    earnedDate: "Mar 26, 2026",
    rarity: "Uncommon",
    rarityColor: "#60a5fa",
    bg: "linear-gradient(135deg, rgba(251,146,60,0.15), rgba(239,68,68,0.05))",
    border: "rgba(251,146,60,0.3)",
    glow: "rgba(251,146,60,0.2)",
  },
  {
    id: "pact-keeper",
    icon: "🤝",
    name: "Pact Keeper",
    desc: "Completed a Stash Pact",
    earned: true,
    earnedDate: "Mar 28, 2026",
    rarity: "Uncommon",
    rarityColor: "#60a5fa",
    bg: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.05))",
    border: "rgba(139,92,246,0.3)",
    glow: "rgba(139,92,246,0.2)",
  },
  {
    id: "goal-crusher",
    icon: "🎯",
    name: "Goal Crusher",
    desc: "Hit a savings goal milestone",
    earned: true,
    earnedDate: "Mar 30, 2026",
    rarity: "Rare",
    rarityColor: "#a78bfa",
    bg: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(124,58,237,0.05))",
    border: "rgba(167,139,250,0.3)",
    glow: "rgba(167,139,250,0.2)",
  },
  {
    id: "monthly-master",
    icon: "📅",
    name: "Monthly Master",
    desc: "30-day saving streak",
    earned: false,
    earnedDate: null,
    rarity: "Rare",
    rarityColor: "#a78bfa",
    bg: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
    border: "rgba(255,255,255,0.08)",
    glow: "transparent",
  },
  {
    id: "diamond-hands",
    icon: "💎",
    name: "Diamond Hands",
    desc: "100-day saving streak",
    earned: false,
    earnedDate: null,
    rarity: "Epic",
    rarityColor: "#22d3ee",
    bg: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
    border: "rgba(255,255,255,0.08)",
    glow: "transparent",
  },
  {
    id: "yield-master",
    icon: "📈",
    name: "Yield Master",
    desc: "Deposited into a yield vault",
    earned: false,
    earnedDate: null,
    rarity: "Rare",
    rarityColor: "#a78bfa",
    bg: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
    border: "rgba(255,255,255,0.08)",
    glow: "transparent",
  },
  {
    id: "legend",
    icon: "👑",
    name: "Stashify Legend",
    desc: "365-day saving streak",
    earned: false,
    earnedDate: null,
    rarity: "Legendary",
    rarityColor: "#fbbf24",
    bg: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
    border: "rgba(255,255,255,0.08)",
    glow: "transparent",
  },
];

const STREAK_TYPES = [
  {
    type: "Daily",
    icon: "🔥",
    current: 12,
    best: 12,
    unit: "days",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.1)",
    border: "rgba(251,146,60,0.2)",
    next: "Keep saving daily to grow this streak",
    nextMilestone: 30,
  },
  {
    type: "Weekly",
    icon: "📆",
    current: 3,
    best: 3,
    unit: "weeks",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.1)",
    border: "rgba(96,165,250,0.2)",
    next: "Save once more this week to keep it alive",
    nextMilestone: 8,
  },
  {
    type: "Goal",
    icon: "🎯",
    current: 2,
    best: 2,
    unit: "milestones",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.2)",
    next: "Hit another savings milestone",
    nextMilestone: 5,
  },
  {
    type: "Pact",
    icon: "🤝",
    current: 1,
    best: 1,
    unit: "weeks",
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
    next: "Both save this week to keep the pact streak",
    nextMilestone: 4,
  },
];

const LEADERBOARD = [
  { rank: 1, name: "alex.base.eth", streak: 89, badge: "💎", country: "🇸🇬" },
  { rank: 2, name: "sarah.base.eth", streak: 67, badge: "🔥", country: "🇳🇬" },
  { rank: 3, name: "0xRohan", streak: 12, badge: "🎯", country: "🇸🇬", isYou: true },
  { rank: 4, name: "priya.base.eth", streak: 10, badge: "🌱", country: "🇮🇳" },
  { rank: 5, name: "james.base.eth", streak: 8, badge: "🌱", country: "🇿🇦" },
];

const HISTORY = [
  { date: "Today", action: "Saved $2 USDC", streak: "🔥 12 days", type: "daily" },
  { date: "Yesterday", action: "Saved $1 USDC", streak: "🔥 11 days", type: "daily" },
  { date: "Mar 29", action: "Hit Jordans goal milestone 50%", streak: "🎯 Goal streak x2", type: "goal" },
  { date: "Mar 28", action: "Pact partner saved this week", streak: "🤝 Pact streak x1", type: "pact" },
  { date: "Mar 26", action: "7-day streak reached", streak: "🏅 Badge earned: Week Warrior", type: "milestone" },
  { date: "Mar 19", action: "First ever save on Stashify", streak: "🌱 Badge earned: First Stash", type: "milestone" },
];

const MILESTONES = [7, 14, 30, 60, 100, 200, 365];

export default function StreaksPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"streaks" | "badges" | "leaderboard" | "history">("streaks");
  const currentStreak = 12;

  const progressToNext = (current: number, milestones: number[]) => {
    const next = milestones.find(m => m > current) || milestones[milestones.length - 1];
    const prev = milestones.filter(m => m <= current).slice(-1)[0] || 0;
    return { next, prev, pct: ((current - prev) / (next - prev)) * 100 };
  };

  const { next, prev, pct } = progressToNext(currentStreak, MILESTONES);

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "#080d1a", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Ambient glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[30%] w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(251,146,60,0.08), transparent 65%)" }} />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.08), transparent 65%)" }} />
      </div>

      {/* ── NAV ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.06]" style={{ backdropFilter: "blur(12px)", background: "rgba(8,13,26,0.92)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/chat")} className="text-gray-600 hover:text-gray-400 transition-colors text-xl mr-1">←</button>
          <StashifyLogo size={30} />
          <div>
            <p className="text-sm font-semibold leading-none">Streaks & Badges</p>
            <p className="text-xs text-orange-400 mt-0.5">🔥 {currentStreak} day streak</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-orange-500/20 text-xs font-medium text-orange-400" style={{ background: "rgba(251,146,60,0.08)" }}>
          🔥 {currentStreak} days and counting
        </div>
      </nav>

      {/* ── HERO STREAK DISPLAY ── */}
      <section className="relative z-10 text-center px-6 pt-16 pb-12">
        {/* Giant flame */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 blur-3xl opacity-40 scale-150" style={{ background: "radial-gradient(circle, rgba(251,146,60,0.6), transparent 70%)" }} />
          <div className="relative text-9xl select-none" style={{ filter: "drop-shadow(0 0 30px rgba(251,146,60,0.5))" }}>
            🔥
          </div>
        </div>

        <div className="mb-2">
          <span className="text-8xl md:text-9xl font-bold tracking-tight" style={{ background: "linear-gradient(135deg, #fb923c, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {currentStreak}
          </span>
        </div>
        <p className="text-gray-400 text-xl mb-2">day saving streak</p>
        <p className="text-gray-600 text-sm mb-8">Your longest streak ever · Keep going 💪</p>

        {/* Progress to next milestone */}
        <div className="max-w-sm mx-auto mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{prev} days</span>
            <span className="text-orange-400 font-medium">{next - currentStreak} days to {next}-day milestone</span>
            <span>{next} days</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full relative overflow-hidden"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg, #fb923c, #fbbf24)" }}
            >
              <div className="absolute inset-0 animate-pulse opacity-50" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
            </div>
          </div>
        </div>

        {/* Milestone dots */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {MILESTONES.map(m => (
            <div key={m} className="flex flex-col items-center gap-1">
              <div
                className="w-3 h-3 rounded-full border-2 transition-all"
                style={{
                  background: m <= currentStreak ? "#fb923c" : "transparent",
                  borderColor: m <= currentStreak ? "#fb923c" : "rgba(255,255,255,0.15)",
                  boxShadow: m <= currentStreak ? "0 0 8px rgba(251,146,60,0.5)" : "none",
                }}
              />
              <span className="text-xs" style={{ color: m <= currentStreak ? "#fb923c" : "#374151" }}>{m}d</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TAB NAVIGATION ── */}
      <div className="relative z-10 px-6 mb-8">
        <div className="max-w-2xl mx-auto flex gap-1 p-1 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
          {(["streaks", "badges", "leaderboard", "history"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all capitalize"
              style={{
                background: activeTab === tab ? "linear-gradient(135deg, #fb923c, #f59e0b)" : "transparent",
                color: activeTab === tab ? "white" : "#6b7280",
              }}
            >
              {tab === "streaks" && "🔥 "}{tab === "badges" && "🏅 "}{tab === "leaderboard" && "🏆 "}{tab === "history" && "📋 "}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-24">

        {/* ── STREAKS TAB ── */}
        {activeTab === "streaks" && (
          <div className="space-y-5">
            <p className="text-gray-500 text-sm mb-6">You&apos;re tracking 4 types of streaks. Each one keeps you accountable in a different way.</p>
            {STREAK_TYPES.map((s) => {
              const pctToNext = Math.min((s.current / s.nextMilestone) * 100, 100);
              return (
                <div key={s.type} className="p-6 rounded-2xl border transition-all" style={{ background: s.bg, borderColor: s.border }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border" style={{ background: "rgba(0,0,0,0.2)", borderColor: s.border }}>
                        {s.icon}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{s.type} Streak</p>
                        <p className="text-gray-500 text-xs">{s.next}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold" style={{ color: s.color }}>{s.current}</p>
                      <p className="text-gray-600 text-xs">{s.unit}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>Best: {s.best} {s.unit}</span>
                    <span style={{ color: s.color }}>{s.nextMilestone - s.current} more to next milestone</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pctToNext}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}99)` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── BADGES TAB ── */}
        {activeTab === "badges" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500 text-sm">{BADGES.filter(b => b.earned).length} of {BADGES.length} badges earned</p>
              <div className="flex gap-2">
                {["Common", "Uncommon", "Rare", "Epic", "Legendary"].map(r => (
                  <span key={r} className="text-xs px-2 py-0.5 rounded-full border border-white/[0.07] text-gray-600" style={{ background: "rgba(255,255,255,0.02)" }}>{r}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className="relative group rounded-2xl p-5 border text-center transition-all duration-300"
                  style={{
                    background: badge.earned ? badge.bg : "rgba(255,255,255,0.02)",
                    borderColor: badge.earned ? badge.border : "rgba(255,255,255,0.07)",
                    boxShadow: badge.earned ? `0 0 30px ${badge.glow}` : "none",
                    opacity: badge.earned ? 1 : 0.5,
                  }}
                >
                  {/* Rarity indicator */}
                  <div className="absolute top-3 right-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: badge.rarityColor, boxShadow: `0 0 6px ${badge.rarityColor}` }} />
                  </div>

                  {/* Badge icon */}
                  <div className="relative mb-3">
                    <div className="text-5xl mb-1 transition-transform duration-300 group-hover:scale-110" style={{ filter: badge.earned ? `drop-shadow(0 0 12px ${badge.glow})` : "grayscale(1)" }}>
                      {badge.icon}
                    </div>
                    {!badge.earned && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}
                  </div>

                  <p className="font-bold text-sm mb-1">{badge.name}</p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-2">{badge.desc}</p>

                  {badge.earned ? (
                    <p className="text-xs font-medium" style={{ color: badge.rarityColor }}>Earned {badge.earnedDate}</p>
                  ) : (
                    <p className="text-xs text-gray-700">Locked</p>
                  )}

                  <p className="text-xs mt-1" style={{ color: badge.rarityColor }}>{badge.rarity}</p>
                </div>
              ))}
            </div>

            {/* Badge progress */}
            <div className="mt-8 p-6 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">Badge collection progress</p>
                <p className="text-orange-400 text-sm font-bold">{BADGES.filter(b => b.earned).length}/{BADGES.length}</p>
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-white/[0.06]">
                <div className="h-full rounded-full" style={{ width: `${(BADGES.filter(b => b.earned).length / BADGES.length) * 100}%`, background: "linear-gradient(90deg, #fb923c, #fbbf24)" }} />
              </div>
              <p className="text-gray-600 text-xs mt-2">Earn all 8 badges to unlock the Stashify Legend title</p>
            </div>
          </div>
        )}

        {/* ── LEADERBOARD TAB ── */}
        {activeTab === "leaderboard" && (
          <div>
            <p className="text-gray-500 text-sm mb-6">Top savers by daily streak. Updated every 24 hours.</p>

            {/* Top 3 podium */}
            <div className="flex items-end justify-center gap-4 mb-8">
              {/* 2nd */}
              <div className="text-center">
                <div className="text-3xl mb-2">{LEADERBOARD[1].badge}</div>
                <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center border border-gray-600/30 mb-2" style={{ background: "rgba(156,163,175,0.1)" }}>
                  <p className="text-xs text-gray-500 font-medium">{LEADERBOARD[1].country}</p>
                  <p className="font-bold text-orange-400">{LEADERBOARD[1].streak}d</p>
                </div>
                <p className="text-xs text-gray-400 font-medium">{LEADERBOARD[1].name}</p>
                <p className="text-xs text-gray-600">#2</p>
              </div>
              {/* 1st */}
              <div className="text-center -mt-4">
                <div className="text-4xl mb-2">👑</div>
                <div className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center border border-yellow-500/30 mb-2" style={{ background: "rgba(251,191,36,0.1)", boxShadow: "0 0 30px rgba(251,191,36,0.15)" }}>
                  <p className="text-xs text-gray-400 font-medium">{LEADERBOARD[0].country}</p>
                  <p className="font-bold text-yellow-400 text-xl">{LEADERBOARD[0].streak}d</p>
                </div>
                <p className="text-xs text-yellow-400 font-bold">{LEADERBOARD[0].name}</p>
                <p className="text-xs text-yellow-600">#1</p>
              </div>
              {/* 3rd — You */}
              <div className="text-center">
                <div className="text-3xl mb-2">{LEADERBOARD[2].badge}</div>
                <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center border border-orange-500/30 mb-2" style={{ background: "rgba(251,146,60,0.1)", boxShadow: "0 0 20px rgba(251,146,60,0.1)" }}>
                  <p className="text-xs text-gray-400 font-medium">{LEADERBOARD[2].country}</p>
                  <p className="font-bold text-orange-400">{LEADERBOARD[2].streak}d</p>
                </div>
                <p className="text-xs text-orange-400 font-bold">{LEADERBOARD[2].name} 👈 You</p>
                <p className="text-xs text-orange-600">#3</p>
              </div>
            </div>

            {/* Full table */}
            <div className="space-y-3">
              {LEADERBOARD.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-4 rounded-2xl border transition-all"
                  style={{
                    background: user.isYou ? "rgba(251,146,60,0.08)" : "rgba(255,255,255,0.02)",
                    borderColor: user.isYou ? "rgba(251,146,60,0.25)" : "rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold w-6 text-center" style={{ color: user.rank === 1 ? "#fbbf24" : user.rank === 2 ? "#9ca3af" : user.rank === 3 ? "#fb923c" : "#4b5563" }}>
                      {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                    </span>
                    <span className="text-xl">{user.badge}</span>
                    <div>
                      <p className="font-semibold text-sm flex items-center gap-2">
                        {user.name}
                        {user.isYou && <span className="text-xs text-orange-400 font-medium bg-orange-400/10 px-2 py-0.5 rounded-full">You</span>}
                      </p>
                      <p className="text-gray-600 text-xs">{user.country} Saver</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ color: user.isYou ? "#fb923c" : "white" }}>{user.streak} days</p>
                    <p className="text-gray-600 text-xs">streak</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-700 text-xs mt-6">Save daily to climb the leaderboard 🔥</p>
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {activeTab === "history" && (
          <div>
            <p className="text-gray-500 text-sm mb-6">Your complete saving activity and streak milestones.</p>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.06]" />

              <div className="space-y-4">
                {HISTORY.map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-base z-10" style={{
                      background: item.type === "milestone" ? "rgba(251,146,60,0.2)" : item.type === "pact" ? "rgba(139,92,246,0.2)" : item.type === "goal" ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${item.type === "milestone" ? "rgba(251,146,60,0.3)" : item.type === "pact" ? "rgba(139,92,246,0.3)" : item.type === "goal" ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.08)"}`,
                    }}>
                      {item.type === "daily" ? "💰" : item.type === "milestone" ? "🏅" : item.type === "pact" ? "🤝" : "🎯"}
                    </div>

                    <div className="flex-1 p-4 rounded-2xl border border-white/[0.07] mb-1" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm">{item.action}</p>
                          <p className="text-orange-400/80 text-xs mt-1 font-medium">{item.streak}</p>
                        </div>
                        <span className="text-gray-600 text-xs flex-shrink-0">{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 text-center px-6 pb-20">
        <div className="max-w-lg mx-auto rounded-3xl p-10 border border-orange-500/15 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(251,146,60,0.08), rgba(251,191,36,0.05))" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(251,146,60,0.08), transparent 70%)" }} />
          <div className="relative">
            <div className="text-4xl mb-4">🔥</div>
            <h2 className="text-2xl font-bold mb-3">Don&apos;t break your streak.</h2>
            <p className="text-gray-500 text-sm mb-6">Save something today — even $0.10 counts toward your streak.</p>
            <button
              onClick={() => router.push("/chat")}
              className="text-white font-semibold py-3.5 px-8 rounded-2xl text-sm transition-all"
              style={{ background: "linear-gradient(135deg, #fb923c, #f59e0b)", boxShadow: "0 0 24px rgba(251,146,60,0.3)" }}
            >
              Save now to keep the streak →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}