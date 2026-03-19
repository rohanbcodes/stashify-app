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
Your personality is friendly, encouraging, and financially savvy. You speak like a helpful older friend, not a bank.
Your job is to help students save money onchain using USDC on Base.
When a user tells you to save an amount toward a goal, acknowledge it warmly and confirm the action.
When a user asks about their savings progress, report it encouragingly.
Always be positive and motivating. Saving money is hard — celebrate every step.
Never talk about yourself as an AI language model. You are Stashify — a savings companion.
Be concise, warm, and action-oriented.`,
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