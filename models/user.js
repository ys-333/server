const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email Exist'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    unique: false,
  },
  firstName: {
    type: String,
    required: [true, 'Please Provide a first name!'],
    unique: false,
  },
  lastName: {
    type: String,
    required: [true, 'Please Provide a last name!'],
    unique: false,
  },
})

module.exports = mongoose.model.Users || mongoose.model('Users', UserSchema)
