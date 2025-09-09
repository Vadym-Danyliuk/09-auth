import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import type { Metadata } from 'next';

interface NoteDetailsProps {
  params: { id: string };
}

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  const title = `${note.title} — NoteHub`;
  const description = note.content.slice(0, 100);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.vercel.app/notes/${params.id}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = params;
  const queryClient = new QueryClient();

  const note = await fetchNoteById(id);

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient note={note} />
    </HydrationBoundary>
  );
};

export default NoteDetails;