import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
