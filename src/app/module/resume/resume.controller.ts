import { Request, Response } from "express";
import { ResumeService } from "./resume.service";
import { Prisma } from "@prisma/client";

const createResume = async (req: Request, res: Response) => {
  try {
    const result = await ResumeService.createResume(req.body);
    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while creating resume",
    });
  }
};

const getResumes = async (_req: Request, res: Response) => {
  try {
    const result = await ResumeService.getResumes();
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No resumes found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Resumes fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching resumes",
    });
  }
};

const getResumeById = async (req: Request, res: Response) => {
  try {
    const result = await ResumeService.getResumeById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Resume fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching resume",
    });
  }
};

const updateResume = async (req: Request, res: Response) => {
  try {
    const result = await ResumeService.updateResume(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      data: result,
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return res.status(404).json({
              success: false,
              message: "User not found.",
            });
          }
    
          return res.status(400).json({
            success: false,
            message: "Database request error. Please check your query.",
          });
        }
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while updating resume",
    });
  }
};

const deleteResume = async (req: Request, res: Response) => {
  try {
    await ResumeService.deleteResume(req.params.id);
    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while deleting resume",
    });
  }
};

export const ResumeController = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
