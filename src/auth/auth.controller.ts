import { LocalAuthGuard } from './guards/local.guard';
import { UserEntity } from './../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)


  @Post('login')
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req: any) {
    return this.authService.login(req.user as UserEntity)
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
