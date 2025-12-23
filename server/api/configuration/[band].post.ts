import {
  FetchSiteConfiguration,
  SetURL,
} from "~~/server/services/configuration.service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const band = getRouterParam(event, "band");

  await SetURL(event, band!, body.pageUrl, body.userId);

  return await FetchSiteConfiguration(event, band!);
});
