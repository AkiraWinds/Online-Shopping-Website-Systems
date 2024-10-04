"use strict";
exports.__esModule = true;
exports.categoryRouter = void 0;
// routes/category.ts
var express = require('express');
//import { Router } from 'express';
var categoryController = require("./categoriesController");
exports.categoryRouter = express.Router();
// get category route
exports.categoryRouter.get('/products/categories', categoryController.getAllCategories);
exports["default"] = exports.categoryRouter;
