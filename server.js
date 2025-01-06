const express = require("express");
const PORT = 3001;
const fs = require("fs");

const path = require("path");

console.log(__dirname);
const filepath = path.join(__dirname, "data.json");

const app = express();

app.use(express.json());

function readData() {
  const data = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(data);
}
function writeData(data) {
  fs.writeFileSync(filepath, JSON.stringify(data));
}

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.post("/items", (req, res) => {
  const newItem = req.body;
  const items = readData();
  newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateItem = req.body;
  const items = readData();
  const index = items.findIndex((item) => item.index === id);
  items[index] = { ...items[index], ...updateItem, id };
  writeData(items);
  res.status(200).json(items[index]);
});

app.listen(PORT, () => {
  console.log("this is running on PORT " + PORT);
});
