'use client';

import { useState } from 'react';
import css from './SearchBox.module.css';
import { RiCloseFill } from 'react-icons/ri';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBox({ onSearch, placeholder = "Пошук нотаток " }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <div className={css.inputContainer}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={css.searchInput}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={css.clearButton}
          >
            <RiCloseFill /> 
          </button>
        )}
      </div>
      <button type="submit" className={css.searchButton}>
        Знайти
      </button>
    </form>
  );
}