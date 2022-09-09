import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role.enum';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ default: Role.Student })
  roles: Role;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn({ type: 'timestamp' })
  created!: Date;

  @Column()
  address: string;
}
