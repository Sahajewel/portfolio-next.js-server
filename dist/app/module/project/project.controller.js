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
exports.ProjectController = void 0;
const project_service_1 = require("./project.service");
const client_1 = require("@prisma/client");
// Create
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (category && !Object.values(client_1.ProjectCategory).includes(category)) {
            return res.status(400).json({
                success: false,
                message: `Invalid category. Must be one of: ${Object.values(client_1.ProjectCategory).join(", ")}`,
            });
        }
        // Prepare payload
        const payload = {
            title,
            description,
            technologies: technologies || [],
            category: category || client_1.ProjectCategory.FULLSTACK, // Default to FULLSTACK
            featured: req.body.featured || false,
        };
        // Optional fields
        if (req.body.thumbnail)
            payload.thumbnail = req.body.thumbnail;
        if (req.body.liveUrl)
            payload.liveUrl = req.body.liveUrl;
        if (req.body.githubUrl)
            payload.githubUrl = req.body.githubUrl;
        const result = yield project_service_1.ProjectService.createProject(payload);
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Create project error:", error);
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
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
});
// Get All
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield project_service_1.ProjectService.getAllProjects();
        res.status(200).json({
            success: true,
            message: result.length
                ? "Projects fetched successfully"
                : "No projects found",
            data: result,
        });
    }
    catch (error) {
        console.error("Get all projects error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching projects.",
        });
    }
});
// Get Projects by Category
const getProjectsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        // Validate category
        if (!Object.values(client_1.ProjectCategory).includes(category)) {
            return res.status(400).json({
                success: false,
                message: `Invalid category. Must be one of: ${Object.values(client_1.ProjectCategory).join(", ")}`,
            });
        }
        const result = yield project_service_1.ProjectService.getProjectsByCategory(category);
        res.status(200).json({
            success: true,
            message: result.length
                ? "Projects fetched successfully"
                : "No projects found in this category",
            data: result,
        });
    }
    catch (error) {
        console.error("Get projects by category error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching projects by category.",
        });
    }
});
// Get Single
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield project_service_1.ProjectService.getProjectById(id);
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
    }
    catch (error) {
        console.error("Get project by ID error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching project.",
        });
    }
});
// Update
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validate category if provided
        if (req.body.category &&
            !Object.values(client_1.ProjectCategory).includes(req.body.category)) {
            return res.status(400).json({
                success: false,
                message: `Invalid category. Must be one of: ${Object.values(client_1.ProjectCategory).join(", ")}`,
            });
        }
        const result = yield project_service_1.ProjectService.updateProject(id, req.body);
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: result,
        });
    }
    catch (error) {
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
});
// Delete
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield project_service_1.ProjectService.deleteProject(id);
        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    }
    catch (error) {
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
});
exports.ProjectController = {
    createProject,
    getAllProjects,
    getProjectsByCategory,
    getProjectById,
    updateProject,
    deleteProject,
};
