const express = require("express");
const app = express();
const fs = require("fs").promises;
const wordsRoute = require("./routes/words");
const rankRoute = require("./routes/rank");

app.use(express.json());

app.use("/server/words", wordsRoute);
app.use("/server/rank", rankRoute);

// Start the backend server
app.listen(8800, () => {
  console.log("Backend server is running");
});
