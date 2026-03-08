import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Auth, Roles } from 'src/api/auth/guards/auth.decorator';
import { AssignRoleDto } from '../dto/role.dto';
import { RoleIds } from '../enum/role.enum';
import { RoleService } from '../services/role.service';

@Controller('role')
@Auth()
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
  @Get('all')
  async getAllRoles() {
    return this.roleService.findAll();
  }

  /**
   * Endpoint para ver los roles de un usuario con id especifico. - solo admins.
   * @param query id del usuario
   * @returns 
   */
  @Get('all/{id}')
  async getRoleById(@Param('id') id: number) {
    return this.roleService.findById(id);
  }

}
