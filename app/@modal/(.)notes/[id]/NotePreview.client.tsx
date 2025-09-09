'use client';

import css from './NotePreview.module.css';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import React from 'react';
import Loading from '@/app/(private routes)/notes/filter/[...slug]/loading';

const NotePreview = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal closeModal={handleClose}>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <p className={css.tag}>{note.tag}</p>
          </div>
          <button onClick={() => router.back()} className={css.backBtn}>
            Close
          </button>
        </div>
      )}
      {isLoading && <Loading />}
      {error && <p>Something went wrong.</p>}
    </Modal>
  );
};

export default NotePreview;
