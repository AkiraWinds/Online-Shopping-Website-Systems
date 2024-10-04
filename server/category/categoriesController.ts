// controllers/categoryController.ts

import { Request, Response } from 'express';
import { CategoriesData } from './categoryModel';

const categoriesData: CategoriesData = require('../categories.json');

export const getAllCategories = (req: Request, res: Response): void => {
  res.json(categoriesData.filters);
};
