const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(express.json({}));
app.use(cors({ origin: true }));

const { videBot } = require("../backend/models");
const db = require("../backend/models");

// create Main Model
const VideoBot = db.videoBot;

function extractDataValues(data) {
  return data.map((item) => item.dataValues);
}

function getRandomDescription(text, videoBots) {
  // Iterate through each videoBot object
  for (const bot of videoBots) {
    // Parse keywords and description from strings to arrays
    const keywords = JSON.parse(bot.keywords);
    const descriptions = JSON.parse(bot.description);

    // Check if the input text matches any of the keywords
    if (
      keywords.some((keyword) => keyword.toLowerCase() === text.toLowerCase())
    ) {
      // const indexFormula =
      const index = Math.floor(Math.random() * (descriptions.length - 1));

      // Select a random description
      const randomDescription = descriptions[index];

      return randomDescription;
    }
  }
  // If no match is found, return a default message or null
  return "I don't know. Can you ask another question? Thank you!";
}

app.post("/response", async (req, res) => {
  let { text } = req.body;

  let data = await VideoBot.findAll();

  // Extracted dataValues
  const extractedDataValues = extractDataValues(data);

  const randomDescription = getRandomDescription(text, extractedDataValues);

  return res.status(200).json({
    text: randomDescription,
  });
});

const XI_API_KEY = "sk_1d620d8ede21f3c17552b46530995aeb0c7d56f76445a141";

app.post("/api", (req, res) => {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/with-timestamps`;

  // const headers = {
  //   "Content-Type": "application/json",
  //   "xi-api-key": "sk_b303865a679031216ae5915c4323aa7f955a30e5fe297e80",
  //   "Access-Control-Allow-Origin": "*",
  // };

  axios
    .post(url, req.body, {
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": XI_API_KEY,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      res
        .status(error.response ? error.response.status : 500)
        .send(error.message);
    });
});

app.listen(7777, () => {
  console.log("Up and running!");
});
