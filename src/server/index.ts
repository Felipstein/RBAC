import express from 'express';

import { makeSignUpController, makeSignInController, makeListLeadsController, makeAuthenticationMiddleware } from '../factories';

import { routeAdapter } from './adapters/routeAdapter';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { makeAuthorizationMiddleware } from '../factories/makeAuthorizationMiddleware';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.get('/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['leads:read'])),
  routeAdapter(makeListLeadsController()),
);

app.post('/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['leads:write'])),
  async (req, res) => {
    res.status(201).json({ created: true });
  }
);

app.listen(3001, () => console.log('Server started at http://localhost:3001'));
