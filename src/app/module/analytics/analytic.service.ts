import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

// Create Analytics
const createAnalytics = async (payload: { page: string; views?: number; uniqueViews?: number }) => {
  const analytics = await prisma.analytics.create({
    data: {
      page: payload.page,
      views: payload.views ?? 1,
      uniqueViews: payload.uniqueViews ?? 1,
    },
  });
  return analytics;
};

// Get all Analytics
const getAnalytics = async () => {
  const analytics = await prisma.analytics.findMany();
  return analytics;
};

// Get single Analytics by ID
const getAnalyticsById = async (id: string) => {
  const analytics = await prisma.analytics.findUnique({
    where: { id },
  });
  return analytics;
};

// Update Analytics
const updateAnalytics = async (id: string, payload: { page?: string; views?: number; uniqueViews?: number }) => {
  const updated = await prisma.analytics.update({
    where: { id },
    data: payload,
  });
  return updated;
};

// Delete Analytics
const deleteAnalytics = async (id: string) => {
  const deleted = await prisma.analytics.delete({
    where: { id },
  });
  return deleted;
};

export const AnalyticsService = {
  createAnalytics,
  getAnalytics,
  getAnalyticsById,
  updateAnalytics,
  deleteAnalytics,
};
