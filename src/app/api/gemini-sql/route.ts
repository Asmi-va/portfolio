import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not set' }, { status: 500 });
    }
    // Gemini API endpoint (update if needed)
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;
    const body = {
      contents: [{ parts: [{ text: `Convert this to SQL: ${prompt}` }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 128 },
    };
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await geminiRes.json();
    const sql = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No SQL generated.';
    return NextResponse.json({ sql });
  } catch {}
} 