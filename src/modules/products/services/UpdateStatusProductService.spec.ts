import AppError from '@shared/errors/AppError';
import ProductRepositoryInMemory from '../repositories/in-memory/ProductRepositoryInMemory';
import UpdateStatusProductService from './UpdateStatusProductService';

let updateStatusProductService: UpdateStatusProductService;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('UpdateStatusProduct', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    updateStatusProductService = new UpdateStatusProductService(
      productRepositoryInMemory
    );
  });

  it('Should update product status', async () => {
    const product = await productRepositoryInMemory.create({
      name: 'Product 01',
      description: 'Description..',
      quantity: 1,
      is_active: true,
    });

    const updateProduct = await updateStatusProductService.execute({
      product_id: product.product_id,
      is_active: false,
    });

    expect(updateProduct.is_active).toBe(false);
  });

  it('Should throw an error if not find product before update status', async () => {
    await expect(
      updateStatusProductService.execute({
        product_id: 'product_not_exists',
        is_active: false,
      })
    ).rejects.toEqual(new AppError(`Product not found`, 404));
  });
});
