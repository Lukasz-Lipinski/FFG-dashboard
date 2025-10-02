import { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export const CheckIfUserExists = async (
  event: H3Event,
  userCred: CreateUserAccountModel
): Promise<boolean> => {
  debugger;
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

  return data && data.length > 0 ? true : false;
};
