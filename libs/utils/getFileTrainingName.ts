export enum Type {
  training = "flane-training",
}

/**
 * Generates a structured file path based on type, country, provider, and the current date.
 * @param type - The type of the file (e.g., training).
 * @param country - The country associated with the file.
 * @param provider - The provider of the training data.
 * @returns A formatted file path string with date-based organization.
 */
export const getFileTrainingName = (
  type: Type,
  country: string,
  provider: string
): string => {
  // Get the current date to include in the file path
  const currentDate = new Date();

  // Construct the file path using the provided parameters and the current date
  return `${type}/country=${country}/provider=${provider}/year=${currentDate.getFullYear()}/month=${
    currentDate.getMonth() + 1
  }/day=${currentDate.getDate()}`;
};
