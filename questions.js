// TO EXPLAIN DIFF B/W sync & async


// EXPRESS _ --> is a library/framework on top of  NodeJS
const fs = require("fs");
console.log("1");
const data = setTimeout(() => {
  fs.readFileSync("example.txt", "utf-8");
}, 5000);

console.log(data);

console.log("2");


// const data = fs.readFileSync("example.txt", "utf-8");

// fs.readFileSync("example.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
