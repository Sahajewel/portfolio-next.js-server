import { Router } from "express";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/create-project", ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/category/:category", ProjectController.getProjectsByCategory);
router.get("/:id", ProjectController.getProjectById);
router.patch("/:id", ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

export const ProjectRoutes = router;
