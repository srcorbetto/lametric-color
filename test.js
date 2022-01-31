require("dotenv").config();
const randomColor = require("randomcolor");
const axios = require("axios");
const {
  openBrowser,
  goto,
  write,
  click,
  currentURL,
  closeBrowser,
  press,
  reload,
} = require("taiko");

const getColor = (randColor) => {
  const newColor = randColor.substring(1);
  console.log(newColor);
  console.log(
    "====================================================================="
  );
  axios.get(`https://www.thecolorapi.com/id?hex=${newColor}`).then((res) => {
    console.log(res.data);
    console.log(
      "====================================================================="
    );
    console.log(res.data.name.value);
  });
};

getColor(randomColor());

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
  await write("#a40074");
  await press("Enter");
  await click($(".set-all"));
  await click($(".save-image"));
  await click($(".select"));
  await reload("https://developer.lametric.com/applications/info/28948");
  await click(link("update"));
  await closeBrowser();
})();

// Icon ID: 48463
