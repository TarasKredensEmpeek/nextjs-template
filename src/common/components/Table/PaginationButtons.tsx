import React, { FC, CSSProperties } from 'react';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import p24Arrow from 'assets/icons/p24-arrow-left-black.png';

const ArrowIcon = (style: CSSProperties) => (
  <Image src={p24Arrow} style={{ width: '20px', ...style }} alt="P24 Arrow" />
);

interface PaginationProps {
  nextPage: () => void;
  prevPage: () => void;
  canPrev: boolean;
  canNext: boolean;
}

const PaginationButtons: FC<PaginationProps> = ({
  nextPage,
  prevPage,
  canPrev,
  canNext,
}) => (
  <Grid container justifyContent="space-between">
    <Grid item xs={4}>
      {canPrev && (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<ArrowIcon />}
          onClick={prevPage}
        >
          prev
        </Button>
      )}
    </Grid>

    <Grid item xs={4}>
      {canNext && (
        <Button
          fullWidth
          variant="outlined"
          endIcon={<ArrowIcon transform="rotate(180deg)" />}
          onClick={nextPage}
        >
          next
        </Button>
      )}
    </Grid>
  </Grid>
);

export default PaginationButtons;
