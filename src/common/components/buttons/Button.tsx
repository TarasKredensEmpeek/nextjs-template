import React, { FC, useMemo } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

import { LoadingIcon } from '@common/components/icons';
import { capitalizeString } from '@common/utils/string';

export interface BaseButtonProps extends ButtonProps {
  loading?: boolean;
}

const Button: FC<BaseButtonProps> = ({
  startIcon,
  disabled,
  variant = 'contained',
  loading,
  children,
  ...props
}) => {
  const buttonVariant = useMemo(() => {
    if (loading) {
      return `loading${capitalizeString(variant)}`;
    }

    return variant;
  }, [variant, loading]) as ButtonProps['variant'];

  const finalStartIcon = useMemo(() => {
    if (loading) {
      return <LoadingIcon />;
    }

    return startIcon;
  }, [loading, startIcon]);

  return (
    <MuiButton
      {...props}
      disabled={disabled || loading}
      variant={buttonVariant}
      startIcon={finalStartIcon}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
