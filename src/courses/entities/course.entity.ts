import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
@Unique(['title'])
@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  noOfSeats: number;

  @Column()
  seatsFilling: number;

  @CreateDateColumn({ type: 'timestamp' })
  created!: Date;

  @ManyToMany(() => User)
  @JoinTable()
  user: User[];
}
