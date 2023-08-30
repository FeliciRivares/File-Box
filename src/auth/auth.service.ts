import { UserEntity } from './../user/entities/user.entity';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from './../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.userService.create(dto);
      return { token: this.jwtService.sign({id: userData.id}) };
    } catch (error) {
      console.error('Register Error:', error);
      throw new ForbiddenException('Register Error');
    }
  }

  async login(user: UserEntity) {
    return { token: this.jwtService.sign({ id: user.id }) };
  }
}
