import { AuthorizationMiddleware } from '../application/middlewares/AuthorizationMiddleware';

export function makeAuthorizationMiddleware(...allowedRoles: string[]) {
  return new AuthorizationMiddleware(allowedRoles);
}
