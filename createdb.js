const { Client } = require("pg");

const client = new Client({
  user: "jtd",
  host: "localhost",
  port: 5432,
  database: "postgres",
  password: "jtd@123",
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");

    const createDatabaseQuery = `
      CREATE DATABASE customers2
      WITH OWNER = jtd
      ENCODING = 'UTF8'
      CONNECTION LIMIT = -1;
    `;

    return client.query(createDatabaseQuery);
  })
  .then(() => {
    console.log("Database 'customers2' created successfully!");
  })
  .catch((err) => {
    console.error("Error creating database:", err.stack);
  })
  .finally(() => {
    client.end();
  });
