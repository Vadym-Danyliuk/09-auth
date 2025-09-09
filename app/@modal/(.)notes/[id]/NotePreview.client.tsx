'use client';

import css from './NotePreview.module.css';
import { fetchNoteById, deleteNote } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import React from 'react';
import Loading from '@/app/notes/filter/[...slug]/loading';
import { RiDeleteBin5Fill, RiSkipBackFill, RiEdit2Fill } from 'react-icons/ri';
import Link from 'next/link';


const NotePreview = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const handleClose = () => {
    router.back();
  };

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const mutation = useMutation({
    mutationFn: () => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const handleDelete = () => {
    if (confirm('Ви впевнені, що хочете видалити нотатку?')) {
      mutation.mutate();
    }
  };

  return (
    <Modal closeModal={handleClose}>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <div className={css.content}>{note.content}</div>
            <p className={css.date}>{note.createdAt}</p>
            <p className={css.tag}>{note.tag}</p>
          </div>
          <div className={css.actions}>
            <button onClick={handleClose} className={css.backBtn}>
              <RiSkipBackFill /> Назад
            </button>
            <Link href={`/notes/action/edit/${id}`} className={css.editBtn}>
              <RiEdit2Fill /> Редагувати
            </Link>
            <button onClick={handleDelete} className={css.deleteBtn}>
              <RiDeleteBin5Fill /> Видалити
            </button>
          </div>
        </div>
      )}
      {isLoading && <Loading />}
      {error && <p>Щось пішло не так.</p>}
    </Modal>
  );
};

export default NotePreview;