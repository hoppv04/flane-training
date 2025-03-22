import { ILogger } from "../interfaces/ILogger";
import { getFileTrainingName, Type } from "./getFileTrainingName";
import { uploadJobToAzureJob } from "./uploadTrainingToAzureTraining";

/**
 * Appends job data to an Azure Blob file.
 *
 * This function uploads the given job data to an Azure Data Lake storage file.
 * The file name is dynamically generated based on the company name and job type.
 *
 * @param {any} content - The job data to be uploaded.
 * @param {string} companyName - The name of the company, used to generate the file name.
 * @param {ILogger} logger - Logger instance for logging actions and errors.
 */
export const appendJobToAzureBlob = async (
  content: any,
  companyName: string,
  logger: ILogger
) => {
  try {
    // Upload job data to Azure with a dynamically generated file name
    await uploadJobToAzureJob(
      content,
      `${companyName}.json`,
      getFileTrainingName(Type.training, "de", companyName),
      logger
    );
    logger.info(
      `Data written to ${companyName}.json Azure successfully uploaded`
    );
  } catch (error) {
    logger.error("Error occurred in appendJobToAzureBlob function");
  }
};
