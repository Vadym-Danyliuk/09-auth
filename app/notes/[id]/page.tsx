import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const note = await fetchNoteById(id);

    if (!note) {
      return {
        title: 'Нотатка не знайдена — NoteHub',
        description: 'Запитувана нотатка не існує або була видалена.',
      };
    }

    const title = `${note.title} — NoteHub`;
    const description = note.content.slice(0, 100);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://notehub.vercel.app/notes/${id}`,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  } catch (error) {
    return {
      title: 'Помилка завантаження — NoteHub',
      description: 'Сталася помилка під час завантаження нотатки.',
    };
  }
}

export default async function NoteDetails({ params }: PageProps) {
  try {
    const { id } = await params;
    const queryClient = new QueryClient();
    
   
    const note = await fetchNoteById(id);
    
    if (note) {
      await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
      });
    }

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient note={note} />
      </HydrationBoundary>
    );
  } catch (error) {
  
    return (
      <div>
        <p>Помилка завантаження нотатки. Спробуйте пізніше.</p>
      </div>
    );
  }
}