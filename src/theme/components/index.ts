import { ComponentsOverrides } from '@/theme/types';

import buttons from './buttons';
import textFields from './textFields';
import cssBaseline from './cssBaseline';

const components: ComponentsOverrides = {
  MuiButton: buttons,
  MuiCssBaseline: cssBaseline,
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  ...textFields,
};

export default components;
