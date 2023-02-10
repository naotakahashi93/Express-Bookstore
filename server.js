/** Server for bookstore. */
process.env.NODE_ENV = "test" 

const app = require("./app");

app.listen(3000, () => {
  console.log(`Server starting on port 3000`);
});
