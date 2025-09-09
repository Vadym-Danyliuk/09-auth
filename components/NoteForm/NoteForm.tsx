'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, updateNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';
import { RiAdminFill, RiRemixRunFill } from 'react-icons/ri';

export interface NoteFormProps {
  closeModal?: () => void;
  noteId?: string;
}

const NoteForm = ({ noteId }: NoteFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [errors, setErrors] = useState<{ title?: string; tag?: string }>({});
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    setLocalTime(new Date(lastUpdated).toLocaleTimeString());
  }, [lastUpdated]);

  const mutationCreate = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const validate = () => {
    const newErrors: typeof errors = {};
    if (draft.title.trim().length < 3) {
      newErrors.title = 'Назва має містити мінімум 3 символи';
    }
    if (!['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].includes(draft.tag)) {
      newErrors.tag = 'Невірний тип нотатки';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (noteId) {
      mutationUpdate.mutate({ id: noteId, ...draft });
    } else {
      mutationCreate.mutate(draft);
    }
  };

  const handleChange = (field: keyof typeof draft, value: string) => {
    setDraft({ ...draft, [field]: value });
    setLastUpdated(Date.now());
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formGroup}>
        Заголовок
        <input
          className={css.input}
          type="text"
          value={draft.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </label>

      <label className={css.formGroup}>
        Нотатка
        <textarea
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(e) => handleChange('content', e.target.value)}
        />
      </label>

      <label className={css.formGroup}>
        Тип нотатки
        <select
          className={css.select}
          value={draft.tag}
          onChange={(e) => handleChange('tag', e.target.value)}
        >
          <option value="Todo">Доробити</option>
          <option value="Work">Робота</option>
          <option value="Personal">Особисте</option>
          <option value="Meeting">Зустріч</option>
          <option value="Shopping">Покупки</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </label>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Скасувати
        </button>
        <button type="submit" className={css.submitButton}>
          <RiAdminFill />
        </button>
        <button type="button" onClick={clearDraft} className={css.clearDraftBtn}>
          <RiRemixRunFill /> Очистити чернетку
        </button>
      </div>

      {localTime && (
        <div>
          <p className={css.draftStatus}>
            Востаннє змінено: {localTime}
          </p>
        </div>
      )}
    </form>
  );
};

export default NoteForm;