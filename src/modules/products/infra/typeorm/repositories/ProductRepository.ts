import { getRepository, Repository } from 'typeorm';

import {
  ICreateProductDTO,
  IGetProductDTO,
  IListProductDTO,
  IUpdateProductDTO,
} from '@modules/products/dtos/IProductDTO';
import IProductRepository from '@modules/products/repositories/IProductRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async list(
    params: IListProductDTO
  ): Promise<{ products: Product[]; quantity: number }> {
    const getSQL = {
      is_active: `is_active = :is_active`,
      name: `name ILIKE CONCAT('%',:name::VARCHAR, '%')`,
      price_gt: `price >= :price_gt`,
      price_lt: `price <= :price_lt`,
      quantity_gt: `quantity >= :quantity_gt`,
      quantity_lt: `quantity <= :quantity_lt`,
      search: `(name ILIKE CONCAT('%',:search::VARCHAR, '%') OR description ILIKE CONCAT('%',:search::VARCHAR, '%'))`,
    };

    const { limit, offset, ...filters } = params;

    const query = this.ormRepository.createQueryBuilder();

    Object.keys(filters).forEach((column) => {
      query.andWhere(getSQL[column], { [column]: filters[column] });
    });

    if (limit) {
      query.limit(limit);
    }
    if (offset) {
      query.offset(offset);
    }
    const [products, quantity] = await query.getManyAndCount();

    return { products, quantity };
  }

  public async update(
    product: Product,
    data: IUpdateProductDTO
  ): Promise<Product> {
    const newProduct = this.ormRepository.merge(product, data);

    await this.ormRepository.save(newProduct);

    return newProduct;
  }

  public async delete({ product_id }: IGetProductDTO): Promise<void> {
    await this.ormRepository.softDelete({ product_id });
  }

  public async get({
    product_id,
  }: IGetProductDTO): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ product_id });

    return product;
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    return this.ormRepository.save(product);
  }
}
