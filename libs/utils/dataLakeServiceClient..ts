import { DataLakeServiceClient } from "@azure/storage-file-datalake";
import { CONNECTION_STRING } from "../configs";

export const dataLakeServiceClient =
  DataLakeServiceClient.fromConnectionString(CONNECTION_STRING);
