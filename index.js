import { chromium } from "playwright";

(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: true }); // Set headless: true to run without UI
  const context = await browser.newContext({
    ignoreHTTPSErrors: false,
  });
  const page = await context.newPage();

  console.time("start");
  await page.goto("https://110129.samanpl.ir/");
  console.log("navigate to site");
  await page.getByRole("link", { name: "" }).click();
  await page.getByPlaceholder("نام کاربری").click();
  await page.getByPlaceholder("نام کاربری").fill("0928372294");
  await page.getByPlaceholder("کلمه عبور").click();
  await page.getByPlaceholder("کلمه عبور").press("ControlOrMeta+a");
  await page.getByPlaceholder("کلمه عبور").fill("@Erfan1385");
  await page.getByRole("button", { name: " ورود" }).click();
  console.log("login");
  await page.click("#ReserveButton");
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "   رزرو" }).click();
  const page1 = await page1Promise;
  await page1.getByRole("textbox", { name: "date" }).click();
  await page1.click(`td[data-number="${14030601}"]`);
  const page2Promise = page1.waitForEvent("popup");
  await page1.getByRole("button", { name: "۱۷-۱۴" }).click();
  const page2 = await page2Promise;
  await page2.getByText("۵۳").click();
  await page2.getByRole("button", { name: "  رزرو" }).click();
  await page2.getByRole("button", { name: "بله" }).click();
  console.timeEnd("ending");
  // Navigate to a website

  // Close the browser
  await browser.close();
})();
