'use client';
import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import css from './AiModal.module.css';
import { createNote } from '../../lib/api/clientApi';
import { RiDeleteBin5Fill, RiSave2Fill, RiSkipBackFill } from 'react-icons/ri';

type Props = {
  closeAction: () => void;
};

export default function AiModal({ closeAction }: Props) {
  const [note, setNote] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAction();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeAction]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleAsk = async () => {
    if (!note.trim()) return;

    setLoading(true);
    setReply('');
    setSaved(false);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
      });

      const data = await res.json();
      const aiReply = typeof data.reply === 'string' ? data.reply : 'AI не повернув відповідь';
      setReply(aiReply);
    } catch {
      setReply('Внутрішня помилка. Перевір API.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!reply.trim()) return;

    try {
      await createNote({
        title: reply.slice(0, 50),
        content: reply,
        tag: 'Personal',
      });
      setSaved(true);
    } catch {
      alert('Не вдалося зберегти нотатку');
    }
  };

  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <div className={css.overlay}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={closeAction}>×</button>
        <h2>Note-hub AI</h2>
        <p>Введи запит на нотатку, а я її тобі допоможу створити</p>

        <textarea
          ref={textareaRef}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Напиши текст нотатки тут..."
          rows={4}
          className={css.textarea}
        />

        <button onClick={handleAsk} disabled={loading || !note.trim()} className={css.askButton}>
          {loading ? 'Обробка...' : 'Запитати AI'}
        </button>

        {loading && (
          <p className={css.loadingText}>⏳ AI аналізує нотатку, повііііільно, бо на швидко нема грошей</p>
        )}

        {reply && (
          <div className={css.reply}>
            <strong>Відповідь:</strong>
            <p>{reply}</p>

            <div className={css.actions}>
              <button onClick={handleSave} disabled={saved} className={css.saveButton}>
                <RiSave2Fill />{saved ? '✅ Збережено' : ' Зберегти нотатку'}
              </button>

              <button onClick={() => setReply('')} className={css.deleteButton}>
                <RiDeleteBin5Fill />Видалити відповідь
              </button>

              <button onClick={closeAction} className={css.backButton}>
                <RiSkipBackFill /> Назад
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}