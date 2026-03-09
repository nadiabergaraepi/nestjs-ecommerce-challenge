import { Injectable } from "@nestjs/common";
import { RoleService } from "../services/role.service";
import { OnEvent } from "@nestjs/event-emitter";
import { UserRegisteredEvent } from "src/events/userRegistered.event";
import { RoleIds } from "../enum/role.enum";
import { UserService } from "src/api/user/services/user.service";

@Injectable()
export class UserRegisteredListener {
    constructor(
        private readonly roleService: RoleService,
        private readonly userService: UserService,
    ) { }

    /**
     * Asigna customer role a los usuarios recien registrados.
     */
    @OnEvent('user.registered')
    async handleUserRegisteredEvent(event: UserRegisteredEvent) {
        const customerRole = await this.roleService.findById(RoleIds.Customer);
        const user = await this.userService.findById(event.userId, { roles: true });
        if (!user.roles.some(role => role.id === customerRole.id)) {
            user.roles.push(customerRole);
            await this.userService.save(user);
        }
    }
}