import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty, IsEnum } from "class-validator";

import { User } from "./User"; 

export enum ProjectStatus {
  TODO = 'todo',
  INPROGRESS = 'inprogress',
  DONE = 'done'
}

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 100)
  name: string;

  @ManyToOne(_type => User)
  @JoinColumn({ name: "user_id" })
  user!: User;


  @IsEnum(ProjectStatus)
  @Column()
  status: ProjectStatus;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
