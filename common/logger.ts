import { logger, consoleTransport } from "react-native-logs";

export const log = logger.createLogger({
  severity: __DEV__ ? "debug" : "error",
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transport: consoleTransport,
  transportOptions: {
    colors: {
      debug: "blue",
      info: "whiteBright",
      warn: "yellow",
      error: "red",
    },
  },
  async: false,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true,
});
