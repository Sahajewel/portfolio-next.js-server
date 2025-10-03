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
exports.ResumeController = void 0;
const resume_service_1 = require("./resume.service");
const client_1 = require("@prisma/client");
const createResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield resume_service_1.ResumeService.createResume(req.body);
        res.status(201).json({
            success: true,
            message: "Resume created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while creating resume",
        });
    }
});
const getResumes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield resume_service_1.ResumeService.getResumes();
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while fetching resumes",
        });
    }
});
const getResumeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield resume_service_1.ResumeService.getResumeById(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while fetching resume",
        });
    }
});
const updateResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield resume_service_1.ResumeService.updateResume(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Resume updated successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
});
const deleteResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield resume_service_1.ResumeService.deleteResume(req.params.id);
        res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while deleting resume",
        });
    }
});
exports.ResumeController = {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
};
