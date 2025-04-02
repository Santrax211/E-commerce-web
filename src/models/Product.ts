import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor proporciona un nombre de producto'],
    maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Por favor proporciona una descripción']
  },
  price: {
    type: Number,
    required: [true, 'Por favor proporciona un precio'],
    min: [0, 'El precio no puede ser negativo']
  },
  category: {
    type: String,
    required: [true, 'Por favor selecciona una categoría']
  },
  stock: {
    type: Number,
    required: [true, 'Por favor proporciona la cantidad en stock'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  images: [String],
  features: [String],
  specifications: {
    type: Map,
    of: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);