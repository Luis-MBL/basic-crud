import AppError from '@shared/errors/AppError';
import ProductRepositoryInMemory from '../repositories/in-memory/ProductRepositoryInMemory';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';
import GetProductService from './GetProductService';

let deleteProductService: DeleteProductService;
let createProductService: CreateProductService;
let getProductService: GetProductService;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('DeleteProduct', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    deleteProductService = new DeleteProductService(productRepositoryInMemory);
    createProductService = new CreateProductService(productRepositoryInMemory);
    getProductService = new GetProductService(productRepositoryInMemory);
  });

  it('Should be able to delete a product', async () => {
    const { product_id } = await createProductService.execute({
      name: 'Product 01',
      description: 'Description..',
      quantity: 1,
      is_active: true,
    });
    await deleteProductService.execute({
      product_id,
    });

    await expect(
      getProductService.execute({
        product_id,
      })
    ).rejects.toEqual(new AppError('Product not found', 404));
  });

  it('Shloud throw an error if not find product before delete', async () => {
    await expect(
      deleteProductService.execute({
        product_id: 'product_not_exists',
      })
    ).rejects.toEqual(new AppError('Product not found', 404));
  });
});
