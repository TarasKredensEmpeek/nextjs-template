import React, { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const IndeterminateIcon: FC<SvgIconProps> = props => (
  <SvgIcon {...props}>
    <rect x="0.732422" y="0.5" width="19" height="19" rx="1.5" />

    <rect
      x="0.732422"
      y="0.5"
      width="19"
      height="19"
      rx="1.5"
      fill="currentColor"
    />

    <path
      d="M5.23242 9.5C4.95628 9.5 4.73242 9.72386 4.73242 10C4.73242 10.2761 4.95628 10.5 5.23242 10.5V9.5ZM15.2324 10.5C15.5086 10.5 15.7324 10.2761 15.7324 10C15.7324 9.72386 15.5086 9.5 15.2324 9.5V10.5ZM5.23242 10.5H15.2324V9.5H5.23242V10.5Z"
      stroke="white"
      fill="white"
    />
  </SvgIcon>
);

export default IndeterminateIcon;
