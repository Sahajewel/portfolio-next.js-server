import {Router} from "express"
import { UserController } from "./user.controller";
const router = Router();
router.post("/register", UserController.createUser)
router.post("/login", UserController.login)
router.get("/", UserController.getUser)
router.get("/:id", UserController.getSingleUser)
router.patch("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)

export const UserRoutes = router;