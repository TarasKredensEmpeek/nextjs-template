import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PurchasePolicy: NextPage = () => (
  <Head>
    <title>Purchase Policy</title>
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

export default PurchasePolicy;
