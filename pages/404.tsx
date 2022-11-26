import React from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ServerSideProps } from '@/types/common';

const NotFound: NextPage = () => <div>Not Found</div>;

export const getStaticProps = async ({ locale }: ServerSideProps) => {
  const props = { ...(await serverSideTranslations(locale)) };
  return { props };
};

export default NotFound;
