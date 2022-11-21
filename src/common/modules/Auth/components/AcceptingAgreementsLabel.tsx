import React, { FC } from 'react';
import Link from 'next/link';
import { Trans } from 'next-i18next';
import Typography from '@mui/material/Typography';

interface LinkTextProps {
  href: string;
  children: string | string[];
}

const LinkText: FC<LinkTextProps> = ({ href, children }) => (
  <Link href={href}>
    <Typography variant="caption" fontSize="inherit" color="text.link">
      {children}
    </Typography>
  </Link>
);

const AcceptingAgreementsLabel = () => (
  <Trans i18nKey="fieldPlaceholders.agreePolicy">
    <LinkText href="/purchase-policy">purchase-policy</LinkText>
    <LinkText href="/privacy-policy">privacy-policy</LinkText>
    <LinkText href="/terms-of-use">terms-of-use</LinkText>
  </Trans>
);

export default AcceptingAgreementsLabel;
