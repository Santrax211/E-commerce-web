import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor proporciona un nombre'],
    maxlength: [60, 'El nombre no puede tener más de 60 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Por favor proporciona un email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Por favor ingresa un email válido'
    }
  },
  password: {
    type: String,
    required: [true, 'Por favor proporciona una contraseña'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);