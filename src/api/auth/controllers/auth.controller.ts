import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDTO, RegisterUserDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() user: LoginUserDTO) {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() user: RegisterUserDTO) {
    return this.authService.register(user);
  }
}
