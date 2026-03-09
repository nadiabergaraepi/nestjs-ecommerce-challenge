import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../database/entities/role.entity';
import { UserModule } from '../user/user.module';
import { User } from '../../database/entities/user.entity';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { UserRegisteredListener } from './listener/userRegistered.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User]), UserModule],
  controllers: [RoleController],
  providers: [RoleService, UserRegisteredListener],
  exports: [RoleService],
})
export class RoleModule { }
