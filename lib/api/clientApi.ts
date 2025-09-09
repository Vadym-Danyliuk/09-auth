import { Credentials, User } from '@/types/user';
import { nextServer } from './api';
import { NewNote, Note } from '@/types/note';

interface SessionStatus {
  success: boolean;
}

interface FetchedNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const register = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>('/auth/register', credentials);
  return data;
};

export const login = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>('/auth/login', credentials);

  return data;
};

export const logout = async () => {
  await nextServer.post<User>('/auth/logout');
};

export const checkSession = async () => {
  const { data } = await nextServer.get<SessionStatus>('/auth/session');
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateMe = async (username: string): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', {
    username,
  });
  return data;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag: string
): Promise<FetchedNotesResponse> => {
  const { data } = await nextServer.get<FetchedNotesResponse>('/notes', {
    params: { perPage: 9, page, search, ...(tag && { tag }) },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', newNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};
