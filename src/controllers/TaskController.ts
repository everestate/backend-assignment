import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
 
import { Task } from "../entities/Task";

class TaskController {
  static getAll = async (req: Request, res: Response) => {
    const projectId: number = req.params.projectId;
    let taskEntityRepo = getRepository(Task)
                          .createQueryBuilder("tasks")                         
                          .innerJoinAndSelect("tasks.project", "project").where("project.id == :projectId", {projectId: projectId});
    
    let strCompleted:string = req.query.completed || ''; 
    if(strCompleted) { 
      const completed = strCompleted === "true" || strCompleted === "1" ? 1 : 0;
      taskEntityRepo = taskEntityRepo.andWhere("tasks.completed == :completed", {completed: completed});
    }

    const tasks = await taskEntityRepo.getMany();

    res.send(tasks);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;

    const taskEntityRepo = getRepository(Task); 
    const task = await taskEntityRepo.findOne(id, {
      select: ["id", "task", "completed"]
    });

    if(!task) {
      res.status(404).send({ error: `Task with id ${id} not found` });
      return;
    }

    res.send(task);
  };

  static createTask = async (req: Request, res: Response) => {
    const projectId = req.params.projectId; 
    const taskEntityRepo = getRepository(Task);
    
    try{

      const task_entity = <Task>{
        ...req.body,
        project: projectId
      };

      const errors = await validate(task_entity);
      if (errors.length > 0) {
        res.status(422).send(errors[0].constraints);
        return;
      }

      await taskEntityRepo.save(task_entity);
      res.status(201).send({
        message: "Task created!",
        task: {
          id: task_entity.id,
          task: task_entity.task,
          project: task_entity.project,
          completed: task_entity.completed
        }
      });

    } catch(err) {
      console.log(err);
      res.status(500).send({ error: "Creating task failed!!!" });     
    }  
  };

  static editTask = async (req: Request, res: Response) => {
    const id = req.params.id;
    const projectId = req.params.projectId;
    const taskEntityRepo = getRepository(Task);

    try{
      let task_entity = await taskEntityRepo.findOne(id);
      if(!task_entity) {
        res.status(404).send({ error: `Task with id ${id} not found` });
        return 
      }

      task_entity = <Task>{
        ...task_entity,
        ...req.body
      };

      const errors = await validate(task_entity);
      if (errors.length > 0) {
        res.status(422).send(errors[0].constraints);
        return;
      }

      await taskEntityRepo.save(task_entity);
      res.status(200).send({
        message: "Task updated!",
        task: {
          id: task_entity.id,
          task: task_entity.task,
          project: task_entity.project,
          completed: task_entity.completed
        }
      });

    } catch(err) {
      res.status(500).send({ error: "Updating task failed!!!" });     
    }   
  };

  static deleteTask = async (req: Request, res: Response) => {
    const id = req.params.id;

    const taskEntityRepo = getRepository(Task);

    const exist_task = await taskEntityRepo.findOne(id);
    if(!exist_task) {
      res.status(404).send({ message: `Task with id ${id} not found`})
    }

    await taskEntityRepo.delete(id);
    res.status(204).send();
  };
}

export default TaskController;
