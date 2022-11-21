// import { ButtonProps } from '@mui/material/Button';
// import { Theme, Palette } from '@mui/material/styles';
//
// type ColorVariants =
//   | 'primary'
//   | 'secondary'
//   | 'error'
//   | 'info'
//   | 'warning'
//   | 'success'
//   | 'inherit'
//   | 'default';
//
// type ReturnColorVariants = Omit<ColorVariants, 'default' | 'inherit'>;
//
// const getIsPrimary = (color: string): boolean =>
//   color === 'default' || color === 'inherit';
//
// export const getColorName = (
//   color: ColorVariants = 'primary',
// ): ReturnColorVariants =>
//   color === 'default' || color === 'inherit' ? 'primary' : color;
//
// export const getColorPack = (color: ButtonProps['color'], theme: Theme) => {
//   const colorName: ReturnColorVariants = getColorName(color);
//
//   return theme.palette[colorName];
// };
