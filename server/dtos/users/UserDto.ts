import { RoleType } from "~~/server/entity/users/UserModel";

export class UserDto {
  Id: number;
  Email: string;
  Password: string;
  Band: string;
  Role: string;

  constructor(
    id: number,
    email: string,
    password: string,
    band: string,
    role: RoleType
  ) {
    this.Id = id;
    this.Email = email;
    this.Password = password;
    this.Band = band;
    this.Role = role;
  }
}
