import { type CreateUserAccount } from "../../../shared/models";

export function prepareDataForSignRequest(data: {
  email: string;
  password: string;
  band: string;
}): CreateUserAccount {
  return {
    email: data.email,
    password: data.password,
    band: data.band,
  };
}
