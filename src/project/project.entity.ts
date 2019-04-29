import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IsEnum, IsNotEmpty, Length } from 'class-validator';

import User from '../user/user.entity';

export enum ProjectStatus {
  TODO = 'todo',
  INPROGRESS = 'inprogress',
  DONE = 'done',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;

  @ManyToMany(() => User, (user: User) => user.projects)
  @JoinTable()
  public users: User[];

  @IsEnum(ProjectStatus)
  @Column()
  public status: ProjectStatus;
}
