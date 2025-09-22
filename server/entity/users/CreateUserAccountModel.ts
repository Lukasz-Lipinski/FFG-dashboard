class CreateUserAccountModel {
  Id: number;
  Email: string;
  Password: string;
  Band: string;

  constructor(id: number, email: string, password: string, band: string) {
    this.Id = id;
    this.Email = email;
    this.Password = password;
    this.Band = band;
  }
}
