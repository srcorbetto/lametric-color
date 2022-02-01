require("dotenv").config();
const express = require("express");
const app = express();
const randomColor = require("randomcolor");
const axios = require("axios");
const port = process.env.PORT || 80;

// GET Request...
app.get("/color", (req, res) => {
  const color = randomColor();
  const trimmedColor = color.substring(1);
  let colorName;
  let colorHex;
  let colorUrl;
  let colorBinary;
  let data;
  axios
    .get(`https://www.thecolorapi.com/id?hex=${trimmedColor}`)
    .then((colorApiRes) => {
      colorName = colorApiRes.data.name.value;
      colorHex = colorApiRes.data.hex.value;
      colorUrl = `https://singlecolorimage.com/get/${trimmedColor}/8x8`;
    })
    .then(() => {
      axios
        .get(colorUrl, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          colorBinary = Buffer.from(response.data, "binary").toString("base64");
          data = {
            frames: [
              {
                text: colorName,
                icon: `data:image/png;base64,${colorBinary}`,
                index: 0,
              },
              //   {
              //     text: colorHex,
              //     icon: `data:image/png;base64,${colorBinary}`,
              //     index: 1,
              //   },
            ],
          };
          res.send(data);
        });
    });
});

app.listen(port, () => {
  console.log("App running at port ", port);
});
