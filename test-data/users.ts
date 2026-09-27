export type Credentials = { username: string; password: string };

// Public demo credentials, shown on the SauceDemo login page.
const PASSWORD = 'secret_sauce';

export const users = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  wrongPassword: { username: 'standard_user', password: 'not_the_password' },
  empty: { username: '', password: '' },
} satisfies Record<string, Credentials>;
