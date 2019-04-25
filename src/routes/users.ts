import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], UsersController.getAllUsers);

router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UsersController.getOneById
);

router.post("/", [checkJwt, checkRole(["ADMIN"])], UsersController.newUser);

router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UsersController.editUser
);

router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UsersController.deleteUser
);

export default router;
