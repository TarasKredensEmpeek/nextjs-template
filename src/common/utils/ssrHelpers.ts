import { NextApiResponse } from 'next';
import createCache from '@emotion/cache';

export const isBrowser = typeof document !== 'undefined';

export const createEmotionCache = () => {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
};

export interface NextResponseError {
  code: string | number;
  name: string;
  stack: string;
  status: string | number;
  message: string;
  statusCode: number;
  statusText: string;
  response?: NextApiResponse & { statusText?: string; status?: number };
}

export const createApiError = (
  response: NextApiResponse,
  catchError: NextResponseError,
) => {
  const error = {
    code: catchError.code,
    name: catchError.name,
    stack: catchError.stack,
    status: catchError.status,
    message: catchError.message,
    statusCode: catchError?.response?.status,
    statusText: catchError?.response?.statusText,
  };

  response.status(catchError.response?.status || 403).json(error);
};
