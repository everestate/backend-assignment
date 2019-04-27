import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Project } from "./Project";


@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @ManyToOne(_type => Project)
  @JoinColumn({ name: "project_id" })
  project!: Project;

  @Column({ default: false })
  completed: boolean;
}
