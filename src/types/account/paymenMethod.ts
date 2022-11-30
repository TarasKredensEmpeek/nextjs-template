export interface PaymentMethod {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  extendedAddress?: string | null;
  mobile: string;
  phoneCountryCode: string;
  phone: string;
  mobileCountryCode: string;
  countryId: number;
  stateId: number;
  creditCardNumber: string;
  expirationDateMonth: number;
  expirationDateYear: number;
  isDefaultForExpressCheckout: boolean;
  nonceToken: string;
  selectedCardType: string;
  city: string;
  zipCode: string;
}
