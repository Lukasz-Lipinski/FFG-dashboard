import { RoleType } from "~~/server/entity/users/UserEntity";

export class UserDto {
  Id: number;
  Email: string;
  Band: string;
  Role: string;

  constructor(id: number, email: string, band: string, role: RoleType) {
    this.Id = id;
    this.Email = email;
    this.Band = band;
    this.Role = role;
  }
}
