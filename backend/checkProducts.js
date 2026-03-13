const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gk-fashion')
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    
    const categories = await Category.find();
    console.log('📂 Categories:');
    categories.forEach(cat => console.log(`  - ${cat.name} (ID: ${cat._id})`));
    
    const products = await Product.find().populate('category');
    console.log(`\n📦 Total Products: ${products.length}\n`);
    
    const womenProducts = products.filter(p => p.category.name.toLowerCase() === 'women');
    const menProducts = products.filter(p => p.category.name.toLowerCase() === 'men');
    
    console.log(`👗 Women's Products (${womenProducts.length}):`);
    womenProducts.forEach(p => console.log(`  - ${p.name} ($${p.price})`));
    
    console.log(`\n👔 Men's Products (${menProducts.length}):`);
    menProducts.forEach(p => console.log(`  - ${p.name} ($${p.price})`));
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
