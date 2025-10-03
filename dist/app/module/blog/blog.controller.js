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
exports.BlogController = void 0;
const blog_service_1 = require("./blog.service");
const client_1 = require("@prisma/client");
// CREATE blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty. Provide blog details.",
            });
        }
        const blog = yield blog_service_1.BlogService.createBlog(req.body);
        res.status(201).json({
            success: true,
            message: "Blog created successfully.",
            data: blog,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res.status(400).json({
                    success: false,
                    message: "Duplicate field value. Blog slug must be unique.",
                });
            }
            return res.status(400).json({
                success: false,
                message: "Database request error. Please check your query.",
            });
        }
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing input. Please check your data"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while creating the blog.",
        });
    }
});
// GET all blogs
const getAllBlogs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_service_1.BlogService.getAllBlogs();
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found.",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully.",
            data: blogs,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while fetching blogs.",
        });
    }
});
// GET single blog
const getSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Blog ID is required.",
            });
        }
        const blog = yield blog_service_1.BlogService.getSingleBlog(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Single Blog fetched successfully.",
            data: blog,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while fetching the blog.",
        });
    }
});
// UPDATE blog
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Blog ID is required.",
            });
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty. Provide fields to update.",
            });
        }
        const updatedBlog = yield blog_service_1.BlogService.updateBlog(id, req.body);
        res.status(200).json({
            success: true,
            message: "Blog updated successfully.",
            data: updatedBlog,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Blog not found.",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while updating the blog.",
        });
    }
});
// DELETE blog
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Blog ID is required.",
            });
        }
        const deletedBlog = yield blog_service_1.BlogService.deleteBlog(id);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully.",
            data: deletedBlog,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Blog not found.",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while deleting the blog.",
        });
    }
});
exports.BlogController = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
