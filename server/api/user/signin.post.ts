import { parseBody } from "~~/server/services/request.service";
import { CheckIfUserExists } from "../../middlewaressss/auth/auth.service";

export default defineEventHandler(async (event) => {
  const userCred = await parseBody<CreateUserAccountModel>(event);
  const isUser = await CheckIfUserExists(event, userCred);

  if (isUser) {
    event.respondWith(new Response("User exists", { status: 200 }));
  } else {
    throw createError({
      statusCode: 404,
      message: "User does not exist",
      statusMessage: "User does not exist",
      statusText: "Not Found",
    });
  }
});
