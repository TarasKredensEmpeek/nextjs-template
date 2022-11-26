import React, { FC, ReactNode } from 'react';

import { MetaData } from '@/types/common';
import PageHead from '@common/layouts/PageHead';

interface PageWrapperProps {
  meta: MetaData;
  children: ReactNode;
  headContent?: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ meta, headContent, children }) => (
  <>
    <PageHead meta={meta} content={headContent} />
    {children}
  </>
);

export default PageWrapper;
