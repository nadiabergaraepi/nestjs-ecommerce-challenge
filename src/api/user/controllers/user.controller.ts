import { Controller, Get, Param } from '@nestjs/common';
import { Auth, Roles } from 'src/api/auth/guards/auth.decorator';
import { CurrentUser } from 'src/api/auth/guards/user.decorator';
import { Serialize } from 'src/common/helper/serialize.interceptor';
import { User } from 'src/database/entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { RoleIds } from 'src/api/role/enum/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Auth()
  @Serialize(UserDto)
  @Get('profile')
  profile(@CurrentUser() user: User) {
    return this.userService.findById(user.id);
  }

  @Roles(RoleIds.Admin)
  @Get(':id/roles')
  async getUserRoles(@Param('id') id: string) {
    return this.userService.findRolesByUserId(Number(id));
  }
}
