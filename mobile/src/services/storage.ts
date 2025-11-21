import * as SecureStore from 'expo-secure-store';

import { AuthSession } from '../types/auth';

const SESSION_KEY = 'auth_session';

const secureStoreWrapper = async <T>(action: () => Promise<T>): Promise<T | null> => {
  try {
    return await action();
  } catch (error) {
    console.warn('SecureStore error', error);
    return null;
  }
};

export const saveAuthSession = async (session: AuthSession) =>
  secureStoreWrapper(() => SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session)));

export const getAuthSession = async () =>
  secureStoreWrapper(async () => {
    const raw = await SecureStore.getItemAsync(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  });

export const deleteAuthSession = async () =>
  secureStoreWrapper(() => SecureStore.deleteItemAsync(SESSION_KEY));
