"use strict";
exports.__esModule = true;
exports.productRouter = void 0;
var express = require('express');
var productController = require("./productsController");
exports.productRouter = express.Router();
exports.productRouter.get('/products', productController.getProducts);
exports.productRouter.get('/products/:productId', productController.getProductById);
exports["default"] = exports.productRouter;
