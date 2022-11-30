import React from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AccountPage from '@pages/Account';
import apiUrls from '@common/constants/apiUrls';
import { ServerSideProps } from '@/types/common';
import StateProvider from '@services/stateProvider';
import accountReducer, { AccountState } from '@store/account';
import axiosInstance from '@services/dataProvider/axiosInstance';

interface AccountProps {
  state: AccountState;
}

const Account: NextPage<AccountProps> = props => (
  <StateProvider initialState={props.state} reducer={accountReducer}>
    <AccountPage />
  </StateProvider>
);

export const getServerSideProps = async ({
  locale,
  req,
  res,
}: ServerSideProps) => {
  const infoResp = await axiosInstance.get(apiUrls.account.info, { req, res });

  const state = {
    accountInfo: infoResp?.data || null,
  };

  const props = { ...(await serverSideTranslations(locale)), state };

  return { props };
};

export default Account;
