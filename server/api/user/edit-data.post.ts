import { CheckIfUserExistsById } from "~~/server/services/auth.service";
import { UpdateUserData } from "~~/server/services/user.service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  var user = await CheckIfUserExistsById(event, body.Id);

  if (!user) {
    return createError({
      message: "User doesn't exist",
      statusCode: 404,
    });
  }

  const updatedUser = await UpdateUserData(event, body);

  if (updatedUser) {
    createError({
      message: "Upate failed",
      statusCode: 500,
    });
  }

  return event.respondWith(
    new Response(JSON.stringify(updatedUser), { status: 200 })
  );
});
