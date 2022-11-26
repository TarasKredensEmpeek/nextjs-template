import React from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Home from '@/pages/Home';
import { ServerSideProps } from '@/types/common';
import PageWrapper from '@common/layouts/PageWrapper';

const metaData = {
  title:
    'On Location | Sports, Music & Lifestyle Experiences, Tickets & Hospitality',
  description:
    'On Location | Sports, Music & Lifestyle Experiences, Tickets & Hospitality',
};

const HomePage: NextPage = () => (
  <PageWrapper meta={metaData}>
    <Home />
  </PageWrapper>
);

export const getServerSideProps = async ({ locale }: ServerSideProps) => {
  const props = { ...(await serverSideTranslations(locale)) };

  return { props };
};

export default HomePage;
