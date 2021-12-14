import AppError from '@shared/errors/AppError';
import ProductRepositoryInMemory from '../repositories/in-memory/ProductRepositoryInMemory';
import UpdateProductService from './UpdateProductService';

let updateCateoryService: UpdateProductService;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('UpdateProduct', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    updateCateoryService = new UpdateProductService(productRepositoryInMemory);
  });

  it('Should update product name', async () => {
    const { product_id, name: oldName } =
      await productRepositoryInMemory.create({
        name: 'Product 01',
        description: 'Description..',
        quantity: 1,
        is_active: true,
      });

    const updateProduct = await updateCateoryService.execute(
      { product_id: product_id },
      {
        name: 'Product 01 (edit)',
      }
    );

    expect(updateProduct.name).not.toEqual(oldName);
  });

  it('Should throw an error if not find product before update', async () => {
    await expect(
      updateCateoryService.execute(
        {
          product_id: 'product_not_exists',
        },
        {
          name: 'Product (edit)',
        }
      )
    ).rejects.toEqual(new AppError('Product not found', 404));
  });
  it('Should throw an error if find other product with a new name', async () => {
    await productRepositoryInMemory.create({
      name: 'Product 01',
      description: 'Description..',
      quantity: 1,
      is_active: true,
    });
    const product = await productRepositoryInMemory.create({
      name: 'Product 02',
      description: 'Description..',
      quantity: 1,
      is_active: true,
    });
    await expect(
      updateCateoryService.execute(
        {
          product_id: product.product_id,
        },
        {
          name: 'Product 01',
        }
      )
    ).rejects.toEqual(
      new AppError('Already exists a product with this name', 403)
    );
  });
});
