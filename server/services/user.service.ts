import { serverSupabaseClient } from "#supabase/server";
import { H3Event } from "h3";
import { UserEntity } from "../entity/users/UserEntity";
import { UserDto } from "../dtos/users/UserDto";
import { UpdateUserDataDto } from "../dtos/users/UpdateUserDataDto";

export async function UpdateUserData(
  event: H3Event,
  editUserDto: UpdateUserDataDto
): Promise<UserDto | null> {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("Users")
    .update({
      Email: editUserDto.NewEmail,
      UpdatedDate: new Date().toISOString(),
    } as never)
    .eq("id", editUserDto.Id)
    .select();

  if (error || !data?.length) {
    return null;
  }

  const foundUser = data[0] as UserEntity;
  return new UserDto(
    foundUser.id,
    foundUser.Email,
    foundUser.Band,
    foundUser.Role
  );
}
