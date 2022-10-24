import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Typography from '@mui/material/Typography';
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

      <Typography variant="h1">
        h1 - IMAGINE THE EXPERIENCE OF A LIFETIME
      </Typography>
      <Typography variant="h2">h2 - App lang - {locale}</Typography>
      <Typography variant="h3">h3 - App lang - {locale}</Typography>
      <Typography variant="h4">h4 - App lang - {locale}</Typography>
      <Typography variant="h5">h5 - HYATT REGENCY HOUSTON GALLERIA</Typography>
      <Typography variant="h6">h6 - App lang - {locale}</Typography>
      <Typography variant="subtitle1">
        subtitle1 - App lang - {locale}
      </Typography>
      <Typography variant="subtitle2">
        subtitle2 - App lang - {locale}
      </Typography>
      <Typography variant="body1">body1 - App lang - {locale}</Typography>
      <Typography variant="body2">body2 - App lang - {locale}</Typography>
      <Typography variant="caption">caption - App lang - {locale}</Typography>
      <Typography variant="button">button - App lang - {locale}</Typography>
      <Typography variant="overline">overline - App lang - {locale}</Typography>
      <div>{t('name')}</div>

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
