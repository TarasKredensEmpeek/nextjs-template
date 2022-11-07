export interface AuthLoginData {
  email: string;
  password: string;
}

export interface AuthRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  acceptAgreements: boolean;
  subscribeToNotifications: boolean;
}
