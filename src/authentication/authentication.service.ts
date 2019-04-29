import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import CreateUserDto from 'user/user.dto';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import User from '../user/user.entity';
import LogInDto from './logIn.dto';

class AuthenticationService {
  private userRepository = getRepository(User);

  public loggingIn = async (logInData: LogInDto) => {
    const user = await this.userRepository.findOne({
      username: logInData.username,
    });
    if (!user) {
      throw new WrongCredentialsException();
    }
    const isPasswordMatching = await bcrypt.compare(
      logInData.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new WrongCredentialsException();
    }

    user.password = undefined;
    const tokenData = this.createToken(user);
    return {
      user,
      tokenData,
    };
  }

  public async register(userData: CreateUserDto) {
    if (
      await this.userRepository.findOne({ username: userData.username })
    ) {
      throw new UserWithThatEmailAlreadyExistsException(userData.username);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    user.password = undefined;
    const tokenData = this.createToken(user);
    return {
      tokenData,
      user,
    };
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      id: user.id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
