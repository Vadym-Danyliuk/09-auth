'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';
import Loading from '@/app/loading';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, clearUser } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const isAuthRoute = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up');
  const isProtectedRoute = pathname?.startsWith('/profile') || pathname?.startsWith('/notes');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await checkSession();
        
        if (user) {
          setUser(user);
         
          if (isAuthRoute) {
            router.replace('/profile');
          }
        } else {
         
          clearUser();
    
          if (isProtectedRoute) {
            router.replace('/sign-in');
          }
        }
      } catch (error) {
        clearUser();
        if (isProtectedRoute) {
          router.replace('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [pathname, setUser, clearUser, router, isAuthRoute, isProtectedRoute]);


  if (isLoading && isProtectedRoute) {
    return <Loading />;
  }

  return <>{children}</>;
}