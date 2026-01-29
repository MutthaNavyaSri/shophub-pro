import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['electronics', 'jewelery', "men's clothing", "women's clothing"],
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300',
    },
    rating: {
      rate: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
