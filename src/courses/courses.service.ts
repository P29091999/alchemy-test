import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * @description to create courses in the database by the teacher
   * @param inputs createCourseDto
   * @returns Course Response
   */

  async create(createCourseDto: CreateCourseDto, user) {
    const users = await this.usersService.getById(user.id);

    const course = await this.findbyname(createCourseDto.title);
    if (course) {
      throw new BadRequestException('A course with this title already exists');
    } else {
      const obj = {
        title: createCourseDto.title,
        slug: createCourseDto.slug,
        description: createCourseDto.description,
        user: [],
        noOfSeats: createCourseDto.noOfSeats,
        seatsFilling: 0,
      };
      obj.user = [users];
      const result = await this.courseRepository.save(obj);
      return result;
    }
  }

  /**
   * @description to join courses in the database by the student
   * @param inputs userId and course Id
   * @returns Course Response
   */

  async joinCourse(user, CID) {
    const users = await this.usersService.getById(user.id);
    const course = await this.getById(CID);
    if (course?.seatsFilling >= course?.noOfSeats) {
      throw new BadRequestException('seat booked for this course');
    }
    if (course) {
      course.user.push(users);
      const id = course?.id;

      const result = await this.courseRepository.save(course);
      await this.courseRepository.update(
        {
          id: Number(CID),
        },
        {
          seatsFilling: course?.seatsFilling + 1,
        },
      );
      return result;
    } else {
      throw new BadRequestException('A course with this ID Does Not exists');
    }
  }

  /**
   * @description to find course by name so a we can check at the time of creating new course
   * @param inputs user ]Id and course Id
   * @returns Course Response
   */
  async findbyname(name) {
    return await this.courseRepository.findOne({
      where: { title: name },
    });
  }

  /**
   * @description  to find course by course id
   * @param inputs course Id
   * @returns Course Response
   */
  async getById(id) {
    const course = await this.courseRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (!course) {
      throw new NotFoundException('course with this id not found');
    } else {
      return course;
    }
  }

  /**
   * @description  to find all existing courses
   * @returns Course Response
   */

  async findAll() {
    return await this.courseRepository.find({
      relations: ['user', 'lectures'],
    });
  }

  /**
   * @description  to remove any course by the teacher only
   * @returns Course Response
   */
  async remove(user, id: number) {
    const course = await this.courseRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (course) {
      let check;
      const users = course.user;
      await users.forEach(function (element) {
        if (element.id === user.id) {
          console.log('user true');
        }
      });
      if (check) {
        const result = await this.courseRepository.delete({
          id,
        });
        if (!result) {
          throw new NotFoundException('unable to delete course');
        } else {
          return result;
        }
      } else {
        throw new UnauthorizedException(
          'You are not able to delete some one else course',
        );
      }
    }
  }
}
