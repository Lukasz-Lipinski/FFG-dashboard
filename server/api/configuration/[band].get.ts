import { FetchSiteConfiguration } from "../../services/configuration.service";
import { createError } from "h3";
import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  // Extract the 'band' parameter from the route
  const band = getRouterParam(event, "band");

  // Validate that band parameter is not null or undefined
  if (!band) {
    throw createError({
      statusCode: 400,
      statusMessage: "Band parameter cannot be empty",
    });
  }

  // Fetch and return the site configuration
  return await FetchSiteConfiguration(event, band);
});
