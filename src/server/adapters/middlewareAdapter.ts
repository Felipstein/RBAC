import { NextFunction, Request, Response } from 'express';

import { IMiddleware } from '../../application/interfaces/IMiddleware';

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      headers: request.headers as Record<string, string>,
      params: request.params,
      body: request.body,
      account: request.metadata?.account,
    });

    if('statusCode' in result) {
      const { statusCode, body } = result;

      return response.status(statusCode).json(body);
    }

    request.metadata = {
      ...request.metadata,
      ...result.data,
    };

    next();
  };
}
