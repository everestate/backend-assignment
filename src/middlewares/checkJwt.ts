import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["jwt-token"];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  const { userId, username } = jwtPayload;
  res.locals.userId = userId;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "2h"
  });
  res.setHeader("token", newToken);

  next();
};
