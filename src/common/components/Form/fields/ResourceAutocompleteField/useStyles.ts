import makeStyles from '@mui/styles/makeStyles';

export default makeStyles({
  root: {
    borderRadius: 5,
    border: '1px solid #BCBFBE',

    '& :hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline':
      {
        border: 'none',
      },

    '&:hover': {
      border: '1px solid #BCBFBE',
    },
  },

  inputRoot: {
    paddingBottom: 7,
    backgroundColor: '#F9F9F9',
    paddingLeft: 22,
    fontWeight: 400,
    '& input::placeholder': {
      opacity: 1,
      fontWeight: 400,
      color: '#585E5F',
    },
  },

  input: {
    lineHeight: '1px !important',
    height: 'auto !important',
    padding: '5px 16px 6px !important',
    fontSize: 18,
  },

  boldInputText: { fontWeight: 600 },
  inputFocused: {
    borderColor: '#585E5F !important',
    '& label': {
      display: 'none',
    },
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
