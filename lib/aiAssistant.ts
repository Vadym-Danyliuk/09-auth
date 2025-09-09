import { openai } from './openai';

export async function getAiReply(note: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Ти помічник, який допомагає з нотатками.' },
      { role: 'user', content: `Проаналізуй цю нотатку: ${note}` },
    ],
  });

  return completion.choices[0].message.content || 'Немає відповіді';
}