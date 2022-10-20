import React from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import dataProvider from '@services/dataProvider';

interface IdxProps {}

const Home: NextPage<IdxProps> = () => {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <div>
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

export async function getServerSideProps({ locale }: SSRProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Home;
