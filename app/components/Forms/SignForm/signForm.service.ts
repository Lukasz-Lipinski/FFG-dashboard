import { type CreateUserAccount } from "../../../shared/models";

export function prepareDataForSignRequest(data: {
  email: string;
  password: string;
  band: string;
}): CreateUserAccount {
  return {
    Email: data.email,
    Password: data.password,
    Band: data.band,
  };
}
