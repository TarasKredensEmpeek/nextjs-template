import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(
  {
    loadingSvg: {
      animation: '$spin 2s linear infinite',
    },

    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
  },
  { name: 'MuiLoadingSpinner' },
);

const Loading = ({ width = 24, height = 24, color = 'currentColor' }) => {
  const classes = useStyles();
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={classes.loadingSvg}
    >
      <g clipPath="url(#clip0_64_17874)">
        <path
          d="M21.0032 12.0002H18.002"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.99609 12.0002H5.99734"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9983 2.99609V5.99734"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9983 21.0042V18.0029"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.366 18.367L16.2441 16.2451"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.63281 5.63379L7.7547 7.75567"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2441 7.75567L18.366 5.63379"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.7547 16.2451L5.63281 18.367"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <clipPath id="clip0_64_17874">
          <rect width={width} height={height} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Loading;
