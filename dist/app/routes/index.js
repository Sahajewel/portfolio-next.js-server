"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const blog_routes_1 = require("../module/blog/blog.routes");
const project_routes_1 = require("../module/project/project.routes");
const resume_routes_1 = require("../module/resume/resume.routes");
const analytic_route_1 = require("../module/analytics/analytic.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes
    },
    {
        path: "/blog",
        route: blog_routes_1.BlogRoutes
    },
    {
        path: "/project",
        route: project_routes_1.ProjectRoutes
    },
    {
        path: "/resume",
        route: resume_routes_1.ResumeRoutes
    },
    {
        path: "/analytic",
        route: analytic_route_1.AnalyticsRoutes
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
