import { RoleType } from "~~/server/entity/users/UserModel";

export class CreateUserDto {
  Email: string;
  Password: string;
  Band: string;

  constructor(email: string, password: string, band: string, role: RoleType) {
    this.Email = email;
    this.Password = password;
    this.Band = band;
  }
}
