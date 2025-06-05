import { User } from "./user";

type Link = {
  href: string;
  rel: "self" | "update" | "delete" | "all";
};

export type UserResponse = {
  links: Link[];
  user: User;
};
