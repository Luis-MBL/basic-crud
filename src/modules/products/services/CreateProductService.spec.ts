import ProductRepositoryInMemory from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import CreateProductService from './CreateProductService';

let createProductService: CreateProductService;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('CreateProduct', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    createProductService = new CreateProductService(productRepositoryInMemory);
  });

  it('Should be able to create a new product', async () => {
    const product = await createProductService.execute({
      name: 'Product 01',
      description: 'Description..',
      quantity: 1,
      is_active: true,
    });

    expect(product).toHaveProperty('product_id');
  });

  it('Should not be able to create a product with already used name', async () => {
    await createProductService.execute({
      name: 'Product 01',
      description: 'Description..',
      quantity: 1,
      is_active: true,
    });

    await expect(
      createProductService.execute({
        name: 'Product 01',
        description: 'Description..',
        quantity: 1,
        is_active: true,
      })
    ).rejects.toEqual(new AppError('This product already exists', 404));
  });
});
