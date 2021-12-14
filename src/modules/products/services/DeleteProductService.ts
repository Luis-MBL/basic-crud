import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IGetProductDTO } from '../dtos/IProductDTO';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({ product_id }: IGetProductDTO): Promise<Product> {
    const getProduct = await this.productRepository.get({
      product_id,
    });

    if (!getProduct) throw new AppError('Product not found', 404);

    await this.productRepository.delete({ product_id });

    return getProduct;
  }
}
