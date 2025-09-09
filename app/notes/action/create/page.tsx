import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata = {
  title: 'Створити нотатку — NoteHub',
  description: 'Сторінка для створення нової нотатки з підтримкою чернетки.',
  openGraph: {
    title: 'Створити нотатку — NoteHub',
    description: 'Сторінка для створення нової нотатки з підтримкою чернетки.',
    url: 'https://notehub.vercel.app/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}