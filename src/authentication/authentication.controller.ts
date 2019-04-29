import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../user/user.dto';
import AuthenticationService from './authentication.service';
import LogInDto from './logIn.dto';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.login);
  }

  private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const loginData: LogInDto = request.body;
    try {
      const {
        tokenData,
        user,
      } = await this.authenticationService.loggingIn(loginData);

      const responseData = {
        tokenData,
        user,
      };

      response.send(responseData);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthenticationController;
