"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    desc: "Rome, Florence, Amalfi. Turn the dream into a plan.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    avatars: ["A", "R", "K", "D"],
    saved: 2100,
    target: 3200,
    tag: "Friends",
  },
  {
    title: "First dog together",
    desc: "Save for your first puppy — vet bills, food & more.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    avatars: ["M", "J"],
    saved: 340,
    target: 500,
    tag: "Couple",
  },
  {
    title: "Gaming setup upgrade",
    desc: "Split a PS5 + monitor and level up your dorm.",
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593",
    avatars: ["T", "S"],
    saved: 180,
    target: 300,
    tag: "Roommates",
  },
  {
    title: "Graduation Bali trip",
    desc: "Post-finals escape. You’re closer than you think.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    avatars: ["N", "P"],
    saved: 620,
    target: 700,
    tag: "Best friends",
  },
];

export default function PactPage() {
  const router = useRouter();
  const [pacts, setPacts] = useState<Pact[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ goalName: "", partner: "", targetEach: "" });

  const handleCreate = () => {
    if (!form.goalName || !form.partner || !form.targetEach) return;

    const newPact: Pact = {
      id: pacts.length + 1,
      goalName: form.goalName,
      partner: form.partner.slice(0, 6) + "...",
      targetEach: parseFloat(form.targetEach),
      mySaved: 0,
      partnerSaved: 0,
      status: "Pending",
    };

    setPacts([...pacts, newPact]);
    setShowCreate(false);
    setForm({ goalName: "", partner: "", targetEach: "" });
  };

  return (
    <main className="min-h-screen text-white bg-[#080d1a]">

      {/* HERO */}
      <section className="text-center px-6 pt-24 pb-20 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold leading-tight mb-6">
          Stop saving alone.
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Start saving together.
          </span>
        </h1>

        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Create shared saving goals with friends. Stay accountable. Hit goals faster.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Start a Pact →
          </button>

          <button className="border border-white/10 px-8 py-4 rounded-xl text-gray-400 hover:text-white transition">
            Explore ↓
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          🔥 1,200+ pacts created this week
        </p>
      </section>

      {/* INSPIRATION */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What are people saving for?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {INSPIRATION.map((item) => {
            const pct = Math.round((item.saved / item.target) * 100);

            return (
              <div
                key={item.title}
                className="relative h-[280px] rounded-3xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition"
                onClick={() => {
                  setForm({
                    goalName: item.title,
                    partner: "",
                    targetEach: (item.target / item.avatars.length).toString(),
                  });
                  setShowCreate(true);
                }}
              >
                <img
                  src={item.image}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs text-white/70">{item.tag}</p>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-white/70 mb-3">{item.desc}</p>

                  <div className="flex justify-between text-xs mb-1">
                    <span>${item.saved}</span>
                    <span>{pct}%</span>
                  </div>

                  <div className="h-1.5 bg-white/20 rounded-full">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button className="bg-white text-black px-6 py-2 rounded-xl font-semibold">
                    Start this pact
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* YOUR PACTS */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-xl font-bold mb-6">Your pacts</h2>

        {pacts.length === 0 ? (
          <div className="text-center py-16 border border-white/10 rounded-2xl">
            <p className="text-gray-500 mb-4">No pacts yet</p>
            <button
              onClick={() => setShowCreate(true)}
              className="bg-purple-500 px-6 py-3 rounded-xl"
            >
              Create your first pact
            </button>
          </div>
        ) : (
          pacts.map((pact) => (
            <div key={pact.id} className="border border-white/10 p-6 rounded-xl mb-4">
              <h3 className="font-semibold">{pact.goalName}</h3>
              <p className="text-gray-500 text-sm">with {pact.partner}</p>
            </div>
          ))
        )}
      </section>

      {/* CTA */}
      <section className="text-center pb-32 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Start your first pact today
        </h2>
        <p className="text-gray-400 mb-8">
          The fastest way to hit goals is accountability.
        </p>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 px-10 py-4 rounded-xl font-semibold"
        >
          Create Pact →
        </button>
      </section>

      {/* MODAL */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="bg-[#0d1424] p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Pact</h2>

            <input
              placeholder="Goal"
              value={form.goalName}
              onChange={(e) => setForm({ ...form, goalName: e.target.value })}
              className="w-full mb-3 p-3 rounded bg-white/5"
            />

            <input
              placeholder="Friend wallet"
              value={form.partner}
              onChange={(e) => setForm({ ...form, partner: e.target.value })}
              className="w-full mb-3 p-3 rounded bg-white/5"
            />

            <input
              placeholder="Amount"
              type="number"
              value={form.targetEach}
              onChange={(e) => setForm({ ...form, targetEach: e.targetEach })}
              className="w-full mb-4 p-3 rounded bg-white/5"
            />

            <button
              onClick={handleCreate}
              className="w-full bg-purple-500 py-3 rounded-xl mb-2"
            >
              Create
            </button>

            <button onClick={() => setShowCreate(false)} className="w-full text-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}