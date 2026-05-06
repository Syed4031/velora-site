import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { reply: "Please type a message first." },
        { status: 400 }
      );
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are Velora AI, a professional website assistant.

Velora helps companies build:
- premium company websites
- business portals
- dashboards
- service booking websites
- website redesigns
- secure client login systems

Answer clearly, briefly, and professionally.

User asked: ${message}
      `,
    });

    return NextResponse.json({
      reply: response.output_text || "Sorry, I could not generate a response.",
    });
  } catch (error) {
    console.error("AI_CHAT_ERROR:", error);

    return NextResponse.json(
      { reply: "AI assistant failed. Check OPENAI_API_KEY and terminal error." },
      { status: 500 }
    );
  }
}