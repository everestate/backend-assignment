import * as typeorm from 'typeorm';
import AuthenticationService from '../../src/authentication/authentication.service';
import UserWithThatEmailAlreadyExistsException from '../../src/exceptions/UserWithThatEmailAlreadyExistsException';
import CreateUserDto from '../../src/user/user.dto';

(typeorm as any).getRepository = jest.fn();

describe('The AuthenticationService', () => {
  describe('when registering a user', () => {
    describe('if the email is already taken', () => {
      it('should throw an error', async () => {
        const userData: CreateUserDto = {
          username: 'john@smith.com',
          password: 'strongPassword123',
          role: 'USER',
        };
        (typeorm as any).getRepository.mockReturnValue({
          findOne: () => Promise.resolve(userData),
        });
        const authenticationService = new AuthenticationService();
        await expect(authenticationService.register(userData))
          .rejects.toMatchObject(new UserWithThatEmailAlreadyExistsException(userData.username));
      });
    });
    describe('if the email is not taken', () => {
      it('should not throw an error', async () => {
        const userData: CreateUserDto = {
          username: 'john@smith.com',
          password: 'strongPassword123',
          role: 'USER',
        };
        process.env.JWT_SECRET = 'jwt_secret';
        (typeorm as any).getRepository.mockReturnValue({
          findOne: () => Promise.resolve(undefined),
          create: () => ({
            ...userData,
            id: 0,
          }),
          save: () => Promise.resolve(),
        });
        const authenticationService = new AuthenticationService();
        await expect(authenticationService.register(userData))
          .resolves.toBeDefined();
      });
    });
  });
});
