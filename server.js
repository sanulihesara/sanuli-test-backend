const express = require("express");
const cors = require("cors");
const aboutMeData = require("./data");

const app = express();
const PORT = 5002; //

app.use(cors());

app.get("/about", (req, res) => {
  res.json(aboutMeData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
