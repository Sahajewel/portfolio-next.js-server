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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const client_1 = require("@prisma/client");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_service_1.UserService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            date: user
        });
    }
    catch (error) {
        console.log(error);
        // Unique constraint error
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res.status(400).json({
                    success: false,
                    message: `A user with this ${(_a = error.meta) === null || _a === void 0 ? void 0 : _a.target} already exist`
                });
            }
        }
        // validation error (missing ? invalid fields)
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing input. Please check your data"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong creating the user. please try again later"
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = yield user_service_1.UserService.login(req.body);
        res.status(201).json({
            success: true,
            message: "User login successfully",
            date: loginUser
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing input. Please check your data"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong creating the user. please try again later"
        });
    }
});
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.UserService.getUser();
        const safeUsers = users.map((_a) => {
            var { password } = _a, rest = __rest(_a, ["password"]);
            return rest;
        });
        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No user found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: safeUsers
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                success: false,
                message: "Database request error. please check your query"
            });
        }
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            return res.status(400).json({
                success: false,
                message: "Invalid requset parameters"
            });
        }
        res.status(200).json({
            success: true,
            message: "User fetched problem",
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }
        const user = yield user_service_1.UserService.getSingleUser(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        const { password } = user, safeUser = __rest(user, ["password"]);
        res.status(200).json({
            success: true,
            message: "Single User fetched successfully.",
            data: safeUser,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                success: false,
                message: "Database request error. Please check your query.",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message ||
                "Something went wrong while fetching the user. Please try again later.",
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty. Provide fields to update.",
            });
        }
        const updatedUser = yield user_service_1.UserService.updateUser(id, req.body);
        res.status(200).json({
            success: true,
            message: "User updated successfully.",
            data: updatedUser,
        });
    }
    catch (error) {
        console.error(error);
        // Handle if user not found
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
            message: error.message ||
                "Something went wrong while updating the user. Please try again later.",
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }
        const deletedUser = yield user_service_1.UserService.deleteUser(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully.",
            data: deletedUser,
        });
    }
    catch (error) {
        console.error(error);
        // User not found error
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
        // Unknown server error
        res.status(500).json({
            success: false,
            message: error.message ||
                "Something went wrong while deleting the user. Please try again later.",
        });
    }
});
exports.UserController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
    login
};
