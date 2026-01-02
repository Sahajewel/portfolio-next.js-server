// app/modules/project/project.service.ts
import { Prisma, ProjectCategory } from "@prisma/client";
import { prisma } from "../../config/db";

// Create Project
const createProject = async (payload: Prisma.ProjectCreateInput) => {
  // Validate category if provided
  if (
    payload.category &&
    !Object.values(ProjectCategory).includes(
      payload.category as ProjectCategory
    )
  ) {
    throw new Error(
      `Invalid category. Must be one of: ${Object.values(ProjectCategory).join(
        ", "
      )}`
    );
  }

  const project = await prisma.project.create({
    data: payload,
  });
  return project;
};

// Get All Projects
const getAllProjects = async () => {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get Projects by Category
const getProjectsByCategory = async (category: ProjectCategory) => {
  return await prisma.project.findMany({
    where: { category },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get Single Project
const getProjectById = async (id: string) => {
  return await prisma.project.findUnique({
    where: { id },
  });
};

// Update Project
const updateProject = async (
  id: string,
  payload: Prisma.ProjectUpdateInput
) => {
  // Validate category if provided
  if (
    payload.category &&
    !Object.values(ProjectCategory).includes(
      payload.category as ProjectCategory
    )
  ) {
    throw new Error(
      `Invalid category. Must be one of: ${Object.values(ProjectCategory).join(
        ", "
      )}`
    );
  }

  return await prisma.project.update({
    where: { id },
    data: payload,
  });
};

// Delete Project
const deleteProject = async (id: string) => {
  return await prisma.project.delete({
    where: { id },
  });
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectsByCategory,
  getProjectById,
  updateProject,
  deleteProject,
};
