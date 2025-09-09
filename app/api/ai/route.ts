import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { note } = await req.json();

    if (!note || typeof note !== 'string') {
      return NextResponse.json({ error: 'Нотатка не передана' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Ключ Gemini не знайдено' }, { status: 500 });
    }

    const model = google('models/gemini-1.5-pro-latest');
    const result = await generateText({
      model,
      prompt: `Проаналізуй цю нотатку: ${note}`,
    });

    const text = result.text;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Модель не повернула текст' }, { status: 500 });
    }

    return NextResponse.json({ reply: text });
  } 
   catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
}
}