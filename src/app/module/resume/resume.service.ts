import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


// Create Resume
const createResume = async (payload: { data: Prisma.InputJsonValue; userId: string }) => {
  const resume = await prisma.resume.create({
    data: {
      data: payload.data,
      user: {
        connect: { id: payload.userId }, // existing userId
      },
    },
  });
  return resume;
};

// Get all resumes
const getResumes = async () => {
  const resumes = await prisma.resume.findMany({
    include: { user: true },
  });
  return resumes;
};

// Get single resume
const getResumeById = async (id: string) => {
  const resume = await prisma.resume.findUnique({
    where: { id },
    include: { user: true },
  });
  return resume;
};

// Update resume
const updateResume = async (id: string, payload: { data?: Prisma.InputJsonValue }) => {
  const updated = await prisma.resume.update({
    where: { id },
    data: payload,
  });
  return updated;
};

// Delete resume
const deleteResume = async (id: string) => {
  const deleted = await prisma.resume.delete({
    where: { id },
  });
  return deleted;
};

export const ResumeService = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
