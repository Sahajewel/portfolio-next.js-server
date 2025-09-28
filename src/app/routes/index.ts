import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { BlogRoutes } from "../module/blog/blog.routes";
import { ProjectRoutes } from "../module/project/project.routes";
import { ResumeRoutes } from "../module/resume/resume.routes";
import { AnalyticsRoutes } from "../module/analytics/analytic.route";


export const router = Router();
const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/blog",
        route: BlogRoutes
    },
    {
        path: "/project",
        route: ProjectRoutes
    },
    {
        path: "/resume",
        route: ResumeRoutes
    },
    {
        path: "/analytic",
        route: AnalyticsRoutes
    },
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})