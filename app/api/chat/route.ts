import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Get the latest user message
    const latestMessage = messages[messages.length - 1].content;

    // Call our Python agent backend
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: latestMessage, history: messages }),
    });

    if (!response.ok) {
      throw new Error("Agent backend not available");
    }

    const data = await response.json();

    return NextResponse.json({
      message: data.response,
      goalUpdate: data.goalUpdate || null,
    });

  } catch {
    // Fallback: use OpenAI directly if Python backend is not running
    const { messages } = await req.json().catch(() => ({ messages: [] }));
    const latestMessage = messages?.[messages.length - 1]?.content || "";

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
            {
  role: "system",
  content: `You are Stashify, an AI savings assistant for students built on Base blockchain.
Your personality is friendly, encouraging, and financially savvy — like a helpful older friend, not a bank.

IMPORTANT RULES:
- Never repeat the same response twice
- Never ask "how much do you want to save" if the user already told you an amount
- If the user says "save $X for Y" — confirm you are saving that exact amount for that exact goal
- If the user says "hi" or greets you — greet them back warmly and ask what they want to save for
- If the user asks who you are — explain you are Stashify, an AI savings companion built on Base blockchain
- If the user asks for their balance — tell them to check the Dashboard tab at the top
- If the user asks about a goal — respond specifically about that goal
- Always vary your responses — never say the exact same thing twice
- Keep responses short, warm, and action-oriented
- Confirm saving actions with: "Done! $X saved toward your [goal] goal onchain."
- You use USDC on Base blockchain for all savings`,
},
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        max_tokens: 300,
      }),
    });

    const openaiData = await openaiResponse.json();
    const message = openaiData.choices?.[0]?.message?.content || "Sorry, I could not process that. Please try again.";

    // Parse if a save action was mentioned
    let goalUpdate = null;
    const saveMatch = latestMessage.match(/save\s+\$?(\d+(?:\.\d+)?)\s+(?:for\s+)?(.+)/i);
    if (saveMatch) {
      goalUpdate = {
        name: saveMatch[2].trim(),
        amount: parseFloat(saveMatch[1]),
      };
    }

    return NextResponse.json({ message, goalUpdate });
  }
}