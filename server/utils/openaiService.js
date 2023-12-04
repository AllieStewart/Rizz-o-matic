const { OpenAI } = require('openai');

process.env.MONGO_URI = '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';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Give me a witty pick up line" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
