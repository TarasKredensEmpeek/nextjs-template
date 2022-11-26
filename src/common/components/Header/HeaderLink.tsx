import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

interface HeaderLinkProps {
  name: string;
  onClick?: () => void;
}

const HeaderLink: FC<HeaderLinkProps> = ({ name, onClick }) => (
  <Typography
    onClick={onClick}
    variant="body2"
    sx={{
      position: 'relative',
      '&:hover:before': {
        transform: 'scaleX(1)',
      },

      '&:before': {
        content: '" "',
        width: '100%',
        height: '2px',
        bottom: 0,
        position: 'absolute',
        transition: 'all .3s ease-in-out 0s',
        transform: 'scaleX(0)',
        bgcolor: 'background.dark',
      },
    }}
  >
    {name}
  </Typography>
);

export default HeaderLink;
