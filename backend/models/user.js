const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Products = require('../models/products');

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required:true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    tokens : [{
      token: {
        type: String,
        required: true
      }
    }]
}, {
  timestamps: true
});


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({id: user._id }, process.env.jwt_key);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email: email});

  if(!user){
    throw new Error('Wrong email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    throw new Error('Wrong email or password');
  }

  return user;
};

userSchema.pre('save', async function(next) {
  var user = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre('remove', async function(next) {
    const user= this;

    const products = await Products.deleteMany({
      owner: user._id
    });

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
