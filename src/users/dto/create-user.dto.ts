import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  roles: Role;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;
}
