import authentication from '@shared/infra/middlewares/authentication';
import JoiCP from '@shared/utils/CelebratePatterns';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ProductController from '../controllers/ProductController';

import { invalidateCache, recoverCache } from '@shared/infra/middlewares/cache';

const productRouter = Router();
const productController = new ProductController();

productRouter.use(authentication);

productRouter.get('/all', recoverCache('All-PRODUCTS'), productController.list);

productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      quantity: Joi.number().integer().positive().allow(0).required(),
      is_active: Joi.boolean().default(true),
      price: Joi.number().positive().allow(0).precision(2),
      description: Joi.string(),
      info: Joi.object(),
    },
  }),
  invalidateCache('All-PRODUCTS'),
  productController.create
);

productRouter.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: JoiCP.uuid.required(),
    },
  }),
  productController.get
);

productRouter.delete(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: JoiCP.uuid.required(),
    },
  }),
  invalidateCache('All-PRODUCTS'),
  productController.delete
);

productRouter.put(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: JoiCP.uuid.required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      quantity: Joi.number().integer().positive().allow(0),
      is_active: Joi.boolean(),
      price: Joi.number().positive().allow(0).precision(2),
      description: Joi.string(),
      info: Joi.object(),
    },
  }),
  invalidateCache('All-PRODUCTS'),
  productController.update
);

productRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      search: Joi.string(),
      is_active: Joi.boolean(),
      quantity_lt: Joi.number().integer().positive().allow(0),
      quantity_gt: Joi.number().integer().positive().allow(0),
      price_lt: Joi.number().positive().allow(0).precision(2),
      price_gt: Joi.number().positive().allow(0).precision(2),
      limit: JoiCP.limit,
      offset: JoiCP.offset,
    },
  }),
  productController.list
);

productRouter.patch(
  '/:product_id/active',
  celebrate({
    [Segments.PARAMS]: {
      product_id: JoiCP.uuid.required(),
    },
    [Segments.BODY]: {
      is_active: Joi.boolean().required(),
    },
  }),
  invalidateCache('All-PRODUCTS'),
  productController.updateStatus
);

export default productRouter;
