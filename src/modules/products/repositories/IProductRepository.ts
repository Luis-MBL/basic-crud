import {
  ICreateProductDTO,
  IGetProductDTO,
  IListProductDTO,
  IUpdateProductDTO,
} from '../dtos/IProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  get(data: IGetProductDTO): Promise<Product>;
  delete(data: IGetProductDTO): Promise<void>;
  update(product: Product, data: IUpdateProductDTO): Promise<Product>;
  list(
    params: IListProductDTO
  ): Promise<{ products: Product[]; quantity: number }>;
}
