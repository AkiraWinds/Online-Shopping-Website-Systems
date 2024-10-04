import { ModelManager } from "./model-manager";

export interface Product {
  productId: string; // Ensure there's an `id` field to satisfy the ModelManager's requirements
  productName: string;
  price: number;
  currency: string;
  category: string;
  sizes: string[];
  image: string;
  description: string;
  url: string;
}

export class ProductModel {
  private modelManager: ModelManager<Product, string>;

  constructor(filePath: string) {
    this.modelManager = new ModelManager<Product, string>(filePath);
  }

  // Asynchronously get all products or filter by category/price
  async getProducts(
    category?: string,
    minPrice?: number,
    maxPrice?: number
  ): Promise<Product[]> {
    let filteredProducts = await this.modelManager.getAll();

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    return filteredProducts;
  }
  //get products by Id
  async getProductById(productId: string): Promise<Product | undefined> {
    const products = await this.modelManager.getAll();
    return products.find((product) => product.productId === productId);
  }
}
