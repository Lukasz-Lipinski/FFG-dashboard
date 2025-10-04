import { parseBody } from "~~/server/services/request.service";
import { CheckIfUserExists } from "../../middlewaressss/auth/auth.service";
import { CreateUserDto } from "~~/server/dtos/users/CreateUserDto";

export default defineEventHandler(async (event) => {
  const userCred = await parseBody<CreateUserDto>(event);
  const user = await CheckIfUserExists(event, userCred);

  if (user === null) {
    throw createError({
      statusCode: 404,
      message: "User does not exist",
      statusMessage: "User does not exist",
      statusText: "Not Found",
    });
  } else {
    // Respond with user data
    event.respondWith(
      new Response(JSON.stringify(user), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  }
});
