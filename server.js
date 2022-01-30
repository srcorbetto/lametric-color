const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {
  openBrowser,
  goto,
  write,
  click,
  currentURL,
  closeBrowser,
  press,
} = require("taiko");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Specific figure screen...
app.get("/purchase_history/:figureDoc", (req, res) => {
  res.render("figure", { figure: req.params.figureDoc, layout: "main" });
});

app.listen(8080, () => {
  console.log("App running at port ", 8080);
});
