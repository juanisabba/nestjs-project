import { ROLES_ENUM } from "src/constants/roles.enum";

export interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  role?: ROLES_ENUM;
  profilePicture?: string
}