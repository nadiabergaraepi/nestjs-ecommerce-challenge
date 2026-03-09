import { Injectable } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "src/database/entities/role.entity";
import { RoleAssignedEvent } from "src/events/roleAssigned.event";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class RoleAssignedListener {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    /**
     * Asigna el rol del evento al usuario con el id que se indica.
     * @param event 
     */
    @OnEvent('role.assigned')
    async handleRoleAssigned(event: RoleAssignedEvent) {
        const user = await this.userService.findById(event.userId, { roles: true });

        if (event.role && !user.roles.some(role => role.id === event.role.id)) {
            user.roles.push(event.role);
            await this.userService.save(user);
        }
    }
}