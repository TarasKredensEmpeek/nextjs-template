import React, { ReactNode, FC } from 'react';
import Head from 'next/head';

import { MetaData } from '@/types/common';

interface PageHeadProps {
  meta: MetaData;
  content?: ReactNode;
}

const PageHead: FC<PageHeadProps> = ({ meta, content }) => (
  <Head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    {content}
  </Head>
);

export default PageHead;
