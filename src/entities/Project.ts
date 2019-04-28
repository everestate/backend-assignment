import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { User } from "./User";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 100)
  name: string;

  @ManyToMany(_type => User, {
    cascade: true
  })
  @JoinTable()
  users: User[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
