import React from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NotFound: NextPage = () => <div>Not Found</div>;

interface SSRProps {
  locale: string;
}

export const getStaticProps = async ({ locale }: SSRProps) => {
  const props = {
    ...(await serverSideTranslations(locale)),
  };

  return { props };
};

export default NotFound;
