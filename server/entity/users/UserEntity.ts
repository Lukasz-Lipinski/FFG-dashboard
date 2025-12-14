export enum RoleType {
  Basic = "Basic",
  Member = "Member",
  Admin = "Admin",
}

export class UserEntity {
  id: number;
  Email: string;
  Password: string;
  Band: string;
  Role: RoleType;
  CreatedAt: Date;
  UpdatedDate?: Date;

  constructor(
    id: number,
    email: string,
    password: string,
    band: string,
    role: RoleType,
    createdAt: Date,
    updatedDate?: Date
  ) {
    this.id = id;
    this.Email = email;
    this.Password = password;
    this.Band = band;
    this.Role = role;
    this.CreatedAt = createdAt;
    this.UpdatedDate = updatedDate;
  }
}
