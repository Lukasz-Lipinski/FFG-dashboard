export default defineEventHandler(async (event) => {
  const userCred = await readBody<CreateUserAccountModel>(event);

  // check if user exists
  // validate fields
  // add user if possible
  // in case of error return appropriate status code and message

  return {} as CreateUserAccountModel;
});
