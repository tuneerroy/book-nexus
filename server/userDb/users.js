const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  authors: [{ type: String }],
  books: [{ type: String }]
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    await this.save();
  }
  return next();
});

userSchema.statics.createAccount = async function(username, password) {
  const User = this;
  const user = new User({ username, password });
  await user.save();
  return user;
};

module.exports = mongoose.model('User', userSchema);