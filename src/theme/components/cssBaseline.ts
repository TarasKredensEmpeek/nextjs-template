const styleOverrides = `
@font-face {
    font-family: 'StagSans-Medium';
    src: url('assets/fonts/StagSans-Medium.woff2') format('woff2'),
        url('assets/fonts/StagSans-Medium.woff') format('woff'),
        url('assets/fonts/StagSans-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'StagSans-Book';
    src: url('assets/fonts/StagSans-Regular.woff2') format('woff2'),
        url('assets/fonts/StagSans-Regular.woff') format('woff'),
        url('assets/fonts/StagSans-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'StagSans-Light';
    src: url('assets/fonts/StagSans-Light.woff2') format('woff2'),
        url('assets/fonts/StagSans-Light.woff') format('woff'),
        url('assets/fonts/StagSans-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'StagSans-SemiBold';
    src: url('assets/fonts/StagSans-SemiBold.woff2') format('woff2'),
        url('assets/fonts/StagSans-SemiBold.woff') format('woff'),
        url('assets/fonts/StagSans-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: 'StagSans-Bold';
    src: url('assets/fonts/StagSans-Bold.woff2') format('woff2'),
        url('assets/fonts/StagSans-Bold.woff') format('woff'),
        url('assets/fonts/StagSans-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}
`;

const cssBaseline = {
  styleOverrides,
};

export default cssBaseline;
