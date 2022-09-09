import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async Login(@Body() createAuthDto: LoginUserDto) {
    return await this.authService.validateUser(
      createAuthDto.email,
      createAuthDto.password,
    );
  }
}
