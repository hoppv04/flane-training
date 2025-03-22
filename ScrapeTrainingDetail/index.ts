import { FunctionHandler } from "@azure/functions";
import { scrapeTrainingDetail } from "../libs/bots/scrapeTrainingDetailHandle";

const scrapeLinkPageJobPostingTrigger: FunctionHandler = async (
  triggerInput
) => {
  if (triggerInput.isPastDue) {
    console.warn(
      "Scape Training Detail function is running later than scheduled!"
    );
  }

  await scrapeTrainingDetail(console);
};

export default scrapeLinkPageJobPostingTrigger;
