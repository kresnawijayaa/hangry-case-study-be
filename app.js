const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const locations = require("./routes/locations");
const menus = require("./routes/menus");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/locations", locations);
app.use("/menus", menus);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port} `);
});

module.exports = app;
