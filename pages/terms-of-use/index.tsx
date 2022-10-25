import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const TermsOfUse: NextPage = () => (
  <Head>
    <title>Terms Of Use</title>
  </Head>
);

interface SSRProps {
  locale: string;
}

export const getServerSideProps = async ({ locale }: SSRProps) => {
  const props = {
    ...(await serverSideTranslations(locale)),
  };

  return { props };
};

export default TermsOfUse;
