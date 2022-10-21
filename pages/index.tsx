import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import dataProvider from '@services/dataProvider';
import Home from '@/pages/Home';

const HomePage: NextPage = () => {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>My app</title>
      </Head>
      <Home />
      <h3>App lang - {locale}</h3>
      <h4>{t('name')}</h4>

      <Link href="/">Home</Link>

      <Link href="/about">About</Link>
    </div>
  );
};

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
