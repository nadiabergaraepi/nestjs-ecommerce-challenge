import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { RoleAssignedListener } from './listeners/roleAssigned.listener';
import { Role } from 'src/database/entities/role.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, RoleAssignedListener],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User, Role])],
})
export class UserModule { }
