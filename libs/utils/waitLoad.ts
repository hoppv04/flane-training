import { Page } from "playwright";
import { randomDelay } from "./randomDelay";

export const waitLoad = async (page: Page) => {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  await page.waitForTimeout(randomDelay());
};
