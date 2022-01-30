const {
  openBrowser,
  goto,
  write,
  click,
  currentURL,
  closeBrowser,
  press,
} = require("taiko");

(async () => {
  await openBrowser();
  await goto("www.google.com");
  await write("taiko test automation");
  await press("Enter");
  await closeBrowser();
})().then(console.log("POOP"));
