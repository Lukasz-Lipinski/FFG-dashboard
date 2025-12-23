import { SetURL } from "~~/server/services/configuration.service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const band = getRouterParam(event, "band");

  const data = await SetURL(event, band!, body.pageUrl, body.userId);

  return data;
});
