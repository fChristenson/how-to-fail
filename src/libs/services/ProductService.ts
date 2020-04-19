interface IProduct {
  id: string;
  name: string;
  price: number;
}

const productDb: IProduct[] = [];

export class ProductService {
  /**
   * When the user is uploading product to the platform they can provide partial information.
   * This allows them to save a product in a unfinished state.
   */
  createDraftProduct(name?: string, price?: number): IProduct {
    return {
      id: Math.random().toString(),
      name: name || "",
      price: price || -1,
    };
  }

  /**
   * When the user wants to publish the product we validate the product.
   * If the product is "empty" we throw an error. We could also publish the "empty" product
   * if it is more important that we never cause an error.
   */
  publishProduct(id: string) {
    const product = productDb.find((p) => p.id === id);

    if (product.name.length > 1 && product.price > -1) return product;

    throw new Error("Product is not finished");
  }
}
