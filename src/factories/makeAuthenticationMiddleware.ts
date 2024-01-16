import { AuthenticationMiddleware } from '../application/middlewares/AuthenticationMiddleware';

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}
