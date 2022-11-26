import React from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Account: NextPage = () => <div>Account</div>;

interface SSRProps {
  locale: string;
}

export const getServerSideProps = async ({ locale }: SSRProps) => {
  const props = {
    ...(await serverSideTranslations(locale)),
  };

  return { props };
};

export default Account;
