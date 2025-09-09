import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

interface FetchedNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag: string
): Promise<FetchedNotesResponse> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<FetchedNotesResponse>('/notes', {
    params: { perPage: 9, page, search, ...(tag && { tag }) },
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
