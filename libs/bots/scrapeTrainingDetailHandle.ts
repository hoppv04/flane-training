import { chromium } from "playwright";
import { ILogger } from "../interfaces/ILogger";
import { waitLoad } from "../utils/waitLoad";
import { trainingSelectors } from "../configs";
import { createLogger } from "../utils/createLogger";
import { ITraining } from "../interfaces/ITraining";
import { appendJobToAzureBlob } from "../utils/appendTrainingToAzureBlob";

export const scrapeTrainingDetail = async (loggerReceive: ILogger) => {
  const sourceUri = "https://www.flane.de";
  const companyName = "Flane";
  const logger = createLogger(loggerReceive, "FLANE-TRAINING");
  const browser = await chromium.launch({ headless: false });

  try {
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto(sourceUri);
    await waitLoad(page);

    await page.waitForSelector(trainingSelectors.aLabel, { state: "visible" });
    await page.click(trainingSelectors.aLabel);
    await waitLoad(page);

    const rows = await page.locator(trainingSelectors.trainingContainer).all();

    for (const row of rows) {
      const code = (
        (await row.locator(trainingSelectors.code).innerText()) ?? ""
      ).trim();
      const nameLocator = row.locator(trainingSelectors.name);
      const name = ((await nameLocator.innerText()) ?? "").trim();
      const language = (
        (await row.locator(trainingSelectors.language).innerText()) ?? ""
      ).trim();
      const status = (await row.locator(trainingSelectors.status).count()) > 0;
      const trainingType = (
        (await row.locator(trainingSelectors.trainingType).innerText()) ?? ""
      ).trim();
      const href = await nameLocator.getAttribute("href");

      const rowData: ITraining = {
        sourceUri,
        code,
        name,
        language,
        status,
        trainingType,
        trainingSrc: href ? `${sourceUri}${href}` : "",
        miningAt: new Date(),
      };

      await appendJobToAzureBlob(rowData, companyName, logger);
    }
  } catch (error) {
  } finally {
    await browser.close();
  }
};
