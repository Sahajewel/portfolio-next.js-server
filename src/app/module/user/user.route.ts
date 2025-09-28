import {Router} from "express"
import { UserController } from "./user.authcontroller";
const router = Router();
router.post("/register", UserController.createUser)
router.get("/", UserController.getUser)
router.get("/:id", UserController.getSingleUser)
router.patch("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)

export const UserRoutes = router;