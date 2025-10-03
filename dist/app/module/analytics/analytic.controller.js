"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analytic_service_1 = require("./analytic.service");
const client_1 = require("@prisma/client");
const createAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield analytic_service_1.AnalyticsService.createAnalytics(req.body);
        res.status(201).json({
            success: true,
            message: "Analytics created successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing input. Please check your data"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while creating analytics",
        });
    }
});
const getAnalytics = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield analytic_service_1.AnalyticsService.getAnalytics();
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while fetching analytics",
        });
    }
});
const getAnalyticsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield analytic_service_1.AnalyticsService.getAnalyticsById(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while fetching analytics",
        });
    }
});
const updateAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield analytic_service_1.AnalyticsService.updateAnalytics(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Analytics updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while updating analytics",
        });
    }
});
const deleteAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield analytic_service_1.AnalyticsService.deleteAnalytics(req.params.id);
        res.status(200).json({
            success: true,
            message: "Analytics deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while deleting analytics",
        });
    }
});
exports.AnalyticsController = {
    createAnalytics,
    getAnalytics,
    getAnalyticsById,
    updateAnalytics,
    deleteAnalytics,
};
