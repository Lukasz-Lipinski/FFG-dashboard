import { RoleType } from "~~/server/entity/users/UserEntity";
import { UserDto } from "./UserDto";

export class UpdateUserDataDto {
  NewEmail: string;
  Email: string;
  Id: number;

  constructor(id: number, email: string, newEmail: string) {
    this.NewEmail = newEmail;
    this.Email = email;
    this.Id = id;
  }
}
