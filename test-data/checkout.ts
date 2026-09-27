import { messages } from './messages';

export type CustomerInfo = { firstName: string; lastName: string; postalCode: string };

export const customer: CustomerInfo = {
  firstName: 'Alex',
  lastName: 'Tester',
  postalCode: '00100',
};

export const missingFieldCases = [
  { field: 'first name', info: { ...customer, firstName: '' }, error: messages.checkout.firstNameRequired },
  { field: 'last name', info: { ...customer, lastName: '' }, error: messages.checkout.lastNameRequired },
  { field: 'postal code', info: { ...customer, postalCode: '' }, error: messages.checkout.postalCodeRequired },
];
