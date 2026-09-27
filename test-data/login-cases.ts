import { messages } from './messages';
import { users } from './users';

export const rejectedLoginCases = [
  { name: 'locked-out user', credentials: users.lockedOut, error: messages.login.lockedOut },
  { name: 'wrong password', credentials: users.wrongPassword, error: messages.login.invalidCredentials },
  { name: 'empty credentials', credentials: users.empty, error: messages.login.usernameRequired },
];
