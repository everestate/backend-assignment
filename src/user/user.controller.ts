import { Length } from 'class-validator';
import * as express from 'express';
import { getRepository } from 'typeorm';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from './user.dto';
import User from './user.entity';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  private userRepository = getRepository(User);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.getAllUser);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
    this.router.post(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateUserDto),
      this.createUser);
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateUserDto, true),
      this.modifyUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteUser);
  }

  private getAllUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
    const users = await this.userRepository.find();
    response.send(users);
  }

  private getUserById = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
    const id = +request.params.id;
    const user = await this.userRepository.findOne(id);
    if (!user) {
      next(new UserNotFoundException(id));
      return;
    }

    response.send(user);
  }

  private createUser = async (request: express.Request, response: express.Response) => {
    const userData: CreateUserDto = request.body;
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    response.send(newUser);
  }

  private modifyUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = +request.params.id;
    const userData: User = request.body;
    await this.userRepository.update(id, userData);
    const updatedUser = await this.userRepository.findOne(id);
    if (!updatedUser) {
      next(new UserNotFoundException(id));
      return;
    }

    response.send(updatedUser);
  }

  private deleteUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const deleteResponse = await this.userRepository.delete(id);
    if (deleteResponse.raw.Length === 0) {
      next(new UserNotFoundException(id));
      return;
    }

    response.sendStatus(204);
  }
}

export default UserController;
