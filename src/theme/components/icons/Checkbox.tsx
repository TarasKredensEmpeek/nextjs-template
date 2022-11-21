import React, { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const Checkbox: FC<SvgIconProps> = props => (
  <SvgIcon {...props}>
    <rect
      x="0.732422"
      y="0.5"
      rx="1.5"
      width="19"
      height="19"
      fill="transparent"
    />
  </SvgIcon>
);

export default Checkbox;
