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
exports.ResumeService = void 0;
const db_1 = require("../../config/db");
// Create Resume
const createResume = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const resume = yield db_1.prisma.resume.create({
        data: {
            data: payload.data,
            user: {
                connect: { id: payload.userId }, // existing userId
            },
        },
    });
    return resume;
});
// Get all resumes
const getResumes = () => __awaiter(void 0, void 0, void 0, function* () {
    const resumes = yield db_1.prisma.resume.findMany({
        include: { user: true },
    });
    return resumes;
});
// Get single resume
const getResumeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resume = yield db_1.prisma.resume.findUnique({
        where: { id },
        include: { user: true },
    });
    return resume;
});
// Update resume
const updateResume = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield db_1.prisma.resume.update({
        where: { id },
        data: payload,
    });
    return updated;
});
// Delete resume
const deleteResume = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield db_1.prisma.resume.delete({
        where: { id },
    });
    return deleted;
});
exports.ResumeService = {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
};
