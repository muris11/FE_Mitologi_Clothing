const { chromium } = require("playwright");
const path = require("path");

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");

  try {
    // 1. Mobile Syarat Ketentuan
    const page1 = await context.newPage();
    await page1.goto(`${siteUrl}/shop/syarat-ketentuan`);
    await page1.waitForLoadState("networkidle");
    await page1.screenshot({
      path: path.join(
        "C:\\Users\\rifqy\\.gemini\\antigravity\\brain\\ff535643-a71e-4201-94d0-49d19137f47e",
        "syarat_ketentuan_mobile.png",
      ),
      fullPage: true,
    });
    await page1.close();

    // 2. Mobile Kebijakan Privasi
    const page2 = await context.newPage();
    await page2.goto(`${siteUrl}/shop/kebijakan-privasi`);
    await page2.waitForLoadState("networkidle");
    await page2.screenshot({
      path: path.join(
        "C:\\Users\\rifqy\\.gemini\\antigravity\\brain\\ff535643-a71e-4201-94d0-49d19137f47e",
        "kebijakan_privasi_mobile.png",
      ),
      fullPage: true,
    });
    await page2.close();

    // 3. Mobile Product CTA Bar
    const pageProductMobile = await context.newPage();
    await pageProductMobile.goto(
      `${siteUrl}/shop/product/hanoman-warrior-zip-hoodie`,
    );
    await pageProductMobile.waitForLoadState("networkidle");
    // Scroll down slightly to make sure sticky bar is obvious
    await pageProductMobile.evaluate(() => window.scrollTo(0, 500));
    await pageProductMobile.waitForTimeout(500);
    await pageProductMobile.screenshot({
      path: path.join(
        "C:\\Users\\rifqy\\.gemini\\antigravity\\brain\\ff535643-a71e-4201-94d0-49d19137f47e",
        "mobile_cta_bottom_bar.png",
      ),
      fullPage: false,
    });
    await pageProductMobile.close();

    // Desktop Context
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });

    // 3. Shop Catalog Empty State & Product Cards
    const page3 = await desktopContext.newPage();
    await page3.goto(`${siteUrl}/shop`);
    await page3.waitForLoadState("networkidle");
    await page3.screenshot({
      path: path.join(
        "C:\\Users\\rifqy\\.gemini\\antigravity\\brain\\ff535643-a71e-4201-94d0-49d19137f47e",
        "shop_catalog_redesign.png",
      ),
      fullPage: false,
    });
    await page3.close();

    const page4 = await desktopContext.newPage();
    await page4.goto(`${siteUrl}/shop/hoodie`);
    await page4.waitForLoadState("networkidle");
    await page4.screenshot({
      path: path.join(
        "C:\\Users\\rifqy\\.gemini\\antigravity\\brain\\ff535643-a71e-4201-94d0-49d19137f47e",
        "shop_hoodie_cards.png",
      ),
      fullPage: false,
    });
    await page4.close();

    console.log("Screenshots captured successfully!");
  } catch (e) {
    console.error("Failed to capture:", e);
  } finally {
    await browser.close();
  }
}

capture();
