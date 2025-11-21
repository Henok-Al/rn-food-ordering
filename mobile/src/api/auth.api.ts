import { AuthTokens, AuthUser } from '../types/auth';

export type AuthResponse = {
  tokens: AuthTokens;
  user: AuthUser;
};

const mockUser: AuthUser = {
  id: 'user-123',
  name: 'Harvest Diner',
  email: 'diner@example.com',
};

const simulateNetwork = async <T>(payload: T, delay = 600) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(payload), delay));

const createMockTokens = (): AuthTokens => ({
  accessToken: `access-${Date.now()}`,
  refreshToken: `refresh-${Date.now()}`,
  expiresAt: Date.now() + 1000 * 60 * 30, // 30 minutes
});

export const signIn = async (email: string, _password: string): Promise<AuthResponse> =>
  simulateNetwork({ tokens: createMockTokens(), user: { ...mockUser, email } });

export const register = async (name: string, email: string, _password: string): Promise<AuthResponse> =>
  simulateNetwork({
    tokens: createMockTokens(),
    user: { id: `user-${Date.now()}`, name, email },
  });

export const refreshTokens = async (_refreshToken: string): Promise<AuthTokens> =>
  simulateNetwork(createMockTokens(), 400);

export const verifyCode = async (_code: string): Promise<boolean> => simulateNetwork(true, 400);

export const requestPasswordReset = async (_email: string): Promise<boolean> => simulateNetwork(true, 400);
