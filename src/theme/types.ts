import { Components, Theme } from '@mui/material/styles';
import { ComponentsPropsList } from '@mui/material/styles/props';

export type ComponentsOverrides = Components<Theme>;

export type OverrideThemeProps = {
  theme: Theme;
  ownerState: ComponentsPropsList[keyof ComponentsPropsList];
};
