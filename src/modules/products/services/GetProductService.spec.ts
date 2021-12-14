import AppError from '@shared/errors/AppError';
import ProductRepositoryInMemory from '../repositories/in-memory/ProductRepositoryInMemory';
import GetProductService from './GetProductService';

let getProductService: GetProductService;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('GetProduct', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    getProductService = new GetProductService(productRepositoryInMemory);
  });

  it('Should be able to get one product', async () => {
    const product = await productRepositoryInMemory.create({
      name: 'Product 01',
      description: 'Description..',
      quantity: 1,
      is_active: true,
    });

    const getProduct = await getProductService.execute({
      product_id: product.product_id,
    });

    expect(getProduct).toEqual(product);
  });

  it('Should throw an error when product not exists', async () => {
    await expect(
      getProductService.execute({
        product_id: 'product_not_exists',
      })
    ).rejects.toEqual(new AppError('Product not found', 404));
  });
});
