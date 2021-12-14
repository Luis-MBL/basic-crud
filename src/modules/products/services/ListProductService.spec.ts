import ProductRepositoryInMemory from '../repositories/in-memory/ProductRepositoryInMemory';
import ListProductService from './ListProductService';

let listProductsService: ListProductService;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('ListProduct', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    listProductsService = new ListProductService(productRepositoryInMemory);
  });

  it('Should list all products', async () => {
    await productRepositoryInMemory.create({
      name: 'Product 01',
      description: 'Description..',
      quantity: 1,
      is_active: true,
    });

    const { products } = await listProductsService.execute({});

    expect(products).toHaveLength(1);
  });
});
