import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import useStyles from './useStyles';

type TActiveTabSetter = (key: number) => void;

export interface TPackageTab {
  name: string;
  content?: string | ReactNode;
}

interface TPackageTabsProps {
  tabs: TPackageTab[];
  activeTabId?: number;
  setActiveTab: TActiveTabSetter;
}

interface TTabProps {
  xs: number;
  name: string;
  index: number;
  isActive: boolean;
  isFirstTab: boolean;
  isLastTab: boolean;
  setActiveTab: TActiveTabSetter;
}

const PackageTab: FC<TTabProps> = ({
  index,
  xs,
  name,
  isActive,
  isLastTab,
  isFirstTab,
  setActiveTab,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const tabClassName = useMemo(
    () =>
      clsx(styles.tab, {
        [styles.active]: isActive,
        [styles.first]: isFirstTab,
        [styles.last]: isLastTab,
      }),
    [styles, isActive, isFirstTab, isLastTab],
  );

  return (
    <Grid
      item
      container
      xs={xs}
      onClick={() => setActiveTab(index)}
      className={tabClassName}
      alignItems="center"
      data-enabled={isActive}
      justifyContent="center"
    >
      <Typography variant="subtitle2" className={styles.tabText}>
        {t(name)}
      </Typography>
    </Grid>
  );
};

const Tabs: FC<TPackageTabsProps> = ({ tabs, setActiveTab, activeTabId }) => {
  const activeTabData = useMemo(
    () => tabs.find((_, index) => index === activeTabId)?.content,
    [tabs, activeTabId],
  );

  const getIsLastTab = useCallback(
    (index: number) => tabs.length - 1 === index,
    [tabs.length],
  );

  const getIsActiveTab = useCallback(
    (key: number) => key === activeTabId,
    [activeTabId],
  );

  return (
    <Grid container direction="column">
      <Grid container data-test="tabs">
        {tabs.map((tab, index) => (
          <PackageTab
            {...tab}
            xs={12 / tabs.length}
            index={index}
            key={`tab_${index}`}
            isActive={getIsActiveTab(index)}
            isLastTab={getIsLastTab(index)}
            isFirstTab={!index}
            setActiveTab={setActiveTab}
          />
        ))}
      </Grid>

      {activeTabData && typeof activeTabData === 'string' ? (
        <Grid
          container
          style={{ marginTop: 33, display: 'block' }}
          dangerouslySetInnerHTML={{ __html: activeTabData }}
        />
      ) : (
        <Grid container style={{ marginTop: 33, display: 'block' }}>
          {activeTabData}
        </Grid>
      )}
    </Grid>
  );
};

export default Tabs;
