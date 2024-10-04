
// routes/category.ts
const express = require('express');
//import { Router } from 'express';
import * as categoryController from './categoriesController';

export const categoryRouter = express.Router();
// get category route
categoryRouter.get('/products/categories', categoryController.getAllCategories);

export default categoryRouter;
