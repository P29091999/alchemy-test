/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authsService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('entered validate in jwt strategy', 'payload', payload);
    const obj = {
      id: payload.id,
      email: payload.email,
      roles: payload.roles,
    };
    console.log('obj in validate in jwt strategy', obj);

    return obj;
  }
}
