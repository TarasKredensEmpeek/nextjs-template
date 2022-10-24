import makeStyles from '@mui/styles/makeStyles';

export default makeStyles({
  inputField: {
    height: 48,
    borderRadius: 5,
    backgroundColor: '#F9F9F9',
    border: '1px solid #F9F9F9',
    paddingLeft: 22,
    fontWeight: 400,
    fontSize: 18,

    '& input::placeholder': {
      opacity: 1,
      fontWeight: 400,
      color: '#585E5F',
    },
  },

  boldInputText: { fontWeight: 600 },

  inputFocused: {
    borderColor: '#585E5F !important',
    '& input::placeholder': {
      color: '#BBBFBE',
    },
  },

  error: {
    borderColor: '#C31111',
    '& input::placeholder': {
      color: '#585E5F',
    },
  },

  withBorder: {
    borderColor: '#BCBFBE',
  },

  formHelperText: {
    left: 8,
    top: '95%',
    position: 'absolute',
  },
});
