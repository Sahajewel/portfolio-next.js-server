import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

// Create Project
const createProject = async (payload: Prisma.ProjectCreateInput) => {
  const project = await prisma.project.create({
    data: payload,
  });
  return project;
};

// Get All Projects
const getAllProjects = async () => {
  return await prisma.project.findMany();
};

// Get Single Project
const getProjectById = async (id: string) => {
  return await prisma.project.findUnique({
    where: { id },
  });
};

// Update Project
const updateProject = async (id: string, payload: Prisma.ProjectUpdateInput) => {
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
  getProjectById,
  updateProject,
  deleteProject,
};
