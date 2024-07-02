const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

app.use(express.json({}));
app.use(cors());

const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.json({}));
app.use(cors());

dotenv.config();

app.use("/", chatRoutes);
app.use("/admin", adminRoutes);

const port = process.env.BACKEND_PORT || 7777;

app.listen(port, () => {
  console.log("Up and running!");
});
