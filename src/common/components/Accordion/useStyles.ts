import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

export const useIndexedStepStyles = makeStyles((theme: Theme) => {
  const mainColor = theme.palette.primary;

  return {
    container: {
      border: 'none',
      boxShadow: 'none',
      margin: theme.spacing(0.3, 0),
      '&:before': {
        height: 0,
      },

      '&.Mui-expanded': {
        margin: theme.spacing(0.3, 0),

        '&:first-of-type': {
          marginTop: theme.spacing(0.3),
        },
      },
    },

    icon: {
      fontSize: 34,
      color: mainColor.contrastText,
    },

    summary: {
      margin: 0,
      height: 46,
      minHeight: 46,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: mainColor.main,

      '&.Mui-expanded': {
        minHeight: 0,
        margin: 0,
      },
    },

    summaryContent: {
      color: mainColor.contrastText,

      '&.Mui-expanded': {
        minHeight: 0,
        margin: 0,
      },
    },

    content: { padding: 0, paddingBottom: theme.spacing(3) },
  };
});

export const useStandardStyles = makeStyles((theme: Theme) => ({
  container: {
    border: 'none',
    boxShadow: 'none',
    borderTop: `1px solid ${theme.palette.border.light}`,
    margin: 0,
    '&:before': {
      height: 0,
    },

    '&.Mui-expanded': {
      margin: 0,
      '&:first-of-type': { marginTop: 0 },
    },
  },

  summary: {
    height: 60,
    minHeight: 60,

    '&.Mui-expanded': {
      minHeight: 0,
    },
  },

  summaryContent: {
    '&.Mui-expanded': {
      minHeight: 0,
      margin: 0,
    },
  },

  icon: {
    fontSize: 24,
    color: theme.palette.text.secondary,
  },

  content: { padding: 0, paddingBottom: theme.spacing(3) },
}));
