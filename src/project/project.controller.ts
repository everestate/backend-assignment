import * as express from 'express';
import { getRepository } from 'typeorm';
import ProjectNotFoundException from '../exceptions/ProjectNotFoundException';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreateProjectDto from './project.dto';
import { Project } from './project.entity';

class ProjectController implements Controller {
  public path = '/projects';
  public router = express.Router();
  private projectRepository = getRepository(Project);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProjects);
    this.router.get(`${this.path}/:id`, this.getProjectById);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateProjectDto, true),
        this.modifyProject,
      )
      .delete(`${this.path}/:id`, this.deleteProject)
      .post(
        this.path,
        authMiddleware,
        validationMiddleware(CreateProjectDto),
        this.createProject,
      );
  }

  private createProject = async (
    request: RequestWithUser,
    response: express.Response,
  ) => {
    const postData: CreateProjectDto = request.body;
    const newProject = this.projectRepository.create({
      ...postData,
      users: [request.user],
    });
    await this.projectRepository.save(newProject);
    newProject.users = undefined;
    response.send(newProject);
  }

  private getAllProjects = async (
    request: express.Request,
    response: express.Response,
  ) => {
    const posts = await this.projectRepository.find({
      relations: ['categories'],
    });
    response.send(posts);
  }

  private getProjectById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    const id = request.params.id;
    const post = await this.projectRepository.findOne(id, {
      relations: ['categories'],
    });
    if (post) {
      response.send(post);
    } else {
      next(new ProjectNotFoundException(id));
    }
  }

  private modifyProject = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    const id = request.params.id;
    const postData: Project = request.body;
    await this.projectRepository.update(id, postData);
    const updatedProject = await this.projectRepository.findOne(id);
    if (updatedProject) {
      response.send(updatedProject);
    } else {
      next(new ProjectNotFoundException(id));
    }
  }

  private deleteProject = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    const id = request.params.id;
    const deleteResponse = await this.projectRepository.delete(id);
    if (deleteResponse.raw[1]) {
      response.sendStatus(200);
    } else {
      next(new ProjectNotFoundException(id));
    }
  }
}

export default ProjectController;
