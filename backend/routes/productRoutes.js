import express from 'express';
import { body } from 'express-validator';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
  getCategories,
  getProductsByCategory,
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/products/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', getProductsByCategory);

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', getAllProducts);

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   POST /api/products
// @desc    Create a new product
// @access  Private
router.post(
  '/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Product title is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').trim().notEmpty().withMessage('Category is required'),
  ],
  createProduct
);

// @route   PUT /api/products/:id
// @desc    Update product (full update)
// @access  Private
router.put(
  '/:id',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Product title is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').trim().notEmpty().withMessage('Category is required'),
  ],
  updateProduct
);

// @route   PATCH /api/products/:id
// @desc    Update product (partial update)
// @access  Private
router.patch('/:id', protect, patchProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', protect, deleteProduct);

export default router;
