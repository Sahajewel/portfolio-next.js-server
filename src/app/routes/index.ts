import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { BlogRoutes } from "../module/blog/blog.routes";
import { ProjectRoutes } from "../module/project/project.routes";


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
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})