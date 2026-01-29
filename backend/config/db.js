import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(`\n⚠️  Make sure MongoDB is installed and running!`);
    console.error(`   Download: https://www.mongodb.com/try/download/community`);
    console.error(`   Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas\n`);
    process.exit(1);
  }
};

export default connectDB;
