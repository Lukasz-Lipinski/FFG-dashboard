import { RoleType } from "./UserEntity";

export class CreateUserAccountEntity {
  Email: string;
  Password: string;
  Band: string;
  Role: RoleType;

  constructor(email: string, password: string, band: string, role: RoleType) {
    this.Email = email;
    this.Password = password;
    this.Band = band;
    this.Role = role;
  }
}
