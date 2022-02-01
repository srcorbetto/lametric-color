require("dotenv").config();
const express = require("express");
const app = express();
const randomColor = require("randomcolor");
const axios = require("axios");
// const {
//   openBrowser,
//   goto,
//   write,
//   click,
//   evaluate,
//   link,
//   closeBrowser,
//   press,
//   reload,
//   $,
// } = require("taiko");
const port = process.env.PORT || 80;

// GET Request...
app.get("/color", (req, res) => {
  const color = randomColor();
  const trimmedColor = color.substring(1);
  axios
    .get(`https://www.thecolorapi.com/id?hex=${trimmedColor}`)
    .then((colorApiRes) => {
      const colorName = colorApiRes.data.name.value;
      const colorHex = colorApiRes.data.hex.value;
      const data = {
        frames: [
          {
            text: colorName,
            icon: 48463,
            index: 0,
          },
          {
            text: colorHex,
            icon: 48463,
            index: 1,
          },
        ],
      };
      res.send(data);
    });
});

app.listen(port, () => {
  console.log("App running at port ", port);
});
