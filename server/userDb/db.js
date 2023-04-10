const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
})

const db = mongoose.connection
db.on('connected', () => {
  console.log('Connected to MongoDB!')
})
db.on('error', (err) => {
    console.log(err)
})

module.exports = db
