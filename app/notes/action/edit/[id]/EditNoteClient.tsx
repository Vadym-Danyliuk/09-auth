'use client';

import { useEffect } from 'react';
import { useNoteStore } from '@/lib/store/noteStore';
import NoteForm from '@/components/NoteForm/NoteForm';

interface EditNoteClientProps {
  note: {
    id: string;
    title: string;
    content: string;
    tag: string;
  };
}

const EditNoteClient = ({ note }: EditNoteClientProps) => {
  const { setDraft } = useNoteStore();

  useEffect(() => {
    setDraft({
      title: note.title,
      content: note.content,
      tag: note.tag,
    });
  }, [note, setDraft]);

  return <NoteForm noteId={note.id} />;
};

export default EditNoteClient;