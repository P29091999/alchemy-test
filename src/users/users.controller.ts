import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public() //put public on the api's that user can acces without login in
  @Post('/SignUp')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Public()
  @Get('/FindAllUsers')
  async findAll() {
    return await this.usersService.getAll();
  }

  @Public()
  @Get('FindUserById/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.getById(+id);
  }
}
