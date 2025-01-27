const express = require("express");
const cors = require("cors");
const aboutMeData = require("./data");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors()); // 1. Enable Cross-Origin Resource Sharing
app.use(express.json()); // 2. Parse JSON request bodies
app.use(morgan("dev")); // 3. Log HTTP requests in the console

// Routes
// 4. Add a Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the About Me API! Navigate to /about for details.");
});

// 5. About Route (unchanged functionality)
app.get("/about", (req, res) => {
  res.json(aboutMeData);
});

// 6. Add a new Route to return a list of skills
app.get("/skills", (req, res) => {
  const skills = ["JavaScript", "React", "Node.js", "Express", "MongoDB"];
  res.json({ skills });
});

// 7. Add a new Route to handle query parameters for filtering skills
app.get("/filter-skills", (req, res) => {
  const { skill } = req.query;
  const skills = ["JavaScript", "React", "Node.js", "Express", "MongoDB"];
  if (skill) {
    const filteredSkills = skills.filter((s) =>
      s.toLowerCase().includes(skill.toLowerCase())
    );
    res.json({ filteredSkills });
  } else {
    res.json({ skills });
  }
});

// 8. Add a POST route to handle adding data (mock handling)
app.post("/about", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res.status(400).json({ error: "Name and bio are required" });
  }
  // Simulating adding data to the aboutMeData array
  res.status(201).json({ message: "Data received", data: { name, bio } });
});

// 9. Add a Middleware for 404 Errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// 10. Add Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
