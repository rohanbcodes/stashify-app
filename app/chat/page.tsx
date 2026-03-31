"use client";
import { createPublicClient, http, parseAbi } from "viem";
import { baseSepolia } from "viem/chains";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const StashifyLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="icongrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2563eb" }} />
        <stop offset="100%" style={{ stopColor: "#7c3aed" }} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#icongrad2)" />
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

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Goal = {
  name: string;
  saved: number;
  target: number;
  emoji: string;
};

const DEMO_GOALS: Goal[] = [];

const VAULT_ADDRESS = "0xf475cEB6460dD0F004b27095aFB4C8CFc9B0260C" as const;
const WALLET_ADDRESS = "0xb1525777685076921fA1E1f8741d3Bee438594bD" as const;

const vaultAbi = parseAbi([
  "function getGoals() view returns (string[])",
  "function getBalance(string goalName) view returns (uint256)",
]);

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

const SUGGESTED_PROMPTS = [
  "Save $20 for my Jordans 👟",
  "I want to save $100 for a new laptop",
  "Check my savings balance",
  "What are my current goals?",
];

export default function ChatPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"chat" | "dashboard">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm Stashify — your personal savings companion. Tell me what you want to save for and I'll make it happen onchain. What's your goal? 🎯",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(DEMO_GOALS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
  const fetchGoals = async () => {
    try {
      const goalNames = await client.readContract({
        address: VAULT_ADDRESS,
        abi: vaultAbi,
        functionName: "getGoals",
        account: WALLET_ADDRESS,
      }) as string[];

      if (goalNames.length === 0) return;

      const goalData = await Promise.all(
        goalNames.map(async (name) => {
          const balance = await client.readContract({
            address: VAULT_ADDRESS,
            abi: vaultAbi,
            functionName: "getBalance",
            args: [name],
            account: WALLET_ADDRESS,
          }) as bigint;
          return {
            name,
            saved: Number(balance) / 1_000_000,
            target: Number(balance) / 1_000_000 * 5,
            emoji: "🎯",
          };
        })
      );

      setGoals(goalData);
    } catch (e) {
      console.error("Failed to fetch goals:", e);
    }
  };

  fetchGoals();
}, []);

  const sendMessage = async (text?: string) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);

      // If a save action happened, update goals
      if (data.goalUpdate) {
        setGoals((prev) => {
          const existing = prev.find((g) => g.name.toLowerCase() === data.goalUpdate.name.toLowerCase());
          if (existing) {
            return prev.map((g) =>
              g.name.toLowerCase() === data.goalUpdate.name.toLowerCase()
                ? { ...g, saved: g.saved + data.goalUpdate.amount }
                : g
            );
          } else {
            return [...prev, { name: data.goalUpdate.name, saved: data.goalUpdate.amount, target: data.goalUpdate.target || data.goalUpdate.amount * 5, emoji: "🎯" }];
          }
        });
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);

  return (
    <main className="h-screen flex flex-col text-white overflow-hidden" style={{ background: "#080d1a", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Ambient glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10), transparent 65%)" }} />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08), transparent 65%)" }} />
      </div>

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06]" style={{ backdropFilter: "blur(12px)", background: "rgba(8,13,26,0.9)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/")} className="text-gray-600 hover:text-gray-400 transition-colors mr-1">
            ←
          </button>
          <StashifyLogo size={30} />
          <div>
            <p className="text-sm font-semibold leading-none">Stashify</p>
            <p className="text-xs text-green-400 mt-0.5">● Online · Base Sepolia</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.03)" }}>
          <button
            onClick={() => setActiveTab("chat")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === "chat" ? "linear-gradient(135deg, #2563eb, #6366f1)" : "transparent",
              color: activeTab === "chat" ? "white" : "#6b7280",
            }}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === "dashboard" ? "linear-gradient(135deg, #2563eb, #6366f1)" : "transparent",
              color: activeTab === "dashboard" ? "white" : "#6b7280",
            }}
          >
            📊 Dashboard
          </button>
        </div>

        <button
          onClick={() => router.push("/pact")}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{
            background: "transparent",
            color: "#9ca3af",
          }}
        >
          🤝 Pacts
        </button>

        {/* Wallet info */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.07] text-xs text-gray-500" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          0xb152...594bD
        </div>
      </div>

      {/* ── CHAT TAB ── */}
      {activeTab === "chat" && (
        <div className="relative z-10 flex flex-col flex-1 overflow-hidden">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="mr-2 mt-1 flex-shrink-0">
                    <StashifyLogo size={24} />
                  </div>
                )}
                <div
                  className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #2563eb, #6366f1)"
                      : "rgba(255,255,255,0.05)",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="mr-2 mt-1 flex-shrink-0">
                  <StashifyLogo size={24} />
                </div>
                <div className="px-4 py-3 rounded-2xl text-sm border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.05)", borderRadius: "18px 18px 18px 4px" }}>
                  <div className="flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-xs px-3 py-2 rounded-xl border border-white/[0.08] text-gray-400 hover:text-white hover:border-blue-500/30 transition-all"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div className="px-4 pb-6 pt-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/[0.08]" style={{ background: "rgba(255,255,255,0.04)" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Tell me your savings goal..."
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
                style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DASHBOARD TAB ── */}
      {activeTab === "dashboard" && (
        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8">

          {/* Total savings card */}
          <div className="rounded-3xl p-8 mb-6 border border-blue-500/20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))" }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top left, rgba(37,99,235,0.1), transparent 60%)" }} />
            <div className="relative">
              <p className="text-gray-400 text-sm mb-2">Total saved across all goals</p>
              <p className="text-5xl font-bold mb-1">${totalSaved.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">of ${totalTarget.toFixed(0)} total target</p>
              <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.min((totalSaved / totalTarget) * 100, 100)}%`, background: "linear-gradient(90deg, #2563eb, #7c3aed)" }}
                />
              </div>
              <p className="text-blue-400 text-xs mt-2">{totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(1) : "0"}% of total goal reached</p>

            </div>
          </div>

          {/* Individual goals */}
          <h2 className="text-lg font-semibold mb-4">Your savings goals</h2>
          <div className="space-y-4 mb-8">
            {goals.map((goal) => {
              const pct = Math.min((goal.saved / goal.target) * 100, 100);
              return (
                <div key={goal.name} className="p-5 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{goal.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm">{goal.name}</p>
                        <p className="text-gray-600 text-xs">${goal.saved} saved of ${goal.target}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-bold text-sm">{pct.toFixed(0)}%</p>
                      <p className="text-gray-600 text-xs">${(goal.target - goal.saved).toFixed(0)} to go</p>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: "linear-gradient(90deg, #2563eb, #7c3aed)" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Start a new goal CTA */}
          <button
            onClick={() => setActiveTab("chat")}
            className="w-full py-4 rounded-2xl text-sm font-semibold text-white transition-all border border-blue-500/20 hover:border-blue-500/40"
            style={{ background: "rgba(37,99,235,0.08)" }}
          >
            + Start a new savings goal
          </button>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Goals active", value: goals.length.toString() },
              { label: "Total saved", value: `$${totalSaved}` },
              { label: "Network", value: "Base" },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-2xl border border-white/[0.07] text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                <p className="font-bold text-lg" style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
                <p className="text-gray-600 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}