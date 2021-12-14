import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IGetProductDTO, IUpdateProductDTO } from '../dtos/IProductDTO';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(
    { product_id }: IGetProductDTO,
    data: IUpdateProductDTO
  ): Promise<Product> {
    const { name } = data;

    if (name) {
      const { products: productNameExists } = await this.productRepository.list(
        { name }
      );
      if (
        productNameExists &&
        productNameExists.length &&
        productNameExists.some((product) => product.product_id !== product_id)
      ) {
        throw new AppError('Already exists a product with this name', 403);
      }
    }

    const getProduct = await this.productRepository.get({ product_id });

    if (!getProduct) throw new AppError('Product not found', 404);

    const product = await this.productRepository.update(getProduct, data);

    return product;
  }
}
