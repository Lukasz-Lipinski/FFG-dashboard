import { CheckIfUserExists } from "../../middlewaressss/auth/auth.service";

export default defineEventHandler(async (event) => {
  const userCred = await readBody<CreateUserAccountModel>(event);
  const isUser = await CheckIfUserExists(event, userCred);
  console.log(isUser);
  if (isUser) {
    event.respondWith(new Response("User exists", { status: 200 }));
  } else {
    return createError({
      statusCode: 404,
      message: "User does not exist",
      statusMessage: "User does not exist",
      statusText: "Not Found",
    });
  }
});
