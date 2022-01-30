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

(async () => {
  await openBrowser();
  await goto("www.google.com");
  await write("taiko test automation");
  await press("Enter");
  await currentURL().then((result) => {
    console.log(result);
  });
  await closeBrowser();
})().then(console.log("POOP"));

// Specific figure screen...
app.get("/purchase_history/:figureDoc", (req, res) => {
  res.render("figure", { figure: req.params.figureDoc, layout: "main" });
});

app.listen(8080, () => {
  console.log("App running at port ", 8080);
});
