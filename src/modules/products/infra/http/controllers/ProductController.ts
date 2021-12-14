import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import GetProductService from '@modules/products/services/GetProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ListProductService from '@modules/products/services/ListProductService';
import UpdateStatusProductService from '@modules/products/services/UpdateStatusProductService';

import RedisCache from '@shared/cache/RedisCache';

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute(data);

    return response.status(201).json(product);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const getProduct = container.resolve(GetProductService);
    const product = await getProduct.execute({
      product_id,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);
    const product = await deleteProduct.execute({ product_id });

    return response.json({
      message: `Product ${product.product_id} deleted`,
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const data = request.body;

    const updateProduct = container.resolve(UpdateProductService);
    const product = await updateProduct.execute({ product_id }, data);

    return response.json(product);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const params = request.query;

    const listProducts = container.resolve(ListProductService);
    const products = await listProducts.execute(params);

    await RedisCache.save(`All-PRODUCTS`, products);

    return response.json(products);
  }

  async updateStatus(request: Request, response: Response): Promise<Response> {
    const { is_active } = request.body;
    const { product_id } = request.params;

    const updateProduct = container.resolve(UpdateStatusProductService);
    const product = await updateProduct.execute({
      product_id,
      is_active,
    });

    return response.json(product);
  }
}
