const express = require("express");
import * as productController from "./productsController";

export const productRouter = express.Router();

//@desc: get all products / filtered products
//@route: GET /products
//@route: GET /products + catetory / minPrice / maxPrice
productRouter.get("/products", productController.getProducts);

//@desc: get a product details
//@route: GET /products/:productId
productRouter.get("/products/:productId", productController.getProductById);

export default productRouter;
