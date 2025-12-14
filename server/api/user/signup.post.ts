import { CreateUserDto } from "~~/server/dtos/users/CreateUserDto";
import {
  CheckIfAdminOnSiteExists,
  CreateAdminUser,
  CreateRegularUser,
} from "~~/server/services/auth.service";
import { parseBody } from "~~/server/services/request.service";

export default defineEventHandler(async (event) => {
  const userCred = await parseBody<CreateUserDto>(event);

  const isAdminAccountCreated = await CheckIfAdminOnSiteExists(
    event,
    userCred.Band
  );

  if (!isAdminAccountCreated) {
    return await CreateAdminUser(event, userCred);
  } else {
    return await CreateRegularUser(event, userCred);
  }
});
