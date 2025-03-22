/**
 * Converts a readable stream into a Buffer.
 *
 * This function reads all data from a given readable stream and
 * returns it as a single concatenated Buffer.
 *
 * @param {NodeJS.ReadableStream} readableStream - The readable stream to convert into a Buffer.
 * @returns {Promise<Buffer>} A promise that resolves with the concatenated Buffer from the stream.
 */
export const streamToBuffer = (
  readableStream: NodeJS.ReadableStream
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    // Listen for 'data' event and collect chunks of data
    readableStream.on("data", (data) => {
      // Ensure the data is in Buffer format before pushing
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });

    // Listen for 'end' event and resolve with the concatenated Buffer
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    // Handle errors and reject the promise if any occur
    readableStream.on("error", reject);
  });
};
