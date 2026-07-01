import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es Nino, une professeure de géorgien patiente et encourageante. Tu réponds en géorgien adapté au niveau A1, avec la traduction française entre parenthèses. Tu poses une question pour continuer la conversation. Tu es chaleureuse et encourageante.`;

const FALLBACK_RESPONSES: Record<string, string> = {
  default:
    "გამარჯობა! მე ვარ ნინო. როგორ ხარ? (Bonjour ! Je suis Nino. Comment vas-tu ?)",
  hello:
    "გამარჯობა! სასიამოვნოა შენი გაცნობა. საიდან ხარ? (Bonjour ! Ravi de te connaître. D'où viens-tu ?)",
  howareyou:
    "კარგად ვარ, მადლობა! შენ როგორ ხარ? (Je vais bien, merci ! Et toi, comment vas-tu ?)",
};

function getFallbackResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("გამარჯობა") || lower.includes("bonjour") || lower.includes("salut"))
    return FALLBACK_RESPONSES.hello;
  if (lower.includes("კარგად") || lower.includes("ca va") || lower.includes("bien"))
    return FALLBACK_RESPONSES.howareyou;
  return FALLBACK_RESPONSES.default;
}

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();

    if (process.env.OPENAI_API_KEY) {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...history,
              { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 200,
          }),
        }
      );

      if (!response.ok) throw new Error("OpenAI API error");

      const data = await response.json();
      return NextResponse.json({
        response: data.choices[0].message.content,
      });
    }

    return NextResponse.json({
      response: getFallbackResponse(message),
    });
  } catch {
    return NextResponse.json(
      { response: getFallbackResponse("") },
      { status: 200 }
    );
  }
}
