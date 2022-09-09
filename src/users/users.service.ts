import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './role.enum';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(data): Promise<User> {
    if (data.password != null || data.password != undefined) {
      data.password = await this.hashPassword(data.password);
    }
    return this.userRepository.save(data);
  }

  async getwithRole(role: Role): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { roles: role },
    });
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) {
      return user;
    }
  }

  async getById(id): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  //this is used for validate the user email and password for login and it is called in the auth modules
  async validateUser(email: string, pass: string) {
    try {
      const user1 = await this.userRepository.findOne({
        where: { email: email },
      });
      console.log('user1', user1);

      if (!user1) {
        throw new UnauthorizedException('Email/password incorrect');
      }
      const isMatch = await this.comparePassword(user1.password, pass);
      if (!isMatch) {
        throw new UnauthorizedException('Email/password incorrect');
      }
      const { password, ...user } = user1;
      return user;
    } catch (ex) {
      throw ex;
    }
  }

  async hashPassword(pass) {
    try {
      console.log('entered password hashing');
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(pass, saltOrRounds);

      if (hash) {
        return hash;
      }
    } catch (err) {
      throw err;
    }
  }

  async comparePassword(hash: string, userPassword: string): Promise<any> {
    try {
      // const isMatch = await bcrypt.compare(password, hash);
      const result = await bcrypt.compare(userPassword, hash);
      return result;
    } catch (ex) {
      throw ex;
    }
  }
}
