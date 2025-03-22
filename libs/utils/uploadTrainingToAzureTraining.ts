import { ILogger } from "../interfaces/ILogger";
import { ITraining } from "../interfaces/ITraining";
import { dataLakeServiceClient } from "./dataLakeServiceClient.";
import { streamToBuffer } from "./streamToBuffer";

/**
 * Uploads a list of crawled job data to an Azure Data Lake file.
 *
 * This function checks if the specified file exists in the Azure Data Lake.
 * - If the file exists, it downloads the existing content, appends the new data, and re-uploads it.
 * - If the file does not exist, it creates a new file and uploads the data.
 *
 * @param {Array<ICrawledJob>} file - The list of crawled job data to upload.
 * @param {string} fileName - The name of the file in the Azure Data Lake.
 * @param {string} fileSystemName - The name of the file system in the Azure Data Lake.
 * @param {ILogger} logger - Logger instance for logging actions and errors.
 * @returns {Promise<void>} A promise that resolves when the file upload is completed.
 */
export const uploadJobToAzureJob = async (
  file: Array<ITraining>,
  fileName: string,
  fileSystemName: string,
  logger: ILogger
): Promise<void> => {
  // Get the file system client from the Azure Data Lake service
  const fileSystemClient =
    dataLakeServiceClient.getFileSystemClient(fileSystemName);

  // Initialize a text encoder for encoding the JSON content
  const encoder = new TextEncoder();
  // Initial content to upload
  let content = encoder.encode(JSON.stringify([file]));

  // Get the file client for the specified file
  const fileClient = fileSystemClient.getFileClient(fileName);

  try {
    // Check if the file already exists
    const isFileExisted = await fileClient.exists();

    if (isFileExisted) {
      // If file exists, read and append new content
      const downloadResponse = await fileClient.read();
      const downloaded = await streamToBuffer(
        downloadResponse.readableStreamBody
      );
      const exitedFileContent = JSON.parse(downloaded.toString());

      // Append the new file data to the existing content
      exitedFileContent.push(file);
      content = encoder.encode(JSON.stringify(exitedFileContent));
    }

    // Create or overwrite the file in the Azure Data Lake
    await fileClient.create();
    logger.info(`Create file ${fileName} successfully`);

    // Append the content to the file
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
    logger.info(`Append file ${fileName} successfully`);
  } catch (e) {
    logger.error("Error occurred in uploadJobToAzureJob function", e);
  }
};
