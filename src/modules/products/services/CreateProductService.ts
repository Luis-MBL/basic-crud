import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { ICreateProductDTO } from '../dtos/IProductDTO';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(data: ICreateProductDTO): Promise<Product> {
    const { name } = data;
    const {
      products: [productExists],
    } = await this.productRepository.list({
      name,
    });

    if (productExists) {
      throw new AppError('This product already exists', 404);
    }
    return this.productRepository.create(data);
  }
}
