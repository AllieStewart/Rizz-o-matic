// Start of JS file
// Connects to MongoDB database.
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/programming-thoughts');

module.exports = mongoose.connection;
// End of JS file