// config/connection.js
process.env.MONGO_URI = 'put your mongoDB connection string here';
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Mongo URI: ', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // Removed useFindAndModify and useCreateIndex
    });
// mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/programming-thoughts');

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB(); // Call connectDB

// Export the connection object
module.exports = mongoose.connection;
