import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import User from '../user/user.entity';

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) {
  const headers = request.headers;
  const userRepository = getRepository(User);
  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET;
    let token: string = headers.authorization;
    token = token.slice(7, token.length).trimLeft();
    console.log(headers);
    try {
      const verificationResponse = jwt.verify(
        token,
        secret,
      ) as DataStoredInToken;
      const id = verificationResponse.id;
      const user = await userRepository.findOne(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
