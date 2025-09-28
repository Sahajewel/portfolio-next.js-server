
import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


const createBlog = async (payload: Prisma.BlogCreateInput) => {
  const blog = await prisma.blog.create({
    data: payload,
  });
  return blog;
};

const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany();
  return blogs;
};

const getSingleBlog = async (id: string) => {
  const blog = await prisma.blog.findUnique({
    where: { id },
  });
  return blog;
};

const updateBlog = async (id: string, payload: any) => {
  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: payload,
  });
  return updatedBlog;
};

const deleteBlog = async (id: string) => {
  const deletedBlog = await prisma.blog.delete({
    where: { id },
  });
  return deletedBlog;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
