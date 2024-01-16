import { JwtPayload, verify } from 'jsonwebtoken';

import { IData, IMiddleware, IResponse } from '../interfaces/IMiddleware';
import { env } from '../config/env';
import { IRequest } from '../interfaces/IRequest';

export class AuthenticationMiddleware implements IMiddleware {

  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if(!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }

    try {
      const [type, token] = authorization.split(' ');

      if(type !== 'Bearer') {
        throw new Error();
      }

      const payload = verify(token, env.jwtSecret) as JwtPayload;

      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role
          }
        }
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token.',
        }
      };
    }

  }

}
