import mongoose, { Schema, model } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IProductDoc, IProductModel } from './product.interfaces';

const productSchema = new Schema<IProductDoc>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
     // enum: Object.values(subcategory),
      required: true,
    },
    subsubcategory: {
      type: String,
      //enum: Object.values(subsubcategory),
      required: true,
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    likes: [],
  },
  {
    timestamps: true,
  }
);


// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = model<IProductDoc, IProductModel>('Product', productSchema);

export default Product;