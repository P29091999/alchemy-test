/* eslint-disable prefer-const */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * @description to validate the user
   * @param inputs email and pass
   * @returns Profile Response
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(email, pass);
    if (user) {
      const newUser = this.loginUser(user);
      return newUser;
    } else {
      throw new UnauthorizedException('Inavalid User Name or password');
    }
  }

  /**
   * @description login user
   * @param inputs email and pass
   * @returns token and user data
   */
  async loginUser(user: any) {
    const access_token = await this.generateToken(user);
    return {
      access_token: access_token,
      user,
      roles: user.roles,
    };
  }

  /**
   * @description to validate the user
   * @param inputs email and pass
   * @returns Profile Response
   */
  async generateToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
