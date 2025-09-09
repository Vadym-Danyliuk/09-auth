'use client';
import { useState } from 'react';

export function AiAssistant({ note }: { note: string }) {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const askAi = async () => {
    setLoading(true);
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={askAi} disabled={loading}>
        {loading ? 'Обробка...' : '💡 Запитати AI'}
      </button>
      {reply && <div style={{ marginTop: '1rem' }}>{reply}</div>}
    </div>
  );
}