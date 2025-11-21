export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // epoch ms
};

export type AuthSession = {
  tokens: AuthTokens;
  user: AuthUser;
};
