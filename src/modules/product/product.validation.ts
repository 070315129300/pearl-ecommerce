import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { NewProduct } from './product.interfaces';

const createProductBody: Record<keyof NewProduct, any> = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
  category: Joi.string().required(),
  storeId: Joi.string().custom(objectId).required(),
  imageUrl: Joi.string().uri().required(),
  stock: Joi.number().integer().min(0).required(),
};

export const createProduct = {
  body: Joi.object().keys(createProductBody),
};

export const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    category: Joi.string(),
    storeId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

export const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number().min(0),
      category: Joi.string(),
      imageUrl: Joi.string().uri(),
      stock: Joi.number().integer().min(0),
    })
    .min(1),
};

export const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};