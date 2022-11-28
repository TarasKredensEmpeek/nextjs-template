import React, { FC } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

interface LogoProps {
  text?: string;
  fontSize?: string;
  imageUrl?: string;
}

const Logo: FC<LogoProps> = ({
  text = 'on location',
  imageUrl,
  fontSize = '1.2em',
}) => {
  const { t } = useTranslation();

  if (imageUrl) {
    return (
      <Image
        height="100%"
        src={imageUrl}
        alt="logo"
        style={{ objectFit: 'contain', width: '100%' }}
      />
    );
  }

  if (text) {
    return (
      <Typography
        textTransform="uppercase"
        sx={{
          fontSize,
          letterSpacing: 4,
          userSelect: 'none',
          fontFamily: 'StagSans-Medium',
          background:
            'radial-gradient(108.59% 6877.63% at 50.07% -1.57%, #E4D5B1 0%, #B4964C 100%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
        }}
      >
        {t(text)}
      </Typography>
    );
  }

  return null;
};

export default Logo;
