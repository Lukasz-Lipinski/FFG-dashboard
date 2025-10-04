import { CreateUserDto } from "~~/server/dtos/users/CreateUserDto";
import {
  CheckIfAdminOnSiteExists,
  CheckIfUserExists,
  CreateAdminUser,
  CreateRegularUser,
} from "~~/server/middlewaressss/auth/auth.service";
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
