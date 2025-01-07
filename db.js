const { Client } = require("pg");
const express = require("express");

const app = express();
app.use(express.json()); //its middleware to parse

const client = new Client({
  user: "jtd",
  host: "localhost",
  port: 5432,
  database: "students",
  password: "jtd@123",
});


client.connect().then(() => console.log("connected to PostgreSQL")).catch((error)=>console.error("Databse connection errror: ",error))

app.get("/students",async(req,res)=>{
  try {
    const result = await client.query("SELECT * FROM students")
    res.status(200).json(result.rows)
  }catch(err){
    res.status(500).json({error : err.message})
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




// (async () => {
//   try {
//     await client.connect();
//     console.log("Connected to PostgreSQL server");

//     // const createDbQuery = `CREATE DATABASE students;`;
//     // await client.query(createDbQuery);
//     // console.log("Database 'students' created successfully!");
// // -------------------------------------------------
//     // const createTableQuery = `
//     //   CREATE TABLE IF NOT EXISTS students (
//     //     student_id SERIAL PRIMARY KEY,
//     //     name VARCHAR(100) NOT NULL,
//     //     marks INT NOT NULL,
//     //     grade CHAR(2) NOT NULL
//     //   );
//     // `;
//     // await client.query(createTableQuery);
//     // console.log("Table 'students' created successfully!");
// // -----------------------------------------------------
//     const insertDataQuery = `
//       INSERT INTO students (name, marks, grade)
//       VALUES
//         ('hari', 85, 'A'),
//         ('joshie', 70, 'B'),
//         ('gowthu', 60, 'C'),
//         ('hema', 95, 'A+'),
//         ('Eve', 78, 'B+');
//     `;
//     await client.query(insertDataQuery);
//     console.log("Data inserted successfully!");

//   } catch (err) {
//     console.error("Error:", err.stack);
//   } finally {
//     client.end();
//   }
// })();
