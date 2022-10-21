import { ComponentsOverrides } from '@/theme/types';

import buttons from './buttons';
import textFields from './textFields';

const components: ComponentsOverrides = {
  MuiButton: buttons,
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  ...textFields,
};

export default components;
