import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dataProvider from '@services/dataProvider';

interface IdxProps {
  users?: any;
}

const Home: NextPage<IdxProps> = props => {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <div>
      <h3>App lang - {locale}</h3>
      <h4>{t('name')}</h4>

      <Link href="/">Home</Link>

      <Link href="/about">About</Link>

      {props.users.map((user: any) => (
        <p key={user.id}>{JSON.stringify(user || {})}</p>
      ))}
    </div>
  );
};

interface SSRProps {
  locale: string;
}

export async function getServerSideProps({ locale }: SSRProps) {
  const { data: users } = (await dataProvider.getData('users?id=6&id=1')) || {};
  return {
    props: {
      users,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Home;
