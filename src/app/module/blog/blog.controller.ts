import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import { Prisma } from "@prisma/client";

// CREATE blog
const createBlog = async (req: Request, res: Response) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty. Provide blog details.",
      });
    }

    const blog = await BlogService.createBlog(req.body);

    res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      data: blog,
    });
  } catch (error: any) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          message: "Duplicate field value. Blog slug must be unique.",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Database request error. Please check your query.",
      });
    }
     if(error instanceof Prisma.PrismaClientValidationError){
                return res.status(400).json({
                    success: false,
                    message: "Invalid or missing input. Please check your data"
                })
            }

    res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while creating the blog.",
    });
  }
};

// GET all blogs
const getAllBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found.",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully.",
      data: blogs,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while fetching blogs.",
    });
  }
};

// GET single blog
const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required.",
      });
    }

    const blog = await BlogService.getSingleBlog(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single Blog fetched successfully.",
      data: blog,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while fetching the blog.",
    });
  }
};

// UPDATE blog
const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required.",
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty. Provide fields to update.",
      });
    }

    const updatedBlog = await BlogService.updateBlog(id, req.body);

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  } catch (error: any) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while updating the blog.",
    });
  }
};

// DELETE blog
const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required.",
      });
    }

    const deletedBlog = await BlogService.deleteBlog(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
      data: deletedBlog,
    });
  } catch (error: any) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while deleting the blog.",
    });
  }
};

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
