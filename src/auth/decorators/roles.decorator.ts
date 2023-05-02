import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "src/constants/key-decorators";
import { ROLES_ENUM } from "src/constants/roles.enum";

export const Roles = (...Roles: ROLES_ENUM[]) => SetMetadata(ROLES_KEY, Roles)