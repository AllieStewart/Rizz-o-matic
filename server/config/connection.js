// config/connection.js
process.env.MONGO_URI = 'mongodb+srv://root:root123@cluster0.guvmddf.mongodb.net/?retryWrites=true&w=majority';
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

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB(); // Call connectDB

// Export the connection object
module.exports = mongoose.connection;
