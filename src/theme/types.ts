import React from 'react';
import { Components, Theme } from '@mui/material/styles';
import { ComponentsPropsList } from '@mui/material/styles/props';

export type ComponentsOverrides = Components<Theme>;

export type OverrideThemeProps = {
  theme: Theme;
  ownerState: ComponentsPropsList[keyof ComponentsPropsList];
};

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    rounded: true;
    circle: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    link: true;
    label1: true;
    label2: true;
    fieldError: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface TypeText {
    main: string;
    gradient: string;
  }

  interface TypeBackground {
    dark: string;
    secondary: string;
    gradient: string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    transparent: string;
    border: Palette['primary'];
  }
  interface PaletteOptions {
    transparent: string;
    border: PaletteOptions['primary'];
  }

  interface PaletteColor {
    gradient?: string;
  }
  interface SimplePaletteColorOptions {
    gradient?: string;
  }

  interface TypographyVariants {
    link: React.CSSProperties;
    label1: React.CSSProperties;
    label2: React.CSSProperties;
    fieldError: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    link?: React.CSSProperties;
    label1?: React.CSSProperties;
    label2?: React.CSSProperties;
    fieldError?: React.CSSProperties;
  }
}
