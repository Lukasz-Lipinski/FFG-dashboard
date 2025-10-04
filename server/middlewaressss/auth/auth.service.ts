import { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import { CreateUserAccountModel } from "~~/server/entity/users/CreateUserAccountModel";
import { UserDto } from "~~/server/dtos/users/UserDto";
import { RoleType } from "~~/server/entity/users/UserModel";
import { CreateUserDto } from "~~/server/dtos/users/CreateUserDto";

export const CheckIfUserExists = async (
  event: H3Event,
  userCred: CreateUserDto
): Promise<UserDto | null> => {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client
    .from("Users")
    .select("*")
    .like("Email", userCred.Email)
    .like("Band", userCred.Band)
    .like("Password", userCred.Password);

  if (error) {
    throw new Error(error.message);
  }

  return data && data.length > 0 ? data[0] : null;
};

export const CreateAdminUser = async (
  event: H3Event,
  userCred: CreateUserDto
) => {
  const client = await serverSupabaseClient(event);

  const newAdmin = new CreateUserAccountModel(
    userCred.Email,
    userCred.Password,
    userCred.Band,
    RoleType.Admin
  );

  await client.from("Users").insert([newAdmin]);

  const user = await CheckIfUserExists(event, userCred);

  if (!user) {
    throw createError({
      statusCode: 422,
      statusText: "Unable to create admin user, this user already exists",
    });
  }

  return user;
};

export const CreateRegularUser = async (
  event: H3Event,
  userCred: CreateUserDto
) => {
  const client = await serverSupabaseClient(event);
  if (await CheckIfUserExists(event, userCred)) {
    throw createError({
      statusCode: 422,
      statusText: "User already exists",
    });
  }

  const newUser = new CreateUserAccountModel(
    userCred.Email,
    userCred.Password,
    userCred.Band,
    RoleType.Member
  );

  await client.from("Users").insert([newUser]);

  const user = await CheckIfUserExists(event, userCred);

  if (!user) {
    throw createError({
      statusCode: 422,
      message: "Unable to create regular user",
    });
  }

  return user;
};

// Checks if an admin account exists for a given band/site
export async function CheckIfAdminOnSiteExists(
  event: any,
  band: string
): Promise<boolean> {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client
    .from("Users")
    .select("*")
    .eq("Band", band)
    .eq("Role", "Admin");

  if (error) {
    throw new Error(error.message);
  }
  return !!(data && data.length > 0);
}
