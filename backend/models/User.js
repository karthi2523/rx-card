const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for users
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

// Pre-save middleware to hash the password before saving it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Define the user model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
