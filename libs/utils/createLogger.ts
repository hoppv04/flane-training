import { ILogger } from "../interfaces/ILogger";

export const createLogger = (
  logHandler: ILogger,
  botName: string
): ILogger => ({
  log: (...args) => logHandler.log?.(`${botName} - [LOG]`, ...args),
  info: (...args) => logHandler.info?.(`${botName} - [INFO]`, ...args),
  warn: (...args) => logHandler.warn?.(`${botName} - [WARN]`, ...args),
  error: (...args) => logHandler.error?.(`${botName} - [ERROR]`, ...args),
});
