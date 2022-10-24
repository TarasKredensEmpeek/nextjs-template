import makeStyles from '@mui/styles/makeStyles';

export default makeStyles({
  select: {
    '& input::placeholder': {
      opacity: 1,
      fontWeight: 400,
      color: '#585E5F',
    },
    maxHeight: 39,
    borderRadius: 5,
    backgroundColor: '#F9F9F9',
    padding: 5.5,
    paddingLeft: 19,
    paddingRight: 19,
    fontWeight: 700,
    fontSize: 14,
    width: 'inherit',
  },

  inputRoot: {
    border: '1px solid #BCBFBE',
  },

  leftLabel: {
    paddingRight: 16,
  },
  rightLabel: {
    paddingLeft: 16,
  },

  formHelperText: {
    left: 8,
    top: '95%',
    position: 'absolute',
  },
});
