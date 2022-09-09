import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('profiles')
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('createProfile')
  async create(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    console.log('request', req.user);
    return await this.profilesService.create(createProfileDto, req.user);
  }

  @Get('findMyProfile')
  findOne(@Request() req) {
    return this.profilesService.getById(req.user.id);
  }
}
