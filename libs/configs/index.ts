import { loadConfig } from "../utils/loadConfig";

export const CONNECTION_STRING = loadConfig("CONNECTION_STRING", "");
export const CONTAINER_NAME = loadConfig("CONTAINER_NAME", "");
export const BOT_NAME = loadConfig("BOT_NAME", "");

export const trainingSelectors = {
  aLabel: "a#ui-id-31",
  trainingContainer: "tr.fl-sched-itm",
  code: "td.fl-sched-pcode > span",
  name: "td.fl-sched-evtinfo > a[href]",
  language: "td.fl-sched-evtinfo > span.fl-sched-note-lang > span",
  status: "td.fl-sched-evtinfo > span[title='Garantietermin!']",
  trainingType: "td.fl-sched-enroll > a[href]",
};
