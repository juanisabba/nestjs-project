import { SetMetadata } from "@nestjs/common";
import { ADMIN_KEY } from "src/constants/key-decorators";
import { ROLES_ENUM } from "src/constants/roles.enum";

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES_ENUM.ADMIN)