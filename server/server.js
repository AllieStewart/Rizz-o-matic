require('dotenv').config();
const express = require('express');
const { generateRizz } = require('./utils/openaiService');
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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
