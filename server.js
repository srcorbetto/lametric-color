require("dotenv").config();
const express = require("express");
const app = express();
const randomColor = require("randomcolor");
const axios = require("axios");
const {
  openBrowser,
  goto,
  write,
  click,
  evaluate,
  link,
  closeBrowser,
  press,
  reload,
  $,
} = require("taiko");
const port = process.env.PORT || 80;

// GET Request...
app.get("/color", (req, res) => {
  const color = randomColor();
  const trimmedColor = color.substring(1);
  (async () => {
    await openBrowser();
    await goto("https://developer.lametric.com/login");
    await click($("#email"));
    await write(process.env.EMAIL);
    await click($("#password"));
    await write(process.env.PASS);
    await press("Enter");
    await goto("https://developer.lametric.com/applications/info/28948");
    await click($(".application-icon"));
    await click($("#animationTextFilter"));
    await write("LaMetric Color");
    await click($(".one"));
    await click($(".edit"));
    await click($(".current-color-input"), {
      clickCount: 3,
    });
    await write(color);
    await press("Enter");
    await click($(".set-all"));
    await click($(".save-image"));
    await evaluate(link("select"), (ele) => ele.click());
    await reload("https://developer.lametric.com/applications/info/28948");
    await click(link("update"));
    await closeBrowser().then(console.log("Complete"));
  })().then(
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
      })
  );
});

app.listen(port, () => {
  console.log("App running at port ", port);
});
