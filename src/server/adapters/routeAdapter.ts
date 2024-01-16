import { Request, Response } from 'express';
import { IController } from '../../application/interfaces/IController';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      headers: request.headers as Record<string, string>,
      params: request.params,
      body: request.body,
      account: request.metadata?.account,
    });

    return response.status(statusCode).json(body);
  };
}
