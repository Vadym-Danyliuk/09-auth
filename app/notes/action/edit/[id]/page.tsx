import { fetchNoteById } from '@/lib/api';
import css from './EditNote.module.css';
import EditNoteClient from './EditNoteClient';

interface EditNoteProps {
  params: Promise<{ id: string }>;
}

export default async function EditNote({ params }: EditNoteProps) {
  try {
    const { id } = await params;
    const note = await fetchNoteById(id);

    if (!note) {
      return (
        <main className={css.main}>
          <div className={css.container}>
            <h1 className={css.title}>Нотатка не знайдена</h1>
            <p>Запитувана нотатка не існує або була видалена.</p>
          </div>
        </main>
      );
    }

    return (
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Edit note</h1>
          <EditNoteClient note={note} />
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Помилка</h1>
          <p>Сталася помилка під час завантаження нотатки для редагування.</p>
        </div>
      </main>
    );
  }
}