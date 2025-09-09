
import axios from 'axios';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';

const baseURL = 'https://notehub-api.goit.study';

const createServerClient = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader, 
    },
  });
};

export const getServerUser = async (): Promise<User | null> => {
  try {
    const client = await createServerClient();
    const response = await client.get('/users/me');
    return response.data;
  } catch (error) {
    return null;
  }
};


export const checkServerSession = async (): Promise<User | null> => {
  try {
    const client = await createServerClient();
    const response = await client.get('/auth/session');
    return response.data;
  } catch (error) {
    return null;
  }
};