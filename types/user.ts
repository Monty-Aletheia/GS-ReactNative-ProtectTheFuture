import { Address } from "./address";

export type User = {
  firebaseId: string;
  id: string;
  name: string;
  email: string;
  password: string;
  address: Address
};
