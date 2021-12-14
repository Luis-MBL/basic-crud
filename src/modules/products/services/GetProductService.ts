import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IGetProductDTO } from '../dtos/IProductDTO';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class GetProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(data: IGetProductDTO): Promise<Product> {
    const product = await this.productRepository.get(data);

    if (!product) throw new AppError('Product not found', 404);

    return product;
  }
}
