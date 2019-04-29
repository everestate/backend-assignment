import * as request from 'supertest';
import * as typeorm from 'typeorm';
import App from '../../src/app';
import AuthenticationController from '../../src/authentication/authentication.controller';
import LogInDto from '../../src/authentication/logIn.dto';

(typeorm as any).getRepository = jest.fn();

describe('The AuthenticationController', () => {
  describe('POST /auth/login', () => {
    describe('if the username and password are valid', () => {
      it('should return user and token data', async () => {
        const userData: LogInDto = {
          username: 'admin',
          password: 'admin',
        };

        const tokenData = {
          expiresIn: 3600,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        };

        const userfindOne = {
          id: 1,
          username: 'admin',
          role: 'ADMIN',
          password:
            '$2a$08$6sF86exRDQVagKLYHFM4t.FEWYWp3HtLDMCGblb4nL6iqN6h5ScqO',
          createdAt: '2019-04-25T19:18:46.000Z',
          updatedAt: '2019-04-25T19:18:46.000Z',
        };

        const userReturnedData = {
          id: 1,
          username: 'admin',
          role: 'ADMIN',
          createdAt: '2019-04-25T19:18:46.000Z',
          updatedAt: '2019-04-25T19:18:46.000Z',
        };

        const returnData = {
          token: tokenData,
          user: userReturnedData,
        };

        process.env.JWT_SECRET = 'jwt_secret';
        (typeorm as any).getRepository.mockReturnValue({
          findOne: () => Promise.resolve(userfindOne),
        });

        const authenticationController = new AuthenticationController();
        const app = new App([authenticationController]);
        const response = await request(app.getServer())
          .post(`${authenticationController.path}/login`)
          .send(userData);

        expect(typeof response.body.tokenData.token).toEqual('string');
        expect(response.body.user.id).toBe(userReturnedData.id);
      });
    });
  });
});
