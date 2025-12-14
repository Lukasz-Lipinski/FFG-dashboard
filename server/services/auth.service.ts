import { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import { CreateUserAccountEntity } from "~~/server/entity/users/CreateUserAccountEntity";
import { UserDto } from "~~/server/dtos/users/UserDto";
import { RoleType, UserEntity } from "~~/server/entity/users/UserEntity";
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

  if (data && data.length > 0) {
    const foundUser = data[0] as UserEntity;
    const user = new UserDto(
      foundUser.id,
      foundUser.Email,
      foundUser.Band,
      foundUser.Role
    );

    return user;
  }

  return null;
};

export const CheckIsUserExistsById = async (
  event: H3Event,
  id: number
): Promise<UserDto | null> => {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client.from("Users").select("*").eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  if (data && data.length > 0) {
    const foundUser = data[0] as UserEntity;
    const user = new UserDto(
      foundUser.id,
      foundUser.Email,
      foundUser.Band,
      foundUser.Role
    );

    return user;
  }

  return null;
};

export const CreateAdminUser = async (
  event: H3Event,
  userCred: CreateUserDto
) => {
  const client = await serverSupabaseClient(event);

  const newAdmin = new CreateUserAccountEntity(
    userCred.Email,
    userCred.Password,
    userCred.Band,
    RoleType.Admin
  ) as never;

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

  const newUser = new CreateUserAccountEntity(
    userCred.Email,
    userCred.Password,
    userCred.Band,
    RoleType.Member
  ) as never;

  await client.from("Users").insert([newUser], { count: "exact" });

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
