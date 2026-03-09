import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'src/api/auth/guards/auth.decorator';
import { AssignRoleDto } from '../dto/role.dto';
import { RoleIds } from '../enum/role.enum';
import { RoleService } from '../services/role.service';

@Controller('role')
@Roles(RoleIds.Admin)
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post('assign')
  async assignRoleToUser(@Body() body: AssignRoleDto) {
    return this.roleService.assignRoleToUser(body);
  }

  /**
   * Endpoint para ver todos los roles de la aplicacion. - solo admins.
   * @returns 
   */
  @Get()
  async getAllRoles() {
    return this.roleService.findAll();
  }
}
