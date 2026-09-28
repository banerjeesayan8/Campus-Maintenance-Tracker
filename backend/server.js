const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Campus Maintenance Tracker API is running",
  });
});

app.get("/api/complaints", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Fan not working",
      location: "Room 204",
      category: "Electrical",
      status: "Pending"
    },
    {
      id: 2,
      title: "Water leakage",
      location: "Block B",
      category: "Plumbing",
      status: "In Progress"
    }
  ]);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});