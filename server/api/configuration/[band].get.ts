import { FetchSiteConfiguration } from "../../services/configuration.service";
import { createError, getCookie } from "h3";
import type { H3Event } from "h3";
import { CheckIfUserExistsById } from "../../services/auth.service";

export default defineEventHandler(async (event: H3Event) => {
  const userCookie = getCookie(event, "user");
  if (!userCookie) {
    throw createError({
      statusCode: 401,
      statusMessage: "Not Authorized",
    });
  }

  try {
    const user = JSON.parse(userCookie);
    const foundUser = await CheckIfUserExistsById(event, user.Id);
    if (!foundUser?.Id) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not Authorized",
      });
    }
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: "Not Authorized",
    });
  }

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
