export interface AccountAddress {
  holderFirstName: string;
  holderLastName: string;
  address: string;
  address2: string;
  city: string;
  zipCode: string;
  nickName: string;
  countryName: string;
  countryId: number;
  stateId: number;
  stateName: string;
  primaryPhone: string;
  primaryPhoneCountryCode: string;
  mobilePhone: string;
  mobilePhoneCountryCode: string;
}

export interface AccountInfo {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  captchaResponse: string;
  primaryPhone: string;
  primaryPhoneCountryCode: string;
  mobilePhone: string;
  mobilePhoneCountryCode: string;
  sameBillingAndShipping: false;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  billingInformation: AccountAddress;
  shippingInformation: AccountAddress;
}
