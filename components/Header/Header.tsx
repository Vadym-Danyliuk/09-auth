'use client';
import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import React, { useState } from 'react';
import AiModal from '../AiModal/AiModal';
import { RiAiGenerate } from 'react-icons/ri';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">Note-Hub</Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li><Link href="/">Домашня</Link></li>
          <li><TagsMenu /></li>
          <li>
            <button className={css.assistantButton} onClick={() => setShowModal(true)}>
              Note-hub AI <RiAiGenerate />
            </button>
          </li>
          
          <AuthNavigation />
        </ul>
      </nav>
      {showModal && <AiModal onClose={() => setShowModal(false)} />}
    </header>
  );
};

export default Header;