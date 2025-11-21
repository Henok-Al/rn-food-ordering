import jwt from 'jsonwebtoken';

const getSecret = (): string => process.env.JWT_SECRET ?? 'development-secret';

export const signToken = (payload: object, expiresIn = '1h'): string =>
  jwt.sign(payload, getSecret(), { expiresIn });

export const verifyToken = <T>(token: string): T =>
  jwt.verify(token, getSecret()) as T;
