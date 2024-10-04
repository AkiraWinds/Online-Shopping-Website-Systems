import { Request, Response } from "express";
import { ProductModel } from "./productModel";

const productModel = new ProductModel("products.json");

export const getProducts = async (req: Request, res: Response) => {
  // extract params from request
  const category = req.query.category as string;
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

  try {
    const products = await productModel.getProducts(
      category,
      minPrice,
      maxPrice
    );
    res.json(products);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

//get product by Id
export const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await productModel.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
