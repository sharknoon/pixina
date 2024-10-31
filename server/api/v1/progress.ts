import type { Progress } from "~/types/progress";
import Excel from "exceljs";

let cacheUntil = 0;
let cache: Progress | null = null;

export default defineEventHandler(async () => {
  const currentTime = Date.now();
  if (currentTime < cacheUntil && cache) {
    return cache;
  }

  const config = useRuntimeConfig();

  const excelPollUrl = config.excelPollUrl;
  if (!excelPollUrl || !isUrl(excelPollUrl)) {
    throw createError({
      status: 500,
      message: "Excel poll URL is not set or invalid!",
    });
  }

  const excelPollIntervalMs = config.excelPollIntervalMs;
  if (!Number.isInteger(excelPollIntervalMs) || excelPollIntervalMs < 0) {
    throw createError({
      status: 500,
      message: "Excel poll interval is not set or invalid!",
    });
  }

  const excelResponse = (await $fetch(excelPollUrl)) as Response;
  const excelContent = await excelResponse.arrayBuffer();
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(excelContent);

  const worksheet = workbook.worksheets[0];

  const progress: Progress = {
    finished: [],
    inProgress: [],
    reserved: [],
    availableInStock: [],
    availableOutOfStock: [],
  };

  for (let i = 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);
    const number = row.getCell(1).value;
    if (!(typeof number === "number")) {
      return createError({
        status: 500,
        message: `Excel platenumber is not a number! (${number})`,
      });
    }
    const status = row.getCell(3).value;

    switch (status) {
      case "Fertig":
        progress.finished.push(number);
        break;
      case "In Arbeit":
        progress.inProgress.push(number);
        break;
      case "Reserviert":
        progress.reserved.push(number);
        break;
      case "Frei (lagernd)":
        progress.availableInStock.push(number);
        break;
      case "Frei (nicht lagernd)":
        progress.availableOutOfStock.push(number);
        break;
      default:
        return createError({
          status: 500,
          message: `Excel status is not valid! (${status})`,
        });
    }
  }

  cacheUntil = currentTime + excelPollIntervalMs;
  cache = progress;

  return progress;
});

function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
