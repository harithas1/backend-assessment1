const express = require("express");
const { Client } = require("pg");

const app = express();

app.use(express.json());

const client = new Client({
  user: "jtd",
  host: "localhost",
  port: 5432,
  database: "students",
  password: "jtd@123",
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection error:", err));

app.post("/students", async (req, res) => {
  const { name, marks, grade } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO students (name, marks, grade) VALUES ('${name}', ${marks}, '${grade}') RETURNING *`
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/students", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM students");
    console.log(result.rows);
    
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      `SELECT * FROM students WHERE student_id = ${id}`
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    console.log(result.rows[0]);
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, marks, grade } = req.body;

  console.log("ID:", id);
  console.log("Request Body:", req.body);

  try {
    const result = await client.query(
      `UPDATE students SET name = '${name}', marks = ${marks}, grade = '${grade}' WHERE student_id = ${id} RETURNING *`
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      `DELETE FROM students WHERE student_id = ${id} RETURNING *`
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
