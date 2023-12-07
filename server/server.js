require('dotenv').config();
const express = require('express');
const { generateRizz } = require('./utils/openaiService');
<<<<<<< Updated upstream
=======
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
>>>>>>> Stashed changes
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/generate-quote', async (req, res) => {
  try {
    const rizz = await generateRizz();
    console.log('Generated Rizz:', rizz);
    res.json({ quote: rizz });
  } catch (error) {
    console.error('Error in /generate-quote route:', error);
    res.status(500).send(error.message);  
  }
});

<<<<<<< Updated upstream
=======
app.get('/generate-quote', async (req, res) => {
  try {
    const rizz = await generateRizz();
    console.log('Generated Rizz:', rizz);
    res.json({ quote: rizz });
  } catch (error) {
    console.error('Error in /generate-quote route:', error);
    res.status(500).send(error.message);  
  }
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
>>>>>>> Stashed changes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
