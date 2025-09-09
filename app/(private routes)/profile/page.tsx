import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User information page',
  openGraph: {
    title: 'Profile',
    description: 'User information page',
    url: 'https://09-auth-three-pi.vercel.app//profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile',
      },
    ],
  },
};

const Profile = async () => {
  const user = await getMe();

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Сторінка користувача</h1>
            <Link href={'/profile/edit'} className={css.editProfileButton}>
              Редагувати профіль
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt={user.username}
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
