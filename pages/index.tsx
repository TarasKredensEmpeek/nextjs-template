import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Home from '@/pages/Home';
import { useGetData } from '@common/hooks/useRequest';

const HomePage: NextPage = () => {
  const [getCards] = useGetData('/packages/getPackageCardsBySiteId');

  useEffect(() => {
    getCards();
  }, [getCards]);

  return (
    <div>
      <Head>
        <title>My app</title>
      </Head>

      <Home />

      <Link href="/">Home</Link>

      <Link href="/about">About</Link>
    </div>
  );
};

interface SSRProps {
  locale: string;
}

export const getServerSideProps = async ({ locale }: SSRProps) => {
  // const res = await axiosInstance.get(
  //   '/PackageService/GetPackageCardsBySiteId',
  //   {
  //     params: { langtag: 'en', siteId: 39 },
  //   },
  // );

  const props = {
    ...(await serverSideTranslations(locale)),
  };

  return { props };
};

export default HomePage;
