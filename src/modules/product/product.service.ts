import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Product from './product.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IProductDoc, NewProduct, UpdateProductBody } from './product.interfaces';

export const createProduct = async (productBody: NewProduct): Promise<IProductDoc> => {
  return Product.create(productBody);
};

export const queryProducts = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const products = await Product.paginate(filter, options);
  return products;
};

export const getProductById = async (id: mongoose.Types.ObjectId): Promise<IProductDoc | null> => Product.findById(id);

export const updateProductById = async (
  productId: mongoose.Types.ObjectId,
  updateBody: UpdateProductBody
): Promise<IProductDoc | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

export const deleteProductById = async (productId: mongoose.Types.ObjectId): Promise<IProductDoc | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

export const searchProduct = async (query: string): Promise<IProductDoc[]> => {
  if (!query || typeof query !== 'string') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid search query');
  }
  // Perform a case-insensitive search for the query in the product name or description
  const products = await Product.find({
    $or: [
      { name: { $regex: query, $options: 'i' } }, // Search by name (case-insensitive)
      { description: { $regex: query, $options: 'i' } } // Search by description (case-insensitive)
    ]
  });
  // If no products are found, throw an ApiError
  if (products.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No products found');
  }
  // Return the list of found products
  return products;
};