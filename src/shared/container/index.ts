import { container } from 'tsyringe';

import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';
import IProductRepository from '@modules/products/repositories/IProductRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);
