import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Find or create a default user for the products
    let defaultUser = await User.findOne({ email: 'admin@fakestore.com' });
    
    if (!defaultUser) {
      defaultUser = await User.create({
        username: 'admin',
        email: 'admin@fakestore.com',
        password: 'admin123',
        firstname: 'Admin',
        lastname: 'User',
      });
      console.log('Default admin user created');
    }

    // Fetch products from Fakestore API
    console.log('Fetching products from Fakestore API...');
    const response = await fetch('https://fakestoreapi.com/products');
    const fakestoreProducts = await response.json();

    // Clear existing products (optional - remove this line if you want to keep existing products)
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Transform and insert products
    const productsToInsert = fakestoreProducts.map(product => ({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rating?.rate || 0,
        count: product.rating?.count || 0,
      },
      createdBy: defaultUser._id,
    }));

    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`✅ Successfully seeded ${insertedProducts.length} products!`);

    console.log('\n📦 Products by category:');
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    categories.forEach(cat => {
      console.log(`  - ${cat._id}: ${cat.count} products`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedProducts();
