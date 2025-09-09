'use client';

import { useState } from 'react';
import { fetchNotes } from '@/lib/api/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { RiAddBoxFill } from 'react-icons/ri';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Link from 'next/link';

interface NotesClientProps {
  tag: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
   <header className={css.toolbar}>
  <SearchBox onSearch={handleSearch} />
  {data && data.totalPages > 1 && (
    <Pagination
      page={page}
      totalPages={data.totalPages}
      onChange={handlePageChange}
    />
  )}
  <Link href={'/notes/action/create/'} className={css.link}>
    Створити нотатку <RiAddBoxFill />
  </Link>
</header>

      {isSuccess && data && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
    </div>
  );
};

export default NotesClient;
