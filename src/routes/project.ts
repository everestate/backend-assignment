import { Router } from "express";
import ProjectController from "../controllers/ProjectController";
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

export default router;
