export const API_BASE_URL = 'https://api.example.com';

export const mockFetch = async <T>(data: T, delayMs = 300): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
