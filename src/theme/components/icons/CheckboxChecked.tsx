import React, { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CheckboxChecked: FC<SvgIconProps> = props => (
  <SvgIcon {...props}>
    <rect x="0.732422" y="0.5" rx="1.5" width="19" height="19" />
    <rect
      x="0.732422"
      y="0.5"
      width="19"
      height="19"
      rx="1.5"
      fill="currentColor"
    />

    <path
      d="M5.73242 10L8.73242 13L14.7324 7"
      stroke="white"
      fill="transparent"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);

export default CheckboxChecked;
