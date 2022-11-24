import React, { FC } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

interface LogoProps {
  text?: string;
  imageUrl?: string;
}

// todo decide to using css or svg
const Logo: FC<LogoProps> = ({ text, imageUrl }) => {
  const { t } = useTranslation();

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        layout="fixed"
        width="100%"
        height="100%"
        alt="logo"
        objectFit="contain"
      />
    );
  }

  if (text) {
    return (
      <Typography
        textTransform="uppercase"
        sx={{
          letterSpacing: 4,
          userSelect: 'none',
          fontFamily: 'StagSans-Book',
          fontSize: '1.2em',
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
