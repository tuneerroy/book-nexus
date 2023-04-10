const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String},
  authors: [{type: String}],
  books: [{type: String}],
})

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  return next()
})

userSchema.statics.checkPassword = async function(email, password) {
  const user = await this.findOne({email})
  return user && user.password && await bcrypt.compare(password, user.password)
}

userSchema.statics.getOrCreate = async function(email) {
  const user = await this.findOne({email})
  if (!user) {
    user = await this.create({email})
    user.save()
  }
  return user
}

module.exports = mongoose.model('User', userSchema)
