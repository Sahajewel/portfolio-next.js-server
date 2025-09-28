import {Router} from "express"
import { ResumeController } from "./resume.controller";

const router = Router();
router.post("/create-resume", ResumeController.createResume)
router.get("/", ResumeController.getResumes)
router.get("/:id", ResumeController.getResumeById)
router.patch("/:id", ResumeController.updateResume)
router.delete("/:id", ResumeController.deleteResume)

export const ResumeRoutes = router;