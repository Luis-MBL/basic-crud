import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IUpdateStatusProductDTO } from '../dtos/IProductDTO';
import IProductRepository from '../repositories/IProductRepository';
import Product from '../infra/typeorm/entities/Product';

@injectable()
export default class UpdateStatusProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({
    product_id,
    is_active,
  }: IUpdateStatusProductDTO): Promise<Product> {
    const getProduct = await this.productRepository.get({
      product_id,
    });

    if (!getProduct) {
      throw new AppError(`Product not found`, 404);
    }
    const product = await this.productRepository.update(getProduct, {
      is_active,
    });

    return product;
  }
}
