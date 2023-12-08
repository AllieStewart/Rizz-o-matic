// Start of JS file
// Config file for connecting to MongoDB
mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/test');
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Mongo URI: ', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose.connection;
// End of JS file