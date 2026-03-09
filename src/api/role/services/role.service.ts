import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/database/entities/role.entity';
import { AssignRoleDto } from '../dto/role.dto';
import { errorMessages } from 'src/errors/custom';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RoleAssignedEvent } from 'src/events/roleAssigned.event';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async assignRoleToUser(data: AssignRoleDto) {
    const role = await this.findById(data.roleId);

    //emitimos el evento
    this.eventEmitter.emit(
      'role.assigned',
      new RoleAssignedEvent(data.userId, role)
    );

    return {
      message: 'success',
    };
  }

  async findById(roleId: number) {
    const role = await this.rolesRepository.findOne({
      where: {
        id: roleId,
      },
    });
    if (!role) {
      throw new NotFoundException(errorMessages.role.notFound);
    }
    return role;
  }

  async findAll() {
    return await this.rolesRepository.find();
  }
}
