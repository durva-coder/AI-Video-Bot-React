const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json({}));
app.use(cors());

const arr = [
  "hello",
  "hey",
  "hey there",
  "hello there",
  "hi there",
  "hi",
  "howdy",
];

app.post("/response", (req, res) => {
  let { text } = req.body;

  console.log("text", text);

  let responseText;

  if (arr.includes(text.toLowerCase().trim())) {
    responseText = "Hey there! How can I help you today?";
  } else {
    responseText = "I don't know. Can you ask another question? Thank you!";
  }
  return res.status(200).json({
    text: responseText,
  });
});

app.listen(7777, () => {
  console.log("Up and running!");
});
