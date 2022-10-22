import createTheme from '@mui/material/styles/createTheme';

import palette from './palette';
import components from './components';
import typography from './typography';

const breakpoints = {
  values: {
    xs: 0,
    sm: 568,
    md: 768,
    lg: 1024,
    xl: 1536,
  },
};

export default createTheme({
  breakpoints,
  palette,
  components,
  typography,
});
