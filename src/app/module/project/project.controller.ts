import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { Prisma } from "@prisma/client";

// Create
const createProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.createProject(req.body);
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing input. Please check your data.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong creating the project. Please try again later.",
    });
  }
};

// Get All
const getAllProjects = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.getAllProjects();
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "No projects found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching projects. Please try again later.",
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching project. Please try again later.",
    });
  }
};

// Update
const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ProjectService.updateProject(id, req.body);

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while updating project. Please try again later.",
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
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting project. Please try again later.",
    });
  }
};

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
