import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles(
  (theme: Theme) => {
    const mainColor = theme.palette.primary;
    const border = `1px solid ${mainColor.main}`;

    return {
      tab: {
        cursor: 'pointer',
        minHeight: 56,
        userSelect: 'none',
        borderTop: border,
        borderLeft: border,
        borderBottom: border,
      },

      tabText: {
        padding: theme.spacing(2),
        wordBreak: 'break-all',
        textTransform: 'uppercase',
      },

      active: {
        color: mainColor.contrastText,
        position: 'relative',
        backgroundColor: mainColor.main,

        '&:after': {
          content: '""',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          width: 0,
          height: 0,
          margin: '0 auto',
          borderTop: `8.5px solid ${mainColor.main}`,
          borderLeft: '30px solid transparent',
          borderRight: '30px solid transparent',
        },
      },

      first: {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: theme.shape.borderRadius,
      },

      last: {
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        borderRight: border,
        borderLeft: border,
      },
    };
  },
  { name: 'MuiOlTabs' },
);

export default useStyles;
