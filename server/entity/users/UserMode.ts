export type UserModel = {
  Id: string;
  Email: string;
  Band: string;
  Role: RoleType;
};

export enum RoleType {
  Basic = "Basic",
  Member = "Member",
  Admin = "Admin",
}
