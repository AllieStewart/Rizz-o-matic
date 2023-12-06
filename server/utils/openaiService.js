// Generate rizz function, only returns the quote

const { OpenAI } = require('openai');

process.env.OPENAI_API_KEY = 'put API key here';
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateRizz() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Give me a really witty pick up line" }],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error in generating Rizz:', error);
    throw error; 
  }
}

generateRizz().then(quote => console.log(quote));
