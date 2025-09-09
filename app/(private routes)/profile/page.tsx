'use client';

import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import css from './Profile.module.css';

export default function Profile() {
  const { user } = useAuthStore();

  
  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Завантаження...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/note.svg'} 
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username || 'your_username'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}