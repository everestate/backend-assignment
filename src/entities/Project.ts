import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { User } from "./User";
import { ProjectStatus } from "../enums/ProjectStatus";

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


  @Column({ type: "simple-enum", enum: ProjectStatus, default: ProjectStatus.TODO })
  status: ProjectStatus;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
