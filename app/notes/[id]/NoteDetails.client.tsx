'use client';

import { useEffect, useState } from 'react';
import { useNoteStore } from '@/lib/store/noteStore';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NoteDetails.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { RiDeleteBin5Fill } from 'react-icons/ri';

interface NoteDetailsClientProps {
  note?: {
    id: string;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
  };
}
interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  completed: boolean;
}
const NoteDetailsClient = ({ note }: NoteDetailsClientProps) => {
  const { setDraft } = useNoteStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (note) {
      setDraft({
        title: note.title,
        content: note.content,
        tag: note.tag,
      });
    }
  }, [note, setDraft]);

  const mutation = useMutation({
    mutationFn: () => deleteNote(note!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setDeleted(true);
      setTimeout(() => router.push('/notes/filter/all'), 1500);
    },
  });

  const handleDelete = () => {
    if (confirm('Ви впевнені, що хочете видалити нотатку?')) {
      mutation.mutate();
    }
  };

  if (!note) {
    return <p>Нотатка не знайдена або ще завантажується...</p>;
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <div className={css.meta}>
        <span>{new Date(note.createdAt).toLocaleString()}</span>
        <span className={css.tag}>{note.tag}</span>
      </div>
      <p className={css.content}>{note.content}</p>

      <div className={css.actions}>
        <button
          onClick={handleDelete}
          disabled={mutation.isPending || deleted}
          className={css.deleteBtn}
        >
          <RiDeleteBin5Fill />
          {mutation.isPending ? 'Видалення...' : deleted ? '✅ Видалено' : 'Видалити нотатку'}
        </button>
      </div>

      <div className={css.formWrapper}>
        <h2>Редагувати нотатку</h2>
        <NoteForm noteId={note.id} />
      </div>
    </div>
  );
};

export default NoteDetailsClient;