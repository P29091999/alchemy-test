import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@ApiTags('courses')
@Controller('courses')
@ApiBearerAuth()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(Role.Teacher)
  @UseGuards(RolesGuard)
  @Post('/Createcourse')
  create(@Request() req, @Body() createCourseDto: CreateCourseDto) {
    console.log('req.user', req.user);
    return this.coursesService.create(createCourseDto, req.user);
  }

  @Roles(Role.Student)
  @UseGuards(RolesGuard)
  @Post('/joinCourse/:CourseId')
  EnrollCourse(@Request() req, @Param('CourseId') CourseId: string) {
    console.log('req.user', req.user);
    return this.coursesService.joinCourse(req.user, +CourseId);
  }

  @Get('/getAllCourses')
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Get('/getCourseById/:id')
  async findOne(@Param('id') id: string) {
    return await this.coursesService.getById(+id);
  }

  @Roles(Role.Teacher)
  @UseGuards(RolesGuard)
  @Delete('/deleteCourse/:id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.coursesService.remove(req.user, +id);
  }
}
