import React from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AccountPage from '@pages/Account';
import { ServerSideProps } from '@/types/common';

const Account: NextPage = () => <AccountPage />;

export const getServerSideProps = async ({ locale }: ServerSideProps) => {
  const props = { ...(await serverSideTranslations(locale)) };

  return { props };
};

export default Account;
