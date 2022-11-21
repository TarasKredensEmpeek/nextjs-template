import React, { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const Radio: FC<SvgIconProps> = props => (
  <SvgIcon {...props}>
    <rect x="0.787109" y="0.5" width="19" height="19" rx="9.5" fill="white" />
  </SvgIcon>
);

export default Radio;
