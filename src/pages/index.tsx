import type { NextPage } from 'next';
import React from 'react';

import dataProvider from '@services/dataProvider';

import styles from '../../styles/Home.module.css';

const Home: NextPage = props => {
  return <div className={styles.container}>{JSON.stringify(props)}</div>;
};

export const getServerSideProps = async () => {
  const d = await dataProvider.getData('todos');
  return { props: { data: d } };
};

export default Home;
