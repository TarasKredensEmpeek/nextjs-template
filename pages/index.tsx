import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Home from '@/pages/Home';

const HomePage: NextPage = () => (
  <div>
    <Head>
      <title>My app</title>
    </Head>

    <Home />

    <Link href="/">Home</Link>

    <Link href="/about">About</Link>
  </div>
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

export default HomePage;
