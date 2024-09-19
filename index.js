import { chromium } from "playwright";

(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: true }); // Set headless: true to run without UI
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  await page.route("**/*.{png,jpg,jpeg,gif,svg}", (route) => route.abort());
  await page.route("**/*.css", (route) => route.abort());

  console.time("start");
  await page.goto("https://110129.samanpl.ir/");
  console.log("navigate to site");
  await page.waitForSelector("li[data-original-title='ورود']", {
    timeout: 600000,
  });
  await page.click("li[data-original-title='ورود']");
  await page.getByPlaceholder("نام کاربری").click();
  await page.getByPlaceholder("نام کاربری").fill("0928372294");
  await page.getByPlaceholder("کلمه عبور").click();
  await page.getByPlaceholder("کلمه عبور").press("ControlOrMeta+a");
  await page.getByPlaceholder("کلمه عبور").fill("@Erfan1385");
  await page.getByRole("button", { name: " ورود" }).click();
  console.log("login");
  await page.click("#ReserveButton");
  const page1Promise = page.waitForEvent("popup", { timeout: 600000 });
  await page.getByRole("link", { name: "رزرو" }).click();
  console.log("reserve clicked");
  const page1 = await page1Promise;
  await page1.getByRole("textbox", { name: "date" }).click();
  await page1.click(`td[data-number="${14030601}"]`);
  console.log("date select");
  const page2Promise = page1.waitForEvent("popup");
  await page1.getByRole("button", { name: "۱۷-۱۴" }).click();
  console.log("time select");
  const page2 = await page2Promise;
  await page2.getByText("۵۳").click();
  console.log("chair select");
  await page2.getByRole("button", { name: "  رزرو" }).click();
  console.log("reserve button clicked");
  await page2.getByRole("button", { name: "بله" }).click();
  console.log("yes clicked");
  console.timeEnd("ending");
  // Navigate to a website

  // Close the browser
  await browser.close();
})();
