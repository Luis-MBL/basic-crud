import {
  ICreateProductDTO,
  IGetProductDTO,
  IListProductDTO,
  IUpdateProductDTO,
} from '@modules/products/dtos/IProductDTO';
import Product from '../../infra/typeorm/entities/Product';
import IProductRepository from '../IProductRepository';

export default class ProductRepositoryInMemory implements IProductRepository {
  products: Product[] = [];

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, data);

    this.products.push(product);

    return product;
  }

  async get(data: IGetProductDTO): Promise<Product> {
    return this.products.find(
      (product) => product.product_id === data.product_id && !product.deleted_at
    );
  }

  async list(
    data: IListProductDTO
  ): Promise<{ products: Product[]; quantity: number }> {
    const products = this.products.filter((product) => !product.deleted_at);

    return { products, quantity: products.length };
  }

  async delete({ product_id }: IGetProductDTO): Promise<void> {
    const getProduct = this.products.find(
      (productFind) =>
        productFind.product_id === product_id && !productFind.deleted_at
    );

    Object.assign(getProduct, { deleted_at: new Date() });

    return;
  }
  async update(product: Product, data: IUpdateProductDTO): Promise<Product> {
    const getProductIndex = this.products.findIndex(
      (productFind) =>
        productFind.product_id === product.product_id && !productFind.deleted_at
    );

    const updatedProduct = Object.assign(product, data);

    return updatedProduct;
  }
}
