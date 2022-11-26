import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ServerSideProps } from '@/types/common';
import PageWrapper from '@common/layouts/PageWrapper';

const meta = { title: 'About', description: 'About' };

const About = () => <PageWrapper meta={meta}>about</PageWrapper>;

export async function getServerSideProps({ locale }: ServerSideProps) {
  const props = { ...(await serverSideTranslations(locale)) };

  return { props };
}

export default About;
