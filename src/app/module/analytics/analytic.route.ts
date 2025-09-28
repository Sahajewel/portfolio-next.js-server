import { Router } from "express";
import { AnalyticsController } from "./analytic.controller";


const router = Router();

// Create Analytics
router.post("/create-analytic", AnalyticsController.createAnalytics);

// Get all Analytics
router.get("/", AnalyticsController.getAnalytics);

// Get single Analytics by ID
router.get("/:id", AnalyticsController.getAnalyticsById);

// Update Analytics
router.patch("/:id", AnalyticsController.updateAnalytics);

// Delete Analytics
router.delete("/:id", AnalyticsController.deleteAnalytics);

export const AnalyticsRoutes = router;
