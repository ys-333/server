const bcrypt = require('bcrypt')
const { urlencoded } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const user = await new User({
      firstName,
      lastName,
      email,
      password,
    })
    const response = await user.save()

    res.status(200).json({ status: 'Ok' })
  } catch (err) {
    res.status(400).json({ status: 'error', message: 'Email already exist' })
  }
}
const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email: email, password: password })
    console.log(user)
    if (user) {
      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        'secret123',
      )
      return res.json({ status: 'Ok', token: token, user: user })
    } else {
      return res.json({ status: 'error', user: false })
    }
  } catch (err) {}
}

module.exports = { register, login }
