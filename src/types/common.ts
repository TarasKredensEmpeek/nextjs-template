import { NextApiRequest, NextApiResponse } from 'next';

export interface MetaData {
  title: string;
  description: string;
}

export interface ServerSideProps {
  locale: string;
  req: NextApiRequest;
  res: NextApiResponse;
}
