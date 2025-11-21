import dotenv from 'dotenv';

export const loadEnv = (): void => {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
};
