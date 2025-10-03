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
exports.AnalyticsService = void 0;
const db_1 = require("../../config/db");
// Create Analytics
const createAnalytics = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const analytics = yield db_1.prisma.analytics.create({
        data: {
            page: payload.page,
            views: (_a = payload.views) !== null && _a !== void 0 ? _a : 1,
            uniqueViews: (_b = payload.uniqueViews) !== null && _b !== void 0 ? _b : 1,
        },
    });
    return analytics;
});
// Get all Analytics
const getAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const analytics = yield db_1.prisma.analytics.findMany();
    return analytics;
});
// Get single Analytics by ID
const getAnalyticsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const analytics = yield db_1.prisma.analytics.findUnique({
        where: { id },
    });
    return analytics;
});
// Update Analytics
const updateAnalytics = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield db_1.prisma.analytics.update({
        where: { id },
        data: payload,
    });
    return updated;
});
// Delete Analytics
const deleteAnalytics = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield db_1.prisma.analytics.delete({
        where: { id },
    });
    return deleted;
});
exports.AnalyticsService = {
    createAnalytics,
    getAnalytics,
    getAnalyticsById,
    updateAnalytics,
    deleteAnalytics,
};
