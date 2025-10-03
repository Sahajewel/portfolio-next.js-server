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
        const result = yield project_service_1.ProjectService.createProject(req.body);
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing input. Please check your data.",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong creating the project. Please try again later.",
        });
    }
});
// Get All
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield project_service_1.ProjectService.getAllProjects();
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching projects. Please try again later.",
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
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching project. Please try again later.",
        });
    }
});
// Update
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield project_service_1.ProjectService.updateProject(id, req.body);
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: result,
        });
    }
    catch (error) {
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
});
exports.ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
