'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import css from './Header.module.css';

import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { RiAiGenerate } from 'react-icons/ri';
import AiModal from '../AiModal/AiModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    if (showModal) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        Note-Hub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={css.headerLink} href="/">
              Головна
            </Link>
          </li>
          <li>
            <button
              className={css.assistantButton}
              onClick={() => setShowModal(true)}
              aria-haspopup="dialog"
              aria-expanded={showModal}
            >
              Note-hub AI <RiAiGenerate />
            </button>
          </li>
          <AuthNavigation />
        </ul>
      </nav>

      {showModal && (
        <AiModal
          closeAction={() => setShowModal(false)}
       
        />
      )}
    </header>
  );
};

export default Header;