import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator"; 

import { Project } from "../entities/Project";

class ProjectController {
  static getAll = async (req: Request, res: Response) => { 
    const projectEntityRepo = getRepository(Project);
    let queryBuilder =  projectEntityRepo 
                            .createQueryBuilder("projects");

    
    let name = req.query.name || ''; 
    if(name.length > 0) {
      name = name.replace('*', '%');      

      queryBuilder = queryBuilder
                    .where("projects.name like :name", {name: name });
    } 
    
    const projects = await queryBuilder.getMany();
     
    res.send(projects);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;

    const projectEntityRepo = getRepository(Project);
    try {
      const project = await projectEntityRepo.findOneOrFail(id, {
        select: ["id", "name"]
      });
      res.send(project);
    } catch (error) {
      res.status(500).send({ error: "Project not found" });
    }
  };

  static createProject = async (req: Request, res: Response) => {
    let { name } = req.body;
    let project = new Project();
    project.name = name;
    project.user = res.locals.userId;

    const errors = await validate(project);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const projectEntityRepo = getRepository(Project);
    try {
      projectEntityRepo.save(project);
    } catch (e) {
      res.status(500).send({ error: "Saving project failed!!!" });
      return;
    }

    res.status(200).send({
      message: "Project created",
      user: {
        id: project.id,
        name: project.name,
        user: project.user,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }
    });
  };

  static editProject = async (req: Request, res: Response) => {
    const id = req.params.id;

    const { name } = req.body;

    const projectEntityRepo = getRepository(Project);
    let project_entity;
    try {
      project_entity = await projectEntityRepo.findOneOrFail(id);
    } catch (error) {
      res.status(404).send({ error: "Project not found" });
      return;
    }

    project_entity.name = name;
    const errors = await validate(project_entity);
    if (errors.length > 0) {
      res.status(400).send(errors[0].constraints);
      return;
    }

    try {
      projectEntityRepo.save(project_entity);
    } catch (e) {
      res.status(409).send({ error: "Updating project failed!!!" });
      return;
    }
    res.status(201).send({
      message: "Project updated!",
      user: {
        id: project_entity.id,
        user: project_entity.name,
        createdAt: project_entity.updatedAt,
        updatedAt: project_entity.createdAt
      }
    });
  };

  static deleteProject = async (req: Request, res: Response) => {
    const id = req.params.id;

    const projectEntityRepo = getRepository(Project);
    try {
      await projectEntityRepo.findOneOrFail(id);
    } catch (error) {
      res.status(404).send({ error: "Project could not be deleted!" });
      return;
    }
    projectEntityRepo.delete(id);

    res.status(201).send({ message: "Project deleted!" });
  };
}

export default ProjectController;
