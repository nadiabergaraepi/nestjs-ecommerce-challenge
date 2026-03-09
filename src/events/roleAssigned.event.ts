import { Role } from "src/database/entities/role.entity";

export class RoleAssignedEvent {
    constructor(
        public readonly userId: number,
        public readonly role: Role,
    ) { }
}