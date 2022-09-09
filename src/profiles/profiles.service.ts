import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly usersService: UsersService,
  ) {}
  /**
   * @description create student and teacher profile
   * @param inputs createProfileDto
   * @returns Profile Response
   */
  async create(createProfileDto: CreateProfileDto, user) {
    const users = await this.usersService.getById(user.id);
    const obj = {
      address: createProfileDto.address,
      phoneNumber: createProfileDto.phoneNumber,
      user: users,
    };
    const result = await this.profileRepository.save(obj);
    return result;
  }

  /**
   * @description to find profile by profile id
   * @param inputs userId
   * @returns Course Response
   */
  async getById(id) {
    const profile = await this.profileRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (!profile) {
      throw new NotFoundException('profile with this id not found');
    } else {
      return profile;
    }
  }
}
