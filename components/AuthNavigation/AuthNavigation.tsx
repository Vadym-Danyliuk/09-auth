'use client';

import css from './AuthNavigation.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

const AuthNavigation = () => {
  const router = useRouter();

  const { user, isAuthenticated, clearisAuthenticated } = useAuthStore();

  const handleClickLogOut = async () => {
    await logout();
    clearisAuthenticated();
    router.push('/sign-in');
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li>
            <TagsMenu />
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Кабінет
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button
              type="button"
              onClick={handleClickLogOut}
              className={css.logoutButton}
            >
              Вийти
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Вхід
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Реєстрація
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
