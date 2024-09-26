// src/controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, countInStock } = req.body;

  const product = new Product({ name, description, price, countInStock });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};
