import { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Створити нотатку',
  description: 'Сторити нову нотатку в Note-Hub',
  openGraph: {
    title: 'Створити нотатку',
    description: 'Create a new note in NoteHub',
    url: 'https://09-auth-three-pi.vercel.app//notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note',
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Сторити нотатку</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
