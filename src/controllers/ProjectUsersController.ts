import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Project } from "../entities/Project";
import { User } from "../entities/User";

class ProjectUsersController {
  static getAll = async (req: Request, res: Response) => {
    const projectId = req.body.projectId;
    const projectEntityRepo = getRepository(Project);

    const project = await projectEntityRepo.findOneOrFail(projectId, { relations: ["users"] });

    project.users = await projectEntityRepo
      .createQueryBuilder("project")
      .relation(Project, "users")
      .of(project)
      .loadMany();

    res.send(project.users);
  };
 

  static createUser = async (req: Request, res: Response) => {
    let { userId } = req.body;
    const projectId = req.params.projectId;

    const projectEntityRepo = getRepository(Project);
    const userEntityRepo = getRepository(User);
    try {
      const user = await userEntityRepo.findOneOrFail(userId);
      const project = await projectEntityRepo.findOneOrFail(projectId, { relations: ["users"] });

      await projectEntityRepo
        .createQueryBuilder("project")
        .relation(Project, "users")
        .of(project)
        .add(user);

      res.status(201).send({
        message: "User has been added to project",
        user: user
      });

    } catch (e) {
      res.status(500).send({ error: "Saving project failed!!!", e });
    }



  };



  static deleteUser = async (req: Request, res: Response) => {
    const { id, projectId } = req.params;


    const projectEntityRepo = getRepository(Project);
    try {
      const project = await projectEntityRepo.findOne(projectId, { relations: ["users"] });
      project.users = await projectEntityRepo
        .createQueryBuilder("project")
        .relation(Project, "users")
        .of(project)
        .loadMany();


      project.users = project.users.filter(v => v.id != id);
      await projectEntityRepo.save(project);

      res.status(204).send();

    } catch (error) {
      res.status(500).send({ error: "Project could not be deleted!" });
      return;
    } 
  };


}

export default ProjectUsersController;
