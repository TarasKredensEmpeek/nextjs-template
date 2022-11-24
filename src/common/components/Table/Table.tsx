import React, { FC, ReactElement, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

interface TableRecord {
  id?: number;
  [k: string]: string | number | object | undefined;
}

interface ColumnParams {
  name: string;
  flex?: number; // [0 - 100]
  title: string;
  getFlex?: (isMd: boolean) => number;
  getValue?: (d: TableRecord) => string | ReactElement;
  hideOnMobile?: boolean;
}

interface RowProps<D extends TableRecord> {
  data: D;
  columns: ColumnParams[];
}

interface TableProps<D extends TableRecord> {
  data: D[];
  columns: ColumnParams[];
  rowComponent?: FC<RowProps<D>>;
}

const Table: FC<TableProps<TableRecord>> = ({
  data,
  columns,
  rowComponent: Row,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const currentColumns = useMemo(
    () =>
      (isMd ? columns.filter(c => !c.hideOnMobile) : columns).map(c =>
        c.getFlex ? { ...c, flex: c.getFlex(isMd) } : c,
      ),
    [columns, isMd],
  );

  const defaultFlex = useMemo(
    () => 100 / currentColumns.length,
    [currentColumns.length],
  );

  return (
    <Grid container direction="column">
      <Grid
        container
        mb={1.5}
        flex={100}
        color="white"
        bgcolor="text.secondary"
        minHeight={39}
        alignItems="center"
        borderRadius="5px"
      >
        {currentColumns.map(col => (
          <Grid key={col.title} flex={col.flex || defaultFlex} pl={1.5}>
            <Typography variant="body1" fontWeight={400}>
              {t(col.title)}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {!!data?.length && (
        <Grid container direction="column" width="100%" flex={100}>
          {data.map(dataRow => {
            if (Row) {
              return (
                <Row
                  key={dataRow?.id}
                  data={dataRow}
                  columns={currentColumns}
                />
              );
            }

            return (
              <Grid key={dataRow?.id} container direction="row" flex={100}>
                {currentColumns.map(col => (
                  <Grid key={col.name} flex={col.flex || defaultFlex} pl={1.5}>
                    {col.getValue
                      ? col.getValue(dataRow)
                      : String(dataRow?.[col.name])}
                  </Grid>
                ))}
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default Table;
