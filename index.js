const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ===== HEALTH CHECK (QUAN TRỌNG CHO RENDER) =====
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ===== ROOT =====
app.get("/", (req, res) => {
  res.send("Backend Render Project 2 running");
});

// ===== API LẤY DANH SÁCH SINH VIÊN =====
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
