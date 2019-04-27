import { Router } from "express";
import ProjectController from "../controllers/ProjectController";
import TaskController from "../controllers/TaskController";

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN", "USER"])],
  ProjectController.getAll
);

router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN", "USER"])],
  ProjectController.getOneById
);

router.post(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.createProject
);

router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.editProject
);

router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.deleteProject
);

 

router.get(
  "/:projectId([0-9]+)/tasks",
  [checkJwt, checkRole(["ADMIN", "USER"])],
  TaskController.getAll
);

router.get(
  "/:projectId([0-9]+)/tasks/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN", "USER"])],
  TaskController.getOneById
);

router.post(
  "/:projectId([0-9]+)/tasks",
  [checkJwt, checkRole(["ADMIN"])],
  TaskController.createTask
);

router.patch(
  "/:projectId([0-9]+)/tasks/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  TaskController.editTask
);

router.delete(
  "/:projectId([0-9]+)/tasks/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  TaskController.deleteTask
);

export default router;
