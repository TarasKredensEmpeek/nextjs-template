const apiUrls = {
  auth: {
    login: '/auth/logIn',
    logout: '/auth/logOut',
    refreshToken: '/auth/refresh',
    registration: '/auth/register',
    forgotPassword: '/auth/forgotPassword',
    resetPassword: '/auth/resetPassword',
  },

  account: {
    info: '/myAccountService/getUserInformation',
  },
};

export default apiUrls;
