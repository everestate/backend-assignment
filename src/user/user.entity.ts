import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import { Project } from '../project/project.entity';

@Entity('users')
@Unique(['username'])
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Length(4, 20)
  public username: string;

  @Column()
  @Length(4, 100)
  public password: string;

  @Column()
  @IsNotEmpty()
  public role: string;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToMany(() => Project, (project: Project) => project.users)
  public projects?: Project[];

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public validateDecrpytedPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
