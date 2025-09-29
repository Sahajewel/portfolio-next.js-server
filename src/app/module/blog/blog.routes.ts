import { Router } from "express";
import { BlogController } from "./blog.controller";
import { verifyToken } from "../../middleware/auth";

const router = Router();

router.post("/create-blog",verifyToken, BlogController.createBlog);
router.get("/",verifyToken, BlogController.getAllBlogs);
router.get("/:id", BlogController.getSingleBlog);
router.patch("/:id", BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);

export const BlogRoutes = router;
