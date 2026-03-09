import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/api/user/services/user.service';
import { errorMessages } from 'src/errors/custom';
import { LoginUserDTO, PayloadDto, RegisterUserDTO } from '../dto/auth.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from 'src/events/userRegistered.event';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async login(user: LoginUserDTO) {
    const { email, password } = user;
    const alreadyExistingUser = await this.userService.findByEmail(email);

    if (!alreadyExistingUser)
      throw new UnauthorizedException(errorMessages.auth.wrongCredentials);

    const isValidPassword = await this.userService.comparePassword(
      password,
      alreadyExistingUser.password,
    );

    if (!isValidPassword)
      throw new UnauthorizedException(errorMessages.auth.wrongCredentials);

    return this.generateToken({
      id: alreadyExistingUser.id,
      email,
    });
  }

  async register(user: RegisterUserDTO) {
    const alreadyExistingUser = await this.userService.findByEmail(user.email);

    if (alreadyExistingUser)
      throw new ConflictException(errorMessages.auth.userAlreadyExist);

    const newUser = await this.userService.createUser(user);

    //emitimos el evento
    this.eventEmitter.emit(
      'user.registered',
      new UserRegisteredEvent(newUser.id, newUser.email)
    );

    return {
      message: 'success',
    };
  }

  async generateToken(payload: PayloadDto) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.secret'),
    });

    return { accessToken };
  }
}
