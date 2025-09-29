import { Request, Response } from "express";
import { AnalyticsService } from "./analytic.service";
import { Prisma } from "@prisma/client";


const createAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsService.createAnalytics(req.body);
    res.status(201).json({
      success: true,
      message: "Analytics created successfully",
      data: result,
    });
  } catch (error: any) {
     if(error instanceof Prisma.PrismaClientValidationError){
                return res.status(400).json({
                    success: false,
                    message: "Invalid or missing input. Please check your data"
                })
            }
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while creating analytics",
    });
  }
};

const getAnalytics = async (_req: Request, res: Response) => {
  try {
    const result = await AnalyticsService.getAnalytics();
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No analytics found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Analytics fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching analytics",
    });
  }
};

const getAnalyticsById = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsService.getAnalyticsById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Analytics not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Analytics fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching analytics",
    });
  }
};

const updateAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsService.updateAnalytics(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Analytics updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while updating analytics",
    });
  }
};

const deleteAnalytics = async (req: Request, res: Response) => {
  try {
    await AnalyticsService.deleteAnalytics(req.params.id);
    res.status(200).json({
      success: true,
      message: "Analytics deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while deleting analytics",
    });
  }
};

export const AnalyticsController = {
  createAnalytics,
  getAnalytics,
  getAnalyticsById,
  updateAnalytics,
  deleteAnalytics,
};
