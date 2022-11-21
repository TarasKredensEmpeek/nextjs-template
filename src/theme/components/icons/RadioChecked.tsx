import React, { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const RadioChecked: FC<SvgIconProps> = props => (
  <SvgIcon {...props}>
    <rect
      x="0.787109"
      y="0.5"
      width="19"
      height="19"
      rx="9.5"
      fill="transparent"
    />

    <rect
      x="4.3"
      y="4"
      rx="9.5"
      width="12"
      height="12"
      fill="currentColor"
      stroke="currentColor"
      filter="drop-shadow(0px 0px 3px currentColor)"
    />
  </SvgIcon>
);
export default RadioChecked;
