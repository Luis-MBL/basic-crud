import { Request, Response, Router } from 'express';

import productRouter from '@modules/products/infra/http/routes/product.routes';

import StatusController from '@shared/controller/StatusController';

const routes = Router();

routes.use('/products', productRouter);

routes.get('/status', StatusController.status);
routes.get('/ready', StatusController.ready);
routes.post('/session', StatusController.fakeAuth);

routes.get('/', (request: Request, response: Response) => {
  response.json({
    version: '1.0',
  });
});

export default routes;
