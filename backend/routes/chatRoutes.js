const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// const { OpenAI } = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo-16k",
    //   messages: [
    //     {
    //       role: "assistant",
    //       content: prompt,
    //     },
    //   ],
    //   temperature: 1,
    //   max_tokens: 256,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    // });

    // const prompt = "Write a story about a AI and magic";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    return res.status(200).json({ data: text });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
