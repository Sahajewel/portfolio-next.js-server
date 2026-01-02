// app/modules/project/project.controller.ts
import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { Prisma, ProjectCategory } from "@prisma/client";

// Create
const createProject = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { title, description, category, technologies } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // Validate category if provided
    if (category && !Object.values(ProjectCategory).includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${Object.values(
          ProjectCategory
        ).join(", ")}`,
      });
    }

    // Prepare payload
    const payload: Prisma.ProjectCreateInput = {
      title,
      description,
      technologies: technologies || [],
      category: category || ProjectCategory.FULLSTACK, // Default to FULLSTACK
      featured: req.body.featured || false,
    };

    // Optional fields
    if (req.body.thumbnail) payload.thumbnail = req.body.thumbnail;
    if (req.body.liveUrl) payload.liveUrl = req.body.liveUrl;
    if (req.body.githubUrl) payload.githubUrl = req.body.githubUrl;

    const result = await ProjectService.createProject(payload);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Create project error:", error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing input. Please check your data.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong creating the project.",
    });
  }
};

// Get All
const getAllProjects = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.getAllProjects();

    res.status(200).json({
      success: true,
      message: result.length
        ? "Projects fetched successfully"
        : "No projects found",
      data: result,
    });
  } catch (error) {
    console.error("Get all projects error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching projects.",
    });
  }
};

// Get Projects by Category
const getProjectsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;

    // Validate category
    if (!Object.values(ProjectCategory).includes(category as ProjectCategory)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${Object.values(
          ProjectCategory
        ).join(", ")}`,
      });
    }

    const result = await ProjectService.getProjectsByCategory(
      category as ProjectCategory
    );

    res.status(200).json({
      success: true,
      message: result.length
        ? "Projects fetched successfully"
        : "No projects found in this category",
      data: result,
    });
  } catch (error) {
    console.error("Get projects by category error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching projects by category.",
    });
  }
};

// Get Single
const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ProjectService.getProjectById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Get project by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching project.",
    });
  }
};

// Update
const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate category if provided
    if (
      req.body.category &&
      !Object.values(ProjectCategory).includes(req.body.category)
    ) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${Object.values(
          ProjectCategory
        ).join(", ")}`,
      });
    }

    const result = await ProjectService.updateProject(id, req.body);

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Update project error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while updating project.",
    });
  }
};

// Delete
const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProjectService.deleteProject(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete project error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting project.",
    });
  }
};

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectsByCategory,
  getProjectById,
  updateProject,
  deleteProject,
};
