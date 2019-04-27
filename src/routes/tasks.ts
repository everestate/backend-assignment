import { Router } from "express"; 
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import TaskController from "../controllers/TaskController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN", "USER"])],
  TaskController.getAll
);

router.get(
  "pro/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN", "USER"])],
  TaskController.getOneById
);

router.post(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  TaskController.createTask
);

router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  TaskController.editTask
);

router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  TaskController.deleteTask
);

export default router;
