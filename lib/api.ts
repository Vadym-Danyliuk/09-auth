
import type { NewNote, Note } from '../types/note';
import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://notehub-api.goit.study/api',
  withCredentials: true, 
});

export const fetchNotesByFilter = async (filter: string) => {
  const normalized = filter === 'All notes' ? 'all' : filter;
  return fetchNotes(1, '', normalized);
};

interface FetchedNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const updateNoteStatus = async (id: string, completed: boolean) => {
  await instance.patch(`/notes/${id}`, { completed });
};

export const updateNote = async (note: { id: string; title: string; content: string; tag: string }) => {
  const res = await instance.put(`/notes/${note.id}`, note);
  return res.data;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag: string
): Promise<FetchedNotesResponse> => {
  const normalizedTag = tag === 'all' ? '' : tag;

  const { data } = await instance.get<FetchedNotesResponse>('/notes', {
    params: {
      perPage: 12, // Змінено з 9 на 12 згідно завдання
      page,
      search,
      ...(normalizedTag && { tag: normalizedTag }),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', newNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};