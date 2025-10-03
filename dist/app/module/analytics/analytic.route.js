"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRoutes = void 0;
const express_1 = require("express");
const analytic_controller_1 = require("./analytic.controller");
const router = (0, express_1.Router)();
// Create Analytics
router.post("/create-analytic", analytic_controller_1.AnalyticsController.createAnalytics);
// Get all Analytics
router.get("/", analytic_controller_1.AnalyticsController.getAnalytics);
// Get single Analytics by ID
router.get("/:id", analytic_controller_1.AnalyticsController.getAnalyticsById);
// Update Analytics
router.patch("/:id", analytic_controller_1.AnalyticsController.updateAnalytics);
// Delete Analytics
router.delete("/:id", analytic_controller_1.AnalyticsController.deleteAnalytics);
exports.AnalyticsRoutes = router;
