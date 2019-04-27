import { Router, Request, Response } from "express";
import auth from "./auth";
import users from "./users";
import project from "./project"; 
const routes = Router();

routes.use("/auth", auth);
routes.use("/users", users);
routes.use("/project", project); 

export default routes;
