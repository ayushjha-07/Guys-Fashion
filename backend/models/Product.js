// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  comparePrice: {
    type: Number,
    min: [0, 'Compare price cannot be negative']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  subcategory: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  images: [{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    alt: String
  }],
  variants: [{
    size: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    price: Number
  }],
  features: [String],
  specifications: {
    material: String,
    care: String,
    fit: String,
    weight: String,
    dimensions: String
  },
  tags: [String],
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  meta: {
    views: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ price: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ 'variants.size': 1 });
productSchema.index({ 'variants.color': 1 });
productSchema.index({ name: 'text', description: 'text' });

// Virtual for in-stock status
productSchema.virtual('inStock').get(function() {
  return this.variants.some(variant => variant.stock > 0);
});

// Method to check stock for specific variant
productSchema.methods.checkStock = function(size, color) {
  const variant = this.variants.find(v => 
    v.size === size && v.color === color
  );
  return variant ? variant.stock : 0;
};

// Method to update stock
productSchema.methods.updateStock = function(size, color, quantity) {
  const variant = this.variants.find(v => 
    v.size === size && v.color === color
  );
  
  if (variant) {
    if (variant.stock + quantity < 0) {
      throw new Error('Insufficient stock');
    }
    variant.stock += quantity;
  }
};

module.exports = mongoose.model('Product', productSchema);