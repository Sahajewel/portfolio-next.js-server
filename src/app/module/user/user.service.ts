import { Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createUser = async(payload: Prisma.UserCreateInput)=>{
    const userCreate = await prisma.user.create({
        data: payload
    })
    return userCreate
}
const getUser = async()=>{
    const userGet = await prisma.user.findMany();
    return userGet;
}
const getSingleUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

const updateUser = async (id: string, payload: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return user;
};
const deleteUser = async (id: string) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
};

 export const UserService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
 }