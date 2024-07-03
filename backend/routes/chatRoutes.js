const express = require("express");
const dotenv = require("dotenv");
const checkAuth = require("../middleware/check-auth");

dotenv.config();

const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/chat", checkAuth, async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!req.adminData.adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ data: text });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
