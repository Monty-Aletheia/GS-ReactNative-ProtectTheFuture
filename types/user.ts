import { Address } from "./address";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  address: Address
};
