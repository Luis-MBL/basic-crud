import { inject, injectable } from 'tsyringe';
import { IListProductDTO } from '../dtos/IProductDTO';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(
    params: IListProductDTO
  ): Promise<{ products: Product[]; quantity: number }> {
    const products = await this.productRepository.list(params);

    return products;
  }
}
