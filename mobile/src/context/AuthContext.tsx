import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  refreshTokens as refreshTokensRequest,
  requestPasswordReset,
  signIn as signInRequest,
  verifyCode as verifyCodeRequest,
  register as registerRequest,
} from '../api/auth.api';
import { deleteAuthSession, getAuthSession, saveAuthSession } from '../services/storage';
import { AuthSession, AuthUser } from '../types/auth';

const TOKEN_REFRESH_THRESHOLD_MS = 60 * 1000; // refresh 1 minute before expiry

export type AuthContextValue = {
  user: AuthUser | null;
  session: AuthSession | null;
  isInitialized: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<AuthSession | null>;
  getCurrentUser: () => AuthUser | null;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyCode: (code: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const persistSession = useCallback(async (nextSession: AuthSession) => {
    setSession(nextSession);
    setUser(nextSession.user);
    await saveAuthSession(nextSession);
  }, []);

  const clearSession = useCallback(async () => {
    setSession(null);
    setUser(null);
    await deleteAuthSession();
  }, []);

  const refreshToken = useCallback(async (): Promise<AuthSession | null> => {
    if (!session) {
      return null;
    }

    try {
      const tokens = await refreshTokensRequest(session.tokens.refreshToken);
      const nextSession = { ...session, tokens };
      await persistSession(nextSession);
      return nextSession;
    } catch (error) {
      console.warn('Refresh token failed', error);
      await clearSession();
      return null;
    }
  }, [session, persistSession, clearSession]);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const storedSession = await getAuthSession();
        if (!isMounted || !storedSession) {
          return;
        }

        const expiresSoon =
          storedSession.tokens.expiresAt - TOKEN_REFRESH_THRESHOLD_MS <= Date.now();

        if (expiresSoon) {
          const refreshed = await refreshTokensRequest(storedSession.tokens.refreshToken).catch(
            () => null,
          );
          if (refreshed && isMounted) {
            await persistSession({ ...storedSession, tokens: refreshed });
          } else if (isMounted) {
            await clearSession();
          }
        } else {
          setSession(storedSession);
          setUser(storedSession.user);
        }
      } finally {
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [persistSession, clearSession]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await signInRequest(email, password);
        await persistSession({ tokens: response.tokens, user: response.user });
      } finally {
        setIsLoading(false);
      }
    },
    [persistSession],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await registerRequest(name, email, password);
        await persistSession({ tokens: response.tokens, user: response.user });
      } finally {
        setIsLoading(false);
      }
    },
    [persistSession],
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await clearSession();
    } finally {
      setIsLoading(false);
    }
  }, [clearSession]);

  const getCurrentUser = useCallback(() => user, [user]);

  const handlePasswordReset = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      return await requestPasswordReset(email);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleVerifyCode = useCallback(async (code: string) => {
    setIsLoading(true);
    try {
      return await verifyCodeRequest(code);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      isInitialized,
      isLoading,
      signIn,
      register,
      signOut,
      refreshToken,
      getCurrentUser,
      requestPasswordReset: handlePasswordReset,
      verifyCode: handleVerifyCode,
    }),
    [
      user,
      session,
      isInitialized,
      isLoading,
      signIn,
      register,
      signOut,
      refreshToken,
      getCurrentUser,
      handlePasswordReset,
      handleVerifyCode,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
